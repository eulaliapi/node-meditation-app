import User from '../models/User.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
dotenv.config();

const loginUser = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        res.status(400).json({
            "message": "user and password are required"
        });
    };

    const [user] = await User.findByEmail(email);

    if(user.length === 0) {
        res.status(401).json({"message": "bad credentials"});
    }

    const match = await bcrypt.compare(password, user[0].password);
    
    if(match) {

        const accessToken = jwt.sign(
            {"user": user[0].email},
            process.env.ACCESS_TOKEN,
            {expiresIn: '5h'}
        );
        
        
        const savedToken = await User.saveToken(accessToken, user[0].id);
        res.cookie("access-token", accessToken, {httpOnly: true, secure: true, sameSite: 'None',  maxAge: 24 * 60 * 60 * 1000});
        res.json({access_token: accessToken });
        

    } else {
        res.sendStatus(401);
    }

};

export default {loginUser};