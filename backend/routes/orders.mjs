import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const ordersrouter = express.Router();

// Get a list of 50 posts
ordersrouter.get("/", async (req, res) => {
  let collection = await db.collection("ahara-orders");
  let results = await collection.find({})
    .limit(50)
    .toArray();
  console.log(results);
  res.send(results).status(200);
});

// Add a new order for a user
ordersrouter.put("/addOrder", async (req, res) => {
  const { userId, newOrder } = req.body; // Extract userId and newOrder from the request body

  if (!userId || !newOrder) {
    return res.status(400).send({ message: "User ID and new order details are required." });
  }

  let collection = await db.collection("ahara-orders");

  // Find the user's order by userId and update it by adding the new order
  let updateResult = await collection.updateOne(
    { userId: userId }, // Filter document by userId
    { $push: { orders: newOrder } } // Push the new order into the orders array
  );

  if (updateResult.modifiedCount === 0) {
    console.log(`No orders updated for user ${userId}`);
    return res.status(404).send({ message: "User not found or no changes made." });
  }

  console.log(`Order added for user ${userId}:`, newOrder);
  res.status(200).send({ message: "Order added successfully", orderDetails: newOrder });
});

// Get orders for a particular user
ordersrouter.get("/user/:userId", async (req, res) => {
  try {
    const collection = await db.collection("ahara-orders");
    const userId = req.params.userId;  // Retrieve the user ID from URL parameter

    // Query to find orders by user ID
    const results = await collection.find({ userId: userId }).limit(50).toArray();

    if (results.length === 0) {
      res.status(404).send("No orders found for this user.");
    } else {
      res.status(200).send(results);
    }
  } catch (error) {
    console.error("Error retrieving orders:", error);
    res.status(500).send("Failed to retrieve orders.");
  }
});

export default ordersrouter;
