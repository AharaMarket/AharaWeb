import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import mongoose from 'mongoose';

const restaurantrouter = express.Router();

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  restaurantName: { type: String, required: true },
  password: { type: String, required: true },
  orders: { type: Number, default: 0 },
  creditBalance: { type: Number, default: 0 },
  distributorPartners: { type: Number, default: 0 },
  monthSaved: { type: Number, default: 0 },
  monthSpent: { type: Number, default: 0 },
  totalDishes: { type: Number, default: 0 }
});

// Create a user model
const User = mongoose.model('User', userSchema);


// Get a list of 50 posts
restaurantrouter.get("/", async (req, res) => {
  let collection = await db.collection("ahara-restaurants");
  let results = await collection.find({})
    .limit(50)
    .toArray();
  console.log(results);
  res.send(results).status(200);
});


restaurantrouter.post('/register', async (req, res) => {
  const { name, email, restaurantName, password } = req.body;

  // Basic validation
  if (!name || !email || !restaurantName || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
  }

  // Further email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
  }

  // Password validation (example: at least 6 characters)
  if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
  }

  try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Initialize the values and create a new user instance
      const newUser = new User({
          name,
          email,
          restaurantName,
          password: hashedPassword,  // Store the hashed password
          orders: 0,
          creditBalance: 0,
          distributorPartners: 0,
          monthSaved: 0,
          monthSpent: 0,
          totalDishes: 0
      });

      // Save the new user to the database
      const collection = db.collection('ahara-restaurants');

        await collection.insertOne(newUser);

        res.status(201).json({ message: 'User registered successfully!', user: newUser });
    } catch (error) {
        // Check if email is already taken
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Email already exists.' });
        }
        res.status(500).json({ message: 'Server error, please try again later.' });
    }
});

// Login endpoint
restaurantrouter.post('/login', async (req, res) => {
  try {
      const { email, password } = req.body;
      if (!email || !password) {
          return res.status(400).json({ success: false, message: 'Email and password are required' });
      }
      
      const collection = db.collection('ahara-restaurants');
      const user = await collection.findOne({ email });
      console.log(email)
      console.log("_________________")
      console.log(user)
      if (user && user.password) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            return res.json({ success: true, user: email });
          } else {
              return res.status(401).json({ success: false, message: 'Invalid credentials' });
          }
      } else {
          return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
  } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ success: false, message: 'Server error' });
  }
});

restaurantrouter.get('/restaurantinfo', async (req, res) => {
  try {
      const email = req.query.email;
      if (!email) {
          return res.status(400).json({ success: false, message: 'Email is required' });
      }

      const collection = db.collection('ahara-restaurants');
      console.log(`Searching for restaurant information with email: ${email}`);
      const restaurantInfo = await collection.findOne({ email });

      if (restaurantInfo) {
          // Exclude the password from the response
          const { password, ...rest } = restaurantInfo;
          return res.json({ success: true, data: rest });
      } else {
          console.log(`Restaurant information not found for email: ${email}`);
          return res.status(404).json({ success: false, message: 'Restaurant information not found' });
      }
  } catch (error) {
      console.error("Error fetching restaurant information:", error);
      res.status(500).json({ success: false, message: 'Server error' });
  }
});



export default restaurantrouter;
