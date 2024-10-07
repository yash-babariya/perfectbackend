import multer from "multer";

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/');
        },
        filename: function (req, file, cb) {
            const username = req.body.username;
            const name = username + "_" + "profilePicture" + file.originalname;
            cb(null, name);
        }
    })
});

export default upload;