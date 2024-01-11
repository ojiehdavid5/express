const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

const  fsPromises=require('fs').promises;
const path=require('path');




const jwt=require('jsonwebtoken');
require('dotenv').config();

const handleLogout =   async(req, res) => {
    //on client,also delete the accesstoken
    
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //no content
    const refreshToken=cookies.jwt;
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) {
        res.clearCookie("jwt",{httpOnly:true,sameSite:none,secure:true});
        return res.sendStatus(204); //forbidden
    }

    //Delete refreshToken in db
    const otherUsers=usersDB.users.find(person => person.refreshToken!== foundUser.refreshToken);
    const currentUser={...otherUsers,refreshToken:''}
    usersDB.setUsers([...otherUsers,currentUser]);
    await fsPromises.writeFile(
        path.join(__dirname, '..' ,'model','user.json'),
        JSON .stringify(usersDB.user)
    );
    
    res.clearCookie( 'jwt', {httpOnly: true}); //secure true only server on true

    res.sendStatusCode(204);
}

module.exports = { handleLogout }