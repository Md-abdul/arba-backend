const express = require("express");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/usermodel");
const multer = require("multer");
const fs = require("fs");

const authRoutes = express.Router();


authRoutes.post("/signup", async (req, res) => {
  try {
    const { fullName, userName, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const newUser = new UserModel({
      fullName,
      userName,
      email,
      password, 
    });

    await newUser.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});



authRoutes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, "Arba");

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

authRoutes.get("/singleusers", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "Arba");
    const userId = decodedToken.userId;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

authRoutes.put("/profile/update", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "Arba");
    const userId = decodedToken.userId;

    const { fullName, userName, email, password } = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { fullName, userName, email, password },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = authRoutes;





// file uplaod code try

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const uploadDir = "../upload/avatars"; 
//     fs.mkdir(uploadDir, { recursive: true }, function (err) {
//       if (err && err.code !== "EEXIST") {
//         console.error("Error creating directory:", err);
//       }
//       cb(null, uploadDir);
//     });
//   },
//   filename: (req, file, cb) => {
//     return cb(
//       null,
//       `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

// const upload = multer({ storage: storage });

// authRoutes.post("/signup", upload.single("avatar"), async (req, res) => {
//   try {
//     const { fullName, userName, email, password,avatar } = req.body;

//     const existingUser = await UserModel.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email is already registered" });
//     }

//     const newUser = new UserModel({
//       fullName,
//       userName,
//       email,
//       password,
//       avatar, 
//     });

//     await newUser.save();

//     res.status(201).json({ message: "Signup successful" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });