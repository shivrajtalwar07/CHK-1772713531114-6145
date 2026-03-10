const express = require("express");
const bcryptjs = require("bcryptjs");
const app = express();

const dotenv = require("dotenv");

const hashPassword = require("./utils/hashPassword");
const userSchema = require("./model/userModel");
dotenv.config();
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("MongoDB connection error:", err.message);
  console.log("Tip: Ensure MongoDB is running locally at " + process.env.MONGODB_URI);
});


app.use(express.json());


app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await hashPassword(password);
  userSchema.create({ name, email, password: hashedPassword }).then((user) => {
    res.status(201).json(user);
  }).catch((err) => {
    res.status(500).json(err);
  })
})
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await userSchema.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 2. Compare password
    const isPasswordMatched = await bcryptjs.compare(password, user.password);

    if (!isPasswordMatched) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. Send safe response (NO password)
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/auth/reset-password", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userSchema.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});