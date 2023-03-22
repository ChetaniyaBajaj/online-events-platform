const express = require("express");
const router = express.Router();
var multer = require('multer');
const fs = require('fs');
const formidable = require('formidable');
const mv = require('mv');
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');

const lobby = require('../models/Lobby/LobbyMain');
const exhibition = require('../models/Exhibition/ExbMain');
const lobbyvideo = require('../models/Lobby/LobbyExtra');
const conference = require('../models/Conference/ConfMain');
const meeting = require('../models/Conference/ConfExtra');
const Register = require('../models/register');
const UserOTPVerification = require('../models/otp');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../frontend/public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname)
    }
});

var upload = multer({ storage: storage });

router.get('/', (req, res) => {
    res.send("Hello World")
})

//  FETCH ALL LOBBY IMAGES AND YOUTUBE VIDEO
router.get('/get/lobby', async (req, res) => {
    let arr = []
    for (let i = 1; i < 9; i++) {
        var id = `sp${i}`;
        let image = await lobby.findById(id).exec();
        arr.push(image)
    }
    let logo = await lobby.findById("mainlogo").exec();
    arr.push(logo);

    // Lobby video will always contain only one document.
    let video = await lobbyvideo.findOne().exec();
    arr.push(video);
    res.json({ message: "Fetched all images", arr: arr })

})

// UPLOAD ALL LOBBY IMAGES (ONE BY ONE. LOOP IN FRONTEND)
router.post('/post/lobby', upload.single('img'), async (req, res) => {
    // console.log(req.file)
    lobby.findOneAndUpdate({ _id: req.body._id }, {
        img: req.file.filename,
        link: req.body.link
    }, { upsert: true }, (err, result) => {
        if (err) throw err;
        // console.log(result);
        if (result) {
            // console.log(`../frontend/public/uploads/${result.img}`)
            fs.rm(`../frontend/public/uploads/${result.img}`, (err, res) => {
                if (err) throw err
                // console.log(res)
            })
        }
    })
    res.json({ message: "Saved successfully" })
})

// UPLOAD THE LOBBY VIDEO (YOUTUBE)
router.post('/post/lobbyextra', async (req, res) => {
    if (req.body.ytlink) {
        lobbyvideo.findOneAndUpdate({ _id: req.body._id }, {
            ytlink: req.body.ytlink,
            filename: null,
            filesize: 0
        }, { upsert: true }, (err, result) => {
            if (err) throw err;
            // console.log(result);

            // delete file.
            if (result && result.filename) {
                fs.rm(`../frontend/public/uploads/${result.filename}`, (err, res) => {
                    if (err) throw err
                    // console.log(res)
                })
            }
        })
        res.json({ message: "YouTube video added" })
    }
    else {
        const form = formidable({});
        form.parse(req, (err, fields, files) => {
            if (err) throw err;
            // res.json({files, fields});
            var oldpath = files.video.filepath;
            var name = Date.now() + "_" + files.video.originalFilename
            var newpath = '../frontend/public/uploads/' + name;
            mv(oldpath, newpath, function (err) {
                if (err) throw err;
            });
            // console.log(fields);
            lobbyvideo.findOneAndUpdate({ _id: fields._id }, {
                ytlink: "",
                filename: name,
                filesize: files.video.size
            }, { upsert: true }, (err, result) => {
                if (err) throw err;
                // console.log(result);

                // delete file.
                if (result && result.filename) {
                    fs.rm(`../frontend/public/uploads/${result.filename}`, (err, res) => {
                        if (err) throw err
                        // console.log(res)
                    })
                }
            })
            res.json({ message: "Video uploaded from the local PC" })
        });
    }
})


//  FETCH ALL EXHIBITION POSTERS, LINKS, VIDEOS.
router.get('/get/exhibition', async (req, res) => {
    let arr = [];
    let result = await exhibition.findById("orgimg").exec();
    arr.push(result);

    for (let i = 1; i < 9; i++) {
        var id = `proj${i}`;
        result = await exhibition.findById(id).exec();
        arr.push(result)
    }
    res.json({ message: "Fetched all images", arr: arr })

})

// UPLOAD ALL EXHIBITION IMAGES (ONE BY ONE. LOOP IN FRONTEND)
router.post('/post/exhibition', async (req, res) => {
    let form = formidable({})
    form.parse(req, (err, fields, files) => {
        if (err) throw err;
        if (fields.ytlink || fields._id === "orgimg") {
            var oldpath = files.poster.filepath;
            var name = Date.now() + "_" + files.poster.originalFilename
            var newpath = '../frontend/public/uploads/' + name;
            mv(oldpath, newpath, function (err) {
                if (err) throw err;
            });

            exhibition.findOneAndUpdate({ _id: fields._id }, {
                poster: name,
                videoFilename: null,
                videoFilesize: 0,
                ytlink: fields.ytlink,
                ourteamlink: fields.ourteamlink
            }, { upsert: true }, (err, result) => {
                if (err) throw err;
                // console.log(result)
                if (result) {
                    // console.log(`../frontend/public/uploads/${result.poster}`)
                    fs.rm(`../frontend/public/uploads/${result.poster}`, (err, res) => {
                        if (err) throw err
                        // console.log(res)
                    })
                }
                if (result && result.videoFilename) {
                    fs.rm(`../frontend/public/uploads/${result.videoFilename}`, (err, res) => {
                        if (err) throw err
                        // console.log(res)
                    })
                }
            })
            res.json({ message: "Saved successfully" })
        }
        else if (files.video) {
            // res.json({files, fields});
            // console.log({files, fields});
            var oldpathVideo = files.video.filepath;
            var oldpathPoster = files.poster.filepath;
            var nameVideo = Date.now() + "_" + files.video.originalFilename
            var namePoster = Date.now() + "_" + files.poster.originalFilename
            var newpathVideo = '../frontend/public/uploads/' + nameVideo;
            var newpathPoster = '../frontend/public/uploads/' + namePoster;
            mv(oldpathVideo, newpathVideo, function (err) {
                if (err) throw err;
            });
            mv(oldpathPoster, newpathPoster, function (err) {
                if (err) throw err;
            });

            // console.log(fields);
            exhibition.findOneAndUpdate({ _id: fields._id }, {
                poster: namePoster,
                videoFilename: nameVideo,
                videoFilesize: files.video.size,
                ytlink: "",
                ourteamlink: fields.ourteamlink
            }, { upsert: true }, (err, result) => {
                if (err) throw err;
                // console.log(result);
                if (result) {
                    // console.log(`../frontend/public/uploads/${result.poster}`)
                    fs.rm(`../frontend/public/uploads/${result.poster}`, (err, res) => {
                        if (err) throw err
                        // console.log(res)
                    })
                }

                // delete file.
                if (result && result.filename) {
                    fs.rm(`../frontend/public/uploads/${result.filename}`, (err, res) => {
                        if (err) throw err
                        // console.log(res)
                    })
                }
            })
            res.json({ message: "Video uploaded from the local PC" })
        }
    })
})


// FETCH ALL CONFERENCE HALL IMAGES AND LINKS
router.get('/get/conference', async (req, res) => {
    let arr = [];
    let result = await conference.findById("orgimg").exec();
    arr.push(result);

    for (let i = 1; i < 9; i++) {
        var id = `poster${i}`;
        result = await conference.findById(id).exec();
        arr.push(result)
    }

    res.json({ message: "Fetched all images", arr: arr })
})

// FETCH ALL CONFERENCE MEETING DETAILS
router.get('/get/conferencemeets', async (req, res) => {
    let arr = [];
    let zoom_meets1 = await meeting.findById("room1").exec();
    let zoom_meets2 = await meeting.findById("room2").exec();
    arr.push(zoom_meets1)
    arr.push(zoom_meets2)
    res.json({ message: "Fetched all available meetings", arr: arr })
})

// UPLOAD ALL CONFERENCE HALL IMAGES & LINKS
router.post('/post/conference', upload.single('img'), (req, res) => {
    conference.findOneAndUpdate({ _id: req.body._id }, {
        img: req.file.filename,
        link: req.body.link,
    }, { upsert: true }, (err, result) => {
        if (err) throw err;
        // console.log(result)
        if (result) {
            // console.log(`../frontend/public/uploads/${result.poster}`)
            fs.rm(`../frontend/public/uploads/${result.img}`, (err, res) => {
                if (err) throw err
                // console.log(res)
            })
        }
    })
    res.json({ message: "Saved successfully" })
})

// UPLOAD ALL CONFERENCE HALL MEETING DETAILS
router.post('/post/conferencemeets', (req, res) => {
    meeting.findOneAndUpdate({ _id: req.body._id }, {
        link: req.body.link,
        password: req.body.password
    }, { upsert: true, new: true }, (err, result) => {
        if (err) throw err;
        console.log(result)
    })
    res.json({ message: "Saved successfully" })
})



// Authentication purposes:
// REGISTER A NEW USER
router.post("/register", async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;

        if (password === cpassword) {
            const register = new Register({
                Name: req.body.name,
                email: req.body.email,
                password: password,
                confirmpassword: cpassword
            })

            const registered = await register.save();
            res.json({success: true, message: "Registration Successful" })

        } else {
            res.json({success: false, message: "Passwords Not Matching" });
        }

    } catch (error) {
        res.status(400).send(error);
    }
})

let gobalemail = "";
// LOGIN WITH THE CREDENTIALS
router.post("/login", async (req, res) => {
    try {
        let email = req.body.lemail;
        const lpassword = req.body.lpassword;
        const useremail = await Register.findOne({ email: email });

        if (useremail == null) {
            // return res.status(400).send('invalid email')
            // return res.render("login",{message:'Invalid Credentials !'})
            return res.json({redirect: false, message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(lpassword, useremail.password);

        if ((isMatch) && (useremail !== null)) {
            Emailsender(email);
            gobalemail = email;
            const message = req.flash('warning')
            // res.render('otp', { email: email, message });
            res.json({redirect: true, message: 'Redirecting to OTP page' });
        }
        else {
            // res.render("login", { message: 'Invalid Credentials !' });
            res.json({redirect: false, message: 'Invalid Credentials' });
        }

    } catch (error) {
        // res.render("login",{message:'Invalid Credentials !'});
        res.status(400).send(error)
    }
})

// AFTER ENTERING CREDENTIALS, REDIRECTING TO OTP PAGE
router.post("/otp", async (req, res) => {
    try {
        const otp1 = req.body.number;
        // console.log(otp1);
        const OTPRecord = await UserOTPVerification.find({
            userId: gobalemail,
        });
        // console.log(gobalemail);
        if (OTPRecord.length <= 0) {
            // console.log('otp in record empty');
            // res.render("otp", { message: 'OTP in record empty' });
            res.json({redirect: false, message: 'OTP cannot be empty' });
            // res.send('otp in record empty');
        } else {
            const isMatch = await bcrypt.compare(otp1, OTPRecord[0].otp);

            if (isMatch) {
                // console.log('Login');
                const del = await UserOTPVerification.deleteOne({ userId: gobalemail });
                // console.log(del);
                // console.log('data deleted')
                res.json({redirect: true, message: 'Login Successful'});
            }
            else {
                const del = await UserOTPVerification.deleteOne({ userId: gobalemail });
                // console.log(del);
                // console.log('data deleted')
                // res.render("otp", { message: 'Invalid OTP please try again after 2 mins' });
                res.json({redirect: false, message: "Invalid OTP please try again after 2 minutes" });
                //res.send('Invalid otp');
            }
        }

    } catch (error) {
        console.log('yo3');
        console.log(error);
    }
})

// FORGET PASSWORD ROUTE
let gobalemail2 = '';
router.post("/forgetpassword", async (req, res) => {
    gobalemail2 = req.body.femail;
    // console.log(req.body.femail);
    Emailsender(req.body.femail);
    res.json({ message: 'OTP sent' })
})

// OTP FOR GENERATING NEW PASSWORD
router.post("/otpverify", async (req, res) => {
    try {
        const otp1 = req.body.number;
        // console.log(otp1);
        const OTPRecord = await UserOTPVerification.find({
            userId: gobalemail2,
        });
        // console.log(gobalemail2);
        if (OTPRecord.length <= 0) {
            console.log('otp in record empty');
            // res.render("forget", { message: 'OTP in record empty' });
            // res.send('otp in record empty');
            res.json({redirect: false, message: 'OTP cannot be empty'})
        } else {
            const isMatch = await bcrypt.compare(otp1, OTPRecord[0].otp);

            if (isMatch) {
                // res.redirect('resetpassword');
                const del = await UserOTPVerification.deleteMany({ userId: gobalemail2 });
                // console.log(del);
                // console.log('data deleted')
                res.json({redirect: true, message: "Redirecting to reset password page"})
            }
            else {
                const del = await UserOTPVerification.deleteMany({ userId: gobalemail2 });
                // console.log(del);
                // console.log('data deleted')
                // res.render("forget", { message: 'Invalid OTP please try again after 2 mins' });
                //res.send('Invalid otp');
                res.json({redirect: false, message: 'Invalid OTP please try again after 2 mins'});
            }
        }

    } catch (error) {
        console.log('yo9');
        console.log(error);
    }
})

// RESET PASSWORD AFTER VALIDATING OTP
router.post("/resetpassword", async (req, res) => {
    try {
        // console.log(gobalemail2);
        const password = req.body.pass;
        const cpassword = req.body.cpass;

        var myquery = { email: gobalemail2 };
        var newvalues = { $set: { password: req.body.pass } }

        if (password === cpassword) {
            const reset = await Register.findOne({ email: gobalemail2 });
            reset.password = req.body.pass
            await reset.save();

            // res.render("reset", { message: 'Password Reset Successful !' });
            res.json({success: true, message: 'Password Reset Successful' })

        } else {
            // res.render("reset", { message: 'Passwords Not Matching' });
            res.json({success: false, message: 'Passwords Not Matching' });
        }
    } catch (error) {
        console.log('yo55')
        console.log(error)
    }

})



// FUNCTION TO SEND EMAIL
async function Emailsender(email) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'eventual274@gmail.com',
            pass: 'hnauqvpjdiqwwovq'
        }
    });

    try {
        let otpp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false })
        console.log(otpp);

        const mailOptions = {
            from: 'eventual274@gmail.com', // sender address
            to: email, // list of receivers
            subject: 'Verification Code', // Subject line
            html: `
            <body style="background-color:#f8e3c8;padding:4%">
            <div style="font-size:18px;text-align:center;margin-bottom:4%">Even-Tual Event Platform</div>
            <div style="font-family:open Sans Helvetica, Arial, sans-serif;font-size:18px;text-align:center">Hello,<br>Below is your one time passcode:</div>
            <div style="text-align:center;padding:4%"><button style="background:white;border-radius:5px;border: none;padding: 15px 32px;text-align: center;font-size:25px"><b style="font-family:Graduate;letter-spacing:4px">${otpp}</b></button></div>
            <div style="font-family:open Sans Helvetica, Arial, sans-serif;font-size:18px;text-align:center">If you didn't request this, you can ignore or let us know.<br>-Team Eventual</div>
            </body>`
        };

        const saltRounds = 10;
        const HashedOtp = await bcrypt.hash(otpp, saltRounds);
        const newOTPVerification = new UserOTPVerification({
            userId: email,
            otp: HashedOtp,
            createdAt: Date.now(),
            expireAt: Date.now() + 3600000,
        });
        await newOTPVerification.save();

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log('yo1');
                console.log(err)
            }
        });

    } catch (error) {
        console.log('error in sending email');
        console.log(error);
    }
}

module.exports = router;
