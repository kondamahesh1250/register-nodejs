var multer = require("multer");
var path = require("path");


var stored_data = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "/files");
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

var filterdata = (req, file, cb) => {
    const allowedtype = [".png", ".jpeg"];
    const filetype = path.extname(Date.now() + file.originalname).toLowerCase();
    // console.log(path.extname(Date.now() + file.originalname))
    const filesize = 1024 * 1024 * 2;

    if (!allowedtype.includes(filetype)) {
        return cb(("invalid file type"))
    }

    if (file.size > filesize) {
        return cb(('File is too large. Maximum size is 2MB.'));
    }
    cb(null, true);
}


var upload = multer({ storage: stored_data, fileFilter: filterdata });


module.exports=upload;

