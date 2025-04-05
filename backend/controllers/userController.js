const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {

      const exists = await userModel.findOne({ email });
      if (exists) {
        return res.json({ success: false, message: "User already exists" });
      }
  
    
      if (!validator.isEmail(email)) {
        return res.json({ success: false, message: "Please enter valid email" });
      }
      if (password.length < 8) {
        return res.json({
          success: false,
          message: "Please enter strong password",
        });
      }
  
  
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new userModel({
        name: name,
        email: email,
        password: hashedPassword,
      });
  
      const user = await newUser.save();
      const role=user.role;

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      
      res.json({ success: true, token, role});
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" });
    }
  };

 
const login = async (req, res) => {
    const { email, password } = req.body;
    try {

      const user = await userModel.findOne({ email });

      if (!user) {
        return res.json({ success: false, message: "User Doesn't exist" });
      }

      const isMatch =await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.json({ success: false, message: "Invalid Credentials" });
      }

      const role=user.role;
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      res.json({ success: true, token,role });
      
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" });
    }
  };

  module.exports = {
    register,
    login,
  }