import express from 'express';
const authRouter = express.Router();
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';


authRouter.post('/signup', async (req, res)=>{
    try{
        const {name, email, password, phoneNo, countryCode, gender, dob, nationality, country} = req.body;

        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: passwordHash,
            phoneNo,
            countryCode,
            gender,
            dob, 
            nationality,
            country,
        });
        const savedUser = await user.save();
        const token = await savedUser.getJWT();

        res.cookie('token', token, {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        })

        res.json({
            message: "User added successfully", data: savedUser
        });
    }catch(err){
        res.status(404).send(err.message);
    }
});

authRouter.post('/login', async (req, res) =>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email : email});
        if(!user){
            throw new Error("Invalid Credentials");
        }

        const isPasswordValid = await user.validatePassword(password);
        if(isPasswordValid){
            const token = await user.getJWT();
            res.cookie('token', token, {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            })
            .json({message: "Login successfully", user});
        }
        else{
            throw new Error("Invalid Credentials");
        }

    }catch(err){
        res.status(404).send(err.message);
    }
});

authRouter.post('/logout', (req, res)=>{
    try{
        res.cookie('token', '', {
            expires: new Date(Date.now()),
        }).send("User logout successfully");
    }
    catch(err){
        res.status(404).send(err.message);
    }
});

export default authRouter;