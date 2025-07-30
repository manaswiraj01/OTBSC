import express from 'express';
const adminRouter = express.Router();
import bcrypt from 'bcrypt';
import Admin from '../models/adminModel.js';

adminRouter.post('/signup', async (req, res) =>{
    try{
        const {name, email, password, phoneNo, countryCode} = req.body;

        const passwordHash = await bcrypt.hash(password, 10);

        const admin = new Admin({
            name,
            email,
            password: passwordHash,
            phoneNo,
            countryCode
        });

        const savedAdmin = await admin.save();
        const token = await savedAdmin.getJWT();

        res.cookie('token', token, {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        })

        res.json({
            message: "Admin added successfully", data: savedAdmin
        });
    }catch(err){
        res.status(404).send(err.message);
    }
});

adminRouter.post('/login', async (req, res) =>{
    try{
        const {email, password} = req.body;
        const admin = await Admin.findOne({email : email});
        if(!admin){
            throw new Error("Invalid Credentials");
        }

        const isPasswordValid = await admin.validatePassword(password);
        if(isPasswordValid){
            const token = await admin.getJWT();
            res.cookie('token', token, {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            })
            .json({message: "Admin Login successfully", admin});
        }
        else{
            throw new Error("Invalid Credentials");
        }

    }catch(err){
        res.status(404).send(err.message);
    }
});

adminRouter.post('/logout', (req, res)=>{
    try{
        res.cookie('token', '', {
            expires: new Date(Date.now()),
        }).send("Admin logout successfully");
    }
    catch(err){
        res.status(404).send(err.message);
    }
});

export default adminRouter;