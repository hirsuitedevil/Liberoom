const authController = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')  
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
const verifyToken = require('../middlewares/verifyToken');

// google signin
authController.post('/googlesign', async (req, res) => {
  try {
    const { email, name, picture } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      await User.findByIdAndUpdate(existingUser._id, { isGoogleSignedIn: true });
      const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '4h' });
      return res.status(200).json({ user: existingUser, token });
    } else {
      const newUser = await User.create({ email, name, profileImg: picture, isGoogleSignedIn: true });
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '4h' });
      return res.status(201).json({ user: newUser, token });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

//register
authController.post('/register', async(req,res) => {
    try {
        const isExisting = await User.findOne({email: req.body.email})
        if(isExisting){
            throw new Error("Email already exists")
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = await User.create({...req.body, password: hashedPassword})
        const {password, ...others} = newUser._doc
        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: '4h'})

        return res.status(201).json({others,token})
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

//login
authController.post('/login', async(req,res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user){
            throw new Error("Wrong Credentials!!")
        }
        const comparePass = await bcrypt.compare(req.body.password, user.password)
        if(!comparePass){
            throw new Error("Wrong Credentials!!")
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '4h'})
        const {password, ...others} = user._doc
        return res.status(200).json({others,token})
    } catch (error) {
        return res.status(500).json(error.message)
    }
})


// profile update
authController.put('/update', async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email})
    const userId = user._id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    );
    if (!updatedUser) {
      throw new Error('User not found');
    }
    const { password, ...others } = updatedUser._doc;
    const token = jwt.sign({ id: updatedUser._id }, process.env.JWT_SECRET, {
      expiresIn: '4h',
    });
    return res.status(200).json({ others, token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

//forgot-password
authController.post('/forgot-password', async(req,res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user){
            throw new Error("Email not found")
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '4h'})
        
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'noreply.liberoom@gmail.com',
            pass: 'szotmdhfpivemhbu'
          }
        });

        var mailOptions = {
          from: 'noreply.liberoom@gmail.com',
          to: req.body.email,
          subject: 'Reset Password Link',
          text: `http://localhost:3000/resetpassword/${user._id}/${token}`
        };

        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
            return res.status(500).json("Error sending reset email");
          } else {
            return res.status(201).json({ token });
          }
        });
        return res.status(201).json({token})
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

// reset Password
authController.post('/reset-password/:id/:token', async (req, res) => {
  try {
    const {id,token} = req.params
    const {newPassword} = req.body
    const user = await User.findById(id);
    if(!user){
            throw new Error("Email not found")
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
        if (err) {
            throw new Error("Invalid or expired token");
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword;
        const updatedUser = await user.save();
        const token = jwt.sign({ id: updatedUser._id }, process.env.JWT_SECRET, {expiresIn: '4h',});

    // Return the updated user data and token
    const { password, ...others } = updatedUser._doc;
    return res.status(200).json({ others, token });
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

module.exports = authController;