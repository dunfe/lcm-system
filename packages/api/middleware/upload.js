import path from 'path';
import multer from 'multer';
import { createBuilderStatusReporter } from 'typescript';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        createBuilderStatusReporter(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback){
        if(
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg"
        ){
            callback(null, true)
        } else {
            console.log('only jpg & png file supported');
            callback(null, false)
        }
    },
    limits: {
        fieldSize: 1024 * 1024 * 8
    }
})

export default upload;