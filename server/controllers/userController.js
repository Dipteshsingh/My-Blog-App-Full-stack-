import userModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from 'validator'
import getDataUri from "../utils/dataUri.js"
import cloudinary from "../utils/cloudinary.js"


const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  })

}
// register user-------
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body
  try {
    const existUser = await userModel.findOne({ email })
    if (existUser) {
      return res.json({ success: true, message: 'User already exists' })
    }
    // Validating email and password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Please enter a valid email' })
    }
    if (password.length < 8) {
      return res.json({ success: false, message: 'Please enter a strong password' })
    }

    // Hasing password---
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new userModel({
      firstName,
      lastName,
      email,
      password: hashedPassword
    })

    const user = await newUser.save();
    const token = createToken(user._id)
    return res.json({
      success: true,
      message: "Registration successful",
      user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email },
      token
    });



  } catch (error) {
    res.json({ success: false, message: 'Error', error: error.message })
  }
}

// Login user ---
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = createToken(user._id); // Make sure this uses _id

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true in production, false in dev
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.firstName,
        photoUrl:user.photoUrl
      },
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};



// Update user---
const updateUser = async (req, res) => {
  try {
    const userId = req.user?._id || req.userId;
    const {
      firstName, lastName, occupation, bio, description,
      instagram, facebook, linkedin, github
    } = req.body;

    const file = req.file;
    let photoUrl;

    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri);
      photoUrl = cloudResponse.secure_url;
      console.log(photoUrl);
      
    }
    const user = await userModel.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found!'
      });
    }

    // Update user fields if present
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (occupation) user.occupation = occupation;
    if (description) user.description = description;
    if (instagram) user.instagram = instagram;
    if (facebook) user.facebook = facebook;
    if (linkedin) user.linkedin = linkedin;
    if (github) user.github = github;
    if (bio) user.bio = bio;
    if (photoUrl) user.photoUrl = photoUrl;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile"
    });
  }
};
const getAllUsers = async (req, res) => {
    try {
      const users = await userModel.find().select('-password'); // exclude password field
      res.status(200).json({
        success: true,
        message: "User list fetched successfully",
        total: users.length,
        users
      });
    } catch (error) {
      console.error("Error fetching user list:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch users"
      });
    }
  };


export { registerUser, loginUser, updateUser,getAllUsers }
