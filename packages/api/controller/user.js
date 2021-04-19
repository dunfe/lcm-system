import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { useridFromToken } from '../controller/mentor.js';
import { uniqBy } from '../controller/question.js'
import User from '../models/user.js';
import Question from '../models/question.js';
import Mentor from '../models/mentor.js';
import Skill from '../models/skill.js';
import cloudinary from '../utils/cloudinary.js';

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

export const getSignToken = user => {
    return jwt.sign({
        id: user._id
    }, process.env.SECRET_KEY, { expiresIn: '60d' });
};

export function getAllMentee(model) {
    return async (req, res) => {
        let page = parseInt(req.query.page) || 1;
        const limit = 50;
        const results = {};
        const data = await model.find({
            $or: [{ role: 'mentee' }, { role: 'banned' }]
        });
        const totalPage = Math.ceil(data.length / limit);
        results.totalPage = totalPage;
        results.totalItem = data.length;
        if (page < 1 || page > totalPage) page = 1;
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        if (endIndex < data.length) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
        try {
            results.results = await model.find({
                $or: [{ role: 'mentee' }, { role: 'banned' }]
            }).limit(limit).skip(startIndex).exec()
            return res.status(200).json(results);
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    }
}

export const getUserById = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            status: 'fail',
            message: `Invalid id ${req.params.id}`
        })
    };

    User.findById(req.params.id, (err, doc) => {
        if (!err) {
            return res.status(200).json({
                status: 'success',
                data: doc
            });
        } else {
            return res.status(400).json({
                status: 'fail',
                message: 'Something wrong, try again later'
            })
        };
    });
};

// export const getUserByName = (req, res) => {
//     const name = req.body.display_name;

//     User.find({ "fullname" : {'$regex' : new RegExp(name, "i")}}, (err, doc) => {
//         if(!err) {
//             if(doc.toString() == ""){ 
//                 return res.status(400).send(`No record with given name: ${req.body.display_name}`)
//             }else {
//                 res.send(doc);
//             }
//         } else {
//             console.log('Error' + JSON.stringify(err, undefined, 2));
//         };
//     })
// };

export const countAllRecord = async (req, res) => {
    var total_array = {
        totalUser: 0,
        totalMentor: 0,
        totalQuestion: 0,
        totalSkill: 0
    };

    await User.countDocuments((err, doc) => {
        if (!err) {
            total_array.totalUser = doc;
        } else {
            console.log('Error' + JSON.stringify(err, undefined, 2));
        };
    });

    await Question.countDocuments((err, doc) => {
        if (!err) {
            total_array.totalQuestion = doc;
        } else {
            console.log('Error' + JSON.stringify(err, undefined, 2));
        };
    });

    await Mentor.countDocuments((err, doc) => {
        if (!err) {
            total_array.totalMentor = doc;
        } else {
            console.log('Error' + JSON.stringify(err, undefined, 2));
        };
    });
    await Skill.countDocuments((err, doc) => {
        if (!err) {
            total_array.totalSkill = doc;
        } else {
            console.log('Error' + JSON.stringify(err, undefined, 2));
        };
    });

    res.json(total_array);

};

export const changePassword = async (req, res, next) => {
    try {
        let userId = await useridFromToken(req, res);
        const salt = await bcrypt.genSalt(10);
        const newPasswordSalted = await bcrypt.hash(req.body.newPassword, salt);
        const userPassword = await User.findByIdAndUpdate({ _id: userId }, { password: newPasswordSalted }, { new: true });
        return res.status(200).json({ status: true, data: userPassword });
    } catch (error) {
        return res.status(400).json({ status: false, error: error.message });
    }
};

export const updateUserById = async (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            status: 'fail',
            message: `Invalid id ${req.params.id}`
        })
    }

    let user = req.body;

    User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err, doc) => {
        if (!err) {
            return res.status(200).json({
                status: 'Update success',
                data: doc
            });
        } else {
            return res.status(400).json({
                status: 'fail',
                message: 'Something wrong, try again later'
            })
        }
    });
}

export const delUserById = async (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            status: 'fail',
            message: `Invalid id ${req.params.id}`
        })
    };

    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            return res.status(200).json({
                status: 'Delete user success',
                data: doc
            });
        } else {
            return res.status(400).json({
                status: 'fail',
                message: 'Something wrong, try again later'
            })
        }
    });
};

export const banUserById = async (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            status: 'fail',
            message: `Invalid id ${req.params.id}`
        })
    };

    User.findByIdAndUpdate(req.params.id, { $set: { role: 'banned' } }, { new: true }, (err, doc) => {
        if (!err) {
            return res.status(200).json({
                status: 'User has been banned',
                data: doc
            });
        } else {
            return res.status(400).json({
                status: 'fail',
                message: 'Something wrong, try again later'
            })
        }
    });
}

export const viewUserInfo = async (req, res) => {
    let userId = await useridFromToken(req, res);
    User.find({ _id: userId }, (err, doc) => {
        if (!err) {
            return res.status(200).json({
                status: 'success',
                data: doc
            });

        } else {
            return res.status(400).json({
                status: 'fail',
                message: 'Something wrong, try again'
            })
        }
    })
}

export const uploadAvatar = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        return res.status(200).json({
            status: 'Success',
            url: result.secure_url
        })
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: 'Lỗi ở try'
        })
    }
}

export const editProfileUserById = async (req, res) => {
    let userId = await useridFromToken(req, res);

    const info = {
        skill: req.body.skill,
        bio: req.body.bio,
        github: req.body.github,
        fullname: req.body.fullname
    }
    const update = {
        dob: req.body.dob,
        phone: req.body.phone,
        avatar: req.body.avatar,
        gender: req.body.gender,
        address: req.body.address,
        currentJob: req.body.currentJob,
        achievement: req.body.achievement,
    };
    // const currentUser =  await User.findById(userId);
    // if(currentUser.detail.avatar == ''){
    //     const result = await cloudinary.uploader.upload(req.file.path);
    //     update.avatar = result.secure_url;
    // } else{
    //     // Delete image from cloudinary
    //     // await cloudinary.uploader.destroy(currentUser.detail.avatar);
    //     // Upload image to cloudinary
    //     const result = await cloudinary.uploader.upload(req.file.path);
    //     update.avatar = result.secure_url;
    // }

    // console.log(currentUser.detail.avatar)

    User.findOneAndUpdate({ _id: userId }, { detail: update, $set: info }, { new: true }, (err, doc) => {
        if (!err) {
            return res.status(200).json({
                status: 'success',
                data: doc
            });
        } else {
            return res.status(400).json({
                status: 'fail',
                message: 'Something wrong, try again later'
            })
        }
    });
}

//Question of mentee 

export const addFavoriteMentorById = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            status: 'fail',
            message: `Invalid id ${req.params.id}`
        })
    };

    let userId = await useridFromToken(req, res);
    const currentMentor = await User.findById(req.params.id);
    const favorite = {
        mentorId: currentMentor._id,
        mentorName: currentMentor.fullname
    }
    let index;
    var favoriteMentor = [];
    const mentee = await User.findById(userId).then((mentee) => {
        favoriteMentor = favoriteMentor.concat(mentee.favoriteMentor);
        favoriteMentor = uniqBy(favoriteMentor, JSON.stringify);
    })
    let checkId = false;
    if (favoriteMentor.length > 0) {
        for (var i = 0; i < favoriteMentor.length; i++) {
            if (JSON.stringify(favoriteMentor[i].mentorId) === JSON.stringify(currentMentor._id)) {
                checkId = true;
                index = i;
            }
        }
    }
    if (checkId) {
        favoriteMentor.splice(index, 1);
        User.findByIdAndUpdate({ _id: userId }, { $set: { favoriteMentor: favoriteMentor } }, { new: true }, (err, doc) => {

            if (!err) {
                return res.status(200).json({
                    status: 'success',
                    data: doc
                });
            } else {
                return res.status(400).json({
                    status: 'fail',
                    message: 'Something wrong, try again later'
                })
            };
        })

    } else {
        User.findByIdAndUpdate({ _id: userId }, { $push: { favoriteMentor: favorite } }, { new: true }, (err, doc) => {
            if (!err) {
                return res.status(200).json({
                    status: 'success',
                    data: doc
                });
            } else {
                return res.status(400).json({
                    status: 'fail',
                    message: 'Something wrong, try again later'
                })
            };
        })
    }
}


export const viewListFavoriteMentor = async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    const limit = 50;
    const results = {}
    let userId = await useridFromToken(req, res);
    var favoriteMentor = [];
    const mentee = await User.find({ _id: userId }).then((mentee) => {
        for (var i = 0; i < mentee.length; i++) {
            favoriteMentor = favoriteMentor.concat(mentee[i].favoriteMentor);
            favoriteMentor = uniqBy(favoriteMentor, JSON.stringify);
        }
    })
    let data = favoriteMentor;
    const totalPage = Math.ceil(data.length / limit);
    results.totalPage = totalPage;
    results.totalItem = data.length;
    if (page < 1 || page > totalPage) page = 1;
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    if (endIndex < data.length) {
        results.next = { page: page + 1 }
    }
    if (startIndex > 0) {
        results.previous = { page: page - 1 }
    }
    try {
        const favoriteMentorPaging = favoriteMentor.slice(startIndex, endIndex);
        results.results = favoriteMentorPaging
        return res.status(200).json({
            status: 'success',
            data: results
        });
    } catch (e) {
        return res.status(400).json({
            status: 'fail',
            message: e.message
        })
    }
}

export const countMentorFaverite = async (req, res) => {
    let userId = await useridFromToken(req, res);
    var favoriteMentor = [];
    const mentee = await User.find({ _id: userId }).then((mentee) => {
        for (var i = 0; i < mentee.length; i++) {
            favoriteMentor = favoriteMentor.concat(mentee[i].favoriteMentor);
            favoriteMentor = uniqBy(favoriteMentor, JSON.stringify);
        }
    })
    return res.status(200).json({
        status: 'success',
        count: favoriteMentor.length
    });
}

export default router;
