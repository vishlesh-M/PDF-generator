import { model } from "mongoose";
import UserModel from "../model/User.model.js";
import bcrypt from 'bcrypt';
import { Router } from 'express';
import  {jwt}  from 'jsonwebtoken';



//router.post('/register', async (req,res)=>{
export async function register(req,res){
     const { username, password, profile, email } = req.body;

    // const existUsername = new Promise((resolve, reject) => {
    //     UserModel.findOne({ username }, function (err, user) {
    //         if (err) return reject(err);
    //         if (user) return reject({ error: "Please use a unique username" });
    //         resolve();
    //     });
    // });
    
    // const existEmail = new Promise((resolve, reject) => {
    //     UserModel.findOne({ email }, function (err, existingEmail) {
    //         if (err) return reject(err);
    //         if (existingEmail) return reject({ error: "Please use a unique email" });
    //         resolve();
    //     });
    // });
    
    // Promise.all([existUsername, existEmail])
    //     .then(() => {
    //         if (!password) {
    //             return res.status(400).send({ error: "Password is required" });
    //         }
    
    //         bcrypt.hash(password, 10)
    //             .then(hashedPassword => {
    //                 const user = new UserModel({
    //                     username: username,
    //                     password: hashedPassword,
    //                     profile: profile || '',
    //                     email: email
    //                 });
    
    //                 user.save()
    //                     .then(result => res.status(201).send({ msg: "User Registered Successfully" }))
    //                     .catch(error => {
    //                         console.error("Error saving user data:", error);
    //                         res.status(500).send({ error: "Unable to save user data" });
    //                     });
    //             })
    //             .catch(error => {
    //                 console.error("Error hashing password:", error);
    //                 res.status(500).send({ error: "Unable to hash password" });
    //             });
    //     })
    //     .catch(error => {
    //         console.error("Database connection error:", error);
    //         res.status(500).send({ error: "Database connection error" });
    //     });
    //const { firstName, lastName, email, password, confirmPassword } = req.body;

    // Validate input
    if (!username || !email || !password ) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
  
    // if (password !== confirmPassword) {
    //   return res.status(400).json({ message: 'Passwords do not match.' });
    // }
  
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use.' });
    }
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword=await bcrypt.hash(password,salt);

//     const user = new UserModel({
//         username: username,
//         password: hashedPassword,
//         email: email

// })

// jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '5 days' }, (err, token) => {
//     if (err) throw err;
//     res.status(201).json({ message: 'User registered successfully.', token });
// });
bcrypt.hash(password, 10)
             .then(hashedPassword => {
                 const user = new UserModel({
                     username: username,
                     password: hashedPassword,
                     profile: profile || '',
                     email: email
                 });
    // Create a new user
    const newUser = new UserModel({ username, email, password});
    newUser.save();
  
    res.status(201).json({ message: 'User registered successfully.' });
  }); 
}  
export async function login(req,res){
    const{username,password}=req.body;
    try {
        UserModel.findOne({username})
        .then(user =>{
            bcrypt.compare(password, user.password)
            .then(passwordCheck =>{
                if(!passwordCheck) return res.status(400).send({error: "Dont have Password"});
                jwt.sign({
                    userId: user._id,
                    username: user.username
                },'secret',{expiresIn:"24h"});
                return res.status(200).send({
                    msg: "Login successful...!",
                    username:user.username,
                    token
                });
                })
            .catch(error =>{
                return res.status(400).send({error:"Password does not Match"})
            })
        })
        .catch(error =>{
            return res.status(404).send({error:"Username not Found"});
        })
    } catch (error) {
        return res.status(500).send({error});
    }
    }

export async function getUser(req,res){
    res.json('getUser route');
}

export async function updateUser(req,res){
    res.json('updateUser route');
}


export async function generateOtp(req,res){
    res.json('generateOtp route');
}


export async function verifyOtp(req,res){
    res.json('verifyOtp route');
}

export async function createResetSession(req,res){
    res.json('createResetSession route');
}


export async function resetPassword(req,res){
    res.json('resetPassword route');
}

