import path from 'path';
import multer from 'multer';


const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: function(req, file, cb){
        let ext = path.extname(file.originalname);
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Allowed only .png, .jpg, .jpeg and .gif'));
        }
    },
    limits: {
        fieldSize: 1024 * 1024 * 8
    }
})

export default upload;