import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

const restaurantrouter = express.Router();

// Get a list of 50 posts
restaurantrouter.get("/", async (req, res) => {
  let collection = await db.collection("ahara-users");
  let results = await collection.find({})
    .limit(50)
    .toArray();
  console.log(results);
  res.send(results).status(200);
});


restaurantrouter.post("/register", async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const collection = db.collection("ahara-users");
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await collection.insertOne({ username, password: hashedPassword, role });
    res.status(201).send({ success: true, message: 'User created', userId: newUser.insertedId });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send({ success: false, message: 'Error creating user' });
  }
});

// Login endpoint
restaurantrouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const collection = db.collection("ahara-users");
    const user = await collection.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      res.json({ success: true, role: user.role });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default restaurantrouter;
