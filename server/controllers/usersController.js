const User = require('../model/userModel');
const bcrypt = require('bcrypt');

module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user)
            return res.json({ msg: "Incorrect Username or Password", status: false });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('login new user');
        if (!isPasswordValid)
            return res.json({ msg: "Incorrect Username or Password", status: false });
        console.log(req.body);
        delete user.password;
        return res.json({ status: true, user });
    } catch (ex) {
        next(ex);
    }
};

module.exports.register = async (req, res, next) => {
    // console.log(req.body);
    try {
        const { username, email, password } = req.body;
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck) {
            res.json({
                status: false,
                msg: "Username already exists."
            })
        }
        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
            res.json({
                status: false,
                msg: "Email already exists."
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });
        delete user.password;
        res.json({
            status: true,
            user
        });
    }
    catch (err) {
        next(err);
    }
};


