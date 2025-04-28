const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.registerUser = async (req, res) => {
    try {
        console.log("Received data:", req.body); // Debugging log
  
        const { name, email, password, dob } = req.body;
        if (!name || !email || !password || !dob) {
          return res.status(400).json({ message: "All fields are required" });
        }
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ message: "User already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      // console.log("hashed password",hashedPassword);
      
      user = new User({ name, email, password: hashedPassword, dob });
      console.log("saved user",user);
      
      await user.save();
  
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" ,error});
      console.log(error);
      
    }
  };

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    console.log(users);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
