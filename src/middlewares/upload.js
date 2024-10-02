import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const username = req.body.username;
        const name = username + "_" + "profilePicture";
        cb(null, name);
    }
});

const upload = multer({ storage }).single("profilePicture");

export default upload;