import User from '../models/User.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const logoutUser = async (req, res) => {

    const cookies = req.cookies;
    const access_token = cookies["access-token"];

    if(!access_token) return res.sendStatus(204);

    const userToLogOut = jwt.verify(
        access_token,
        process.env.ACCESS_TOKEN,
        (err, decoded) => {
            if(err) return res.sendStatus(403);
            return decoded.user
        }
    );
    
    const [user] = await User.findByEmail(userToLogOut);
    
    const userId = user[0].id;
    
    const loggingOut = await User.deleteToken(userId);
    res.clearCookie("access-token", {httpOnly: true, sameSite: "None", secure: true});
    res.sendStatus(204);
};

export default {logoutUser};