const User = require("./../model/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All Fields are required" });
  }
  const user = await User.findOne({ email }).exec();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Incorrect Password" });
  else {
    res.status(200).json({
      name: user.name,
    });
  }
});

const signUp = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All Fields are required" });
  }
  // Check for Duplicates
  const duplicate = await User.findOne({ email }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Email already exists" });
  }

  // Hash Password
  const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

  const userObj = {
    name,
    email,
    password: hashedPwd,
  };

  // Create and Store New user
  const user = await User.create(userObj);

  if (user) {
    res.status(201).json({ message: `New User ${name} created` });
  } else {
    res.status(400).json({ message: "Invalid data received" });
  }
});

module.exports = { signIn, signUp };
