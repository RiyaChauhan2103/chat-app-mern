import bcryptjs from "bcryptjs";
import User from "../models/User.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "passwords doesn't match" });
    }
    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "user already exists" });
    }
    //HASH PASSWORD HERE
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const boyProfielPic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfielPic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfielPic : girlProfielPic,
    });
    if (newUser) {
      //Generate JWT token
      // Promise.all([
      //   await generateTokenAndSetCookie(newUser._id, res),
      //   await newUser.save(),
      // ]);
      await generateTokenAndSetCookie(newUser._id, res),
        await newUser.save(),
        delete newUser.password;
      res.status(201).json(newUser);
    } else {
      res.status(400).json({ error: "invalid user data" });
    }
  } catch (error) {
    console.log(`error in signup controller ${error.message}`);
    res.status(500).json({ error: "internal server error" });
  }
};
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    const isPasswordCorrect = await bcryptjs.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "invalid username or password" });
    }
    generateTokenAndSetCookie(user._id, res);
    delete user.password;
    res.status(201).json(user);
  } catch (error) {
    console.log(`error in login ${error.message}`);
  }
};
export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "none",
      secure: process.env.NODE_ENV !== "development",
    });
    // res.cookie("token", "", { maxAge: 0 });
    res.status(201).json({ message: "logged out successfully" });
  } catch (error) {
    console.log(`error in logout ${error.message}`);
    res.status(500).json({ error: "internal server error" });
  }
};
