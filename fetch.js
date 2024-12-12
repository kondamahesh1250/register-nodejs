var express = require("express");
var app = express();
var cors = require("cors");
var conn = require("./sql.js");
var bcrypt = require("bcrypt");
var { transporter, mailOptions } = require("./nodemailer.js");
var upload = require("./multer.js");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post("/register", upload.array("files"), async (req, res) => {

    password = req.body.password;
    var salt = 10;


    var passwordhash = await bcrypt.hash(password, salt);

    var obj = {
        username: req.body.username,
        password: passwordhash,
        email: req.body.email,
        profilepic:req.files[0].path
    }
    var passwordhash = "";

    transporter.sendMail(mailOptions, (error, info) => {

        if (error) {

            return res.send(error);

        } else {
            let match = mailOptions.text.match(/(\d+)/);
            let otpToSend = match[0];

            let query = `INSERT INTO practice.userinfo (username, password, email, otp, filepath) VALUES ("${obj.username}","${obj.password}","${obj.email}","${otpToSend}","${obj.profilepic}")`;

            conn.query(query, (err, data) => {
                if (err) {
                    res.send({
                        status: 400,
                        message: "error in sending data",
                    });
                    // console.log(err.message);
                }
                else {
                    res.send({
                        status: 200,
                        message: "successfully created",
                        info: data
                    });
                    // console.log(data);
                }
            });
        }
    });

});

app.post("/login", (req, res) => {

    let { username, password, otp } = req.body;

    let info = "SELECT * FROM practice.userinfo WHERE username= ?";

    conn.query(info, [username], async (err, data) => {
        if (err) {
            console.error("Database query error:", err.message);
            return res.status(500).send({ message: "Database error" });
        }

        userdata = data[0];

        let isPasswordMatch = await bcrypt.compare(password, userdata.password);

        if((userdata.username===username)&&(isPasswordMatch)&&(userdata.otp===otp)){
           return res.send({
                status:200,
                message:"Succesfully logged",
                data:userdata
            })
            
        }
        else{
          return  res.send({
                status:400,
                message:"Invalid Credentials"
            })
        }
    })



});

var port = 3006;

app.listen(port, () => {
    console.log("server started", +port);
});