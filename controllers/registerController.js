import User from '../models/User.js';
import bcrypt from 'bcrypt';

const createUser = async (req, res) => {

    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json({"message": "email and password are required"});
    }
    
    const [duplicate] = await User.findByEmail(email);
    
    if(duplicate.length !== 0) {
        return res.status(409).json({"message": "user already exists"});
    };

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = await User.createUser({
            "email": email,
            "password": hashedPassword
        });

        const [newUser] = await User.findByEmail(email);
        
        res.status(201).json({"message": `user (${newUser[0].email}) created`});

    }catch(err) {
        res.status(500).json({"message": err.message});
    }
    
};

export default {createUser};