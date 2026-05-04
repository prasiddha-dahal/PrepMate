const userModel = require('../models/user.model')
const blacklisttokenModel = require('../models/blacklist.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');


const register = async (req, res) => {

    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "please provide username , email or password"
            })
        }

        const ifUserExists = await userModel.findOne({
            $or: [{ username }, { email }]   // $or: [{condition1}, {condition2}] if either of the condition is matched , its executes
        });

        if (ifUserExists) {
            return res.status(400).json({
                message: "account already exist with this username or email"
            });
        };

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hashPassword
        });

        res.status(201).json({
            message: "user registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })

    } catch (error) {
        console.error(error.message)
    }
}

const login = async (req, res) => {

    try {
        const { identifier, password } = req.body;

        const user = await userModel.findOne({ 
        $or : [{email: identifier}, {username: identifier}]
        });

        if (!user) {
            return res.status(400).json({
                message: "user doesn't exists"
            })
        };

        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
            return res.status(400).json({
                message: "invalid credentials"
            })
        };

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,    //cookie cannot be accessed from js 
            secure: false  // cookie can be send from both http and https 
        });

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })

    } catch (error) {
        console.error(error.message)
    }
}


const logout = async (req, res) => {

    try {
        const token = req.cookies.token;   //first fetching token from the cookies from users browser

        if(token){
            await blacklisttokenModel.create({
                token
            })
        }

        res.clearCookie("token");

        res.status(200).json({
            message: "logged out successful"
        })

    } catch (error) {
        console.error(error.message)
    }
}


const getMe = async(req,res) => {
    try{

        const user = await userModel.findById(req.user.id);

        res.status(200).json({
            message : "User detail fetched successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    }catch(error){
        console.error(error.message)
    }
}


module.exports = { register, login, logout ,getMe}
