import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public');
    },
    filename: function (req, file, cb) {
        const username = req.body.username;
        const name = username + "_" + "profilePicture" + file.originalname;
        cb(null, name);
    }
});

const upload = multer({ storage }).single("profilePicture");

export default upload;