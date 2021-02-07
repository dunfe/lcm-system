const User = require('./../models/user');

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('./../config/config');

exports.register = async (req, res, next) => {
    const { username, password, email, status, created_date, last_modified_date} = req.body;
    const user = await User.findOne({username});
    if(user)
        return res.status(403).json({error: { message: 'username already in use!'}});
    const newUser = new User({ username, password, email, status, created_date, last_modified_date });
    try {
        await newUser.save();
        const token = getSignToken(newUser);
        res.status(200).json({ token });
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
        return res.status(403).json({ error: {message: 'invalid username/password'}});
    const isValid = await user.isPasswordValid(password); 
    if(!isValid)
        return res.status(401).json({ error: {message: 'invalid username/password'}});
    const token = getSignToken(user);
    res.status(200).json({ token });
};

getSignToken = user => {
    return jwt.sign({
        id: user._id,
        username: user.username,
        email: user.email,
        status: user.status,
        created_date: user.created_date,
        last_modified_date: user.last_modified_date
    }, SECRET_KEY, { expiresIn: '1h'});
};