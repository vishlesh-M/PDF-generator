import { model } from "mongoose";
import UserModel from "../model/User.model.js";
import bcrypt from 'bcrypt';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import ENV from '../config.js'
import otpGenerator from 'otp-generator'


/** midleware to verify user */

export async function verifyUser(req,res,next){
  try {
    const { username } = req.method === "GET" ? req.query : req.body;

    // Check the user existence
    let exist = await UserModel.findOne({ username });
    if (!exist) return res.status(404).send({ error: "Cannot find user!" });
    next();
  } catch (error) {
    return res.status(404).send({ error: "Authentication Error" });
  }
}


//router.post('/register', async (req,res)=>{
  export async function register(req, res) {
    const { username, password, profile, email } = req.body;
  
    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
  
    try {
      // Check if user already exists
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use.' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user instance
      const user = new UserModel({
        username: username,
        password: hashedPassword,
        profile: profile || '',
        email: email
      });
  
      // Save the user
      const savedUser = await user.save();
      res.status(201).json({ message: 'User created successfully', user: savedUser });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Error registering user' });
    }
  }

export async function login(req,res){
    const{username,password}=req.body;
    try{
    const user = await UserModel.findOne({username});

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const passwordMatch = await bcrypt.compare(password , user.password);

    // If passwords don't match, return error
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Password does not match' });
    }

    const token = jwt.sign(
        { userId: user._id, username: user.username },
        ENV.JWT_SECRET,
        { expiresIn: '24h' } // Token expires in 1 hour
      );
      res.status(200).json({ token,userId: user._id,username:user.username,msg:"login successful...!" });
}catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export async function getUser(req,res){
   const {username} = req.params;
   try {
    const user = await UserModel.findOne({ username }).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
      }
    catch (error) {
      return res.status(404).send({error:"cannot find user data"});
   }
};

export async function updateUser(req,res){
  // const { username } = req.query; // Assuming username is passed as a URL parameter
  // const updateData = req.body; // Assuming the update data is passed in the request body

  try {
    const {userId} = req.user;
    if(userId){
      const body = req.body;
      UserModel.updateOne({_id : userId,body,function(err,data){
        if(err) throw err;

        return res.status(201).send({message :"Record Updated...!"});
      }})
    }else{
      return res.status(401).send({error :"User Not found...!"});
    }
   // Update the user by username
    // const updatedUser = await UserModel.findOneAndUpdate(
    //   { username },
    //   updateData,
    //   { new: true } // Return the updated document
    // );

    // if (!updatedUser) {
    //   return res.status(404).json({ message: 'User not found' });
    // }
    // // await updatedUser.save();

    // res.status(200).json({ updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  } 
}


export async function generateOtp(req,res){
     req.app.locals.OTP = await otpGenerator .generate(6,{lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})
     res.status(202).send({code:req.app.locals.OTP})
}


export async function verifyOTP(req,res){
    const {code} = req.query;
    if(parseInt(req.app.locals.OTP)=== parseInt(code)){
      req.app.locals.OTP = null;
      req.app.locals.resetSession = true;
      return res.status(201).send({msg: "Verify Successfully!"})
    }
    return res.status(400).send({error: "Invalid Otp"});
}

export async function createResetSession(req,res){
    if(req.app.locals.resetSession){
      req.app.locals.resetSession = flase;
      return res.status(201).send({msg:"access granted!"})
    }
    return res.status(440).send({error: "Session expired"})
}


export async function resetPassword(req, res) {
  if(!req.app.locals.resetSession) 
  return res.status(440).send({error: "Session expired!"});

  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).send({ error: 'Username not found' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      await UserModel.updateOne({ username: user.username }, { password: hashedPassword });
      req.app.locals.resetSession = flase;
      return res.status(201).send({ msg: 'Record Updated' });
    } catch (error) {
      return res.status(500).send({ error: 'Enable to hashed passsword' });
    }
  } catch (error) {
    return res.status(401).send({ error });
  }
}