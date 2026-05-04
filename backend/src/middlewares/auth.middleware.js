const jwt = require('jsonwebtoken')
const blackListTokenModel = require('../models/blacklist.model')

const authUser = async (req, res, next) => {

    try {
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({
                message: "Token not available"
            });
        };

        //we have to check if the token is blacklisted or not 
        
        const isTokenBlacklisted = await blackListTokenModel.findOne({
            token
        })

        if(isTokenBlacklisted){
            return res.status(401).json({
                message: "Token is blacklisted . Please login again"
            });
        };

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decoded

        next(); // now flow will be given to getMe controller

    } catch(err){

        return res.status(401).json({
            message: "invalid token"
        })
    }
}

module.exports = {authUser}

