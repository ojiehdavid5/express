
const User=require("../model/User");



const jwt=require('jsonwebtoken');
require('dotenv').config();

const handleLogout =   async(req, res) => {
    //on client,also delete the accesstoken
    
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //no content
    const refreshToken=cookies.jwt;
    const foundUser =  await User.findOne({ refreshToken}).exec();
    if (!foundUser) {
        res.clearCookie("jwt",{httpOnly:true,sameSite:none,secure:true});
        return res.sendStatus(204); //forbidden
    }

    //Delete refreshToken in db
    foundUser.refreshToken="";
    const result=await foundUser.save();
    console.log(result);

    res.clearCookie( 'jwt', {httpOnly: true}); //secure true only server on true

    res.sendStatusCode(204);
}

module.exports = { handleLogout }