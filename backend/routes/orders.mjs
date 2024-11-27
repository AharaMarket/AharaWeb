import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const ordersrouter = express.Router();

// Get a list of 50 posts
ordersrouter.get("/get", async (req, res) => {
  console.log(req.body); // Logs all query parameters
  const { email } = req.query;
  var userid = email;
  console.log("email: " + userid);

  let collection = await db.collection("ahara-orders");
  let results = await collection.find({restaurant: userid})
  .sort({ date: -1 })
    .limit(50)
    .toArray();
  console.log(results);
  res.send(results).status(200);
});


ordersrouter.get("/getRecent", async (req, res) => {
  console.log(req.body); // Logs all query parameters
  const { email } = req.query;
  var userid = email;
  console.log("email: " + userid);

  let collection = await db.collection("ahara-orders");
  let results = await collection.find({restaurant: userid})
    .sort({ createdAt: -1 })  // Assuming "createdAt" is the date field
    .limit(50)
    .toArray();
  console.log(results);
  res.send(results).status(200);
});

ordersrouter.post("/add", async (req, res) => {
    const { email, orderId, newOrder } = req.body; // Extract userid and newOrder from the request body
    // newOrder is undefiend
    var userid = email;

    // var body = JSON.stringify(req.body, null, 2);

    if (!userid || !newOrder) {
      return res.status(400).send({ message: `User ID and new order details are required. ${newOrder}` });
    }

  
    let collection = await db.collection("ahara-orders");

    //need an active parameter

    let addOrder = {
      orderId: orderId,
      restaurant: userid,
      items: newOrder,
      orderStatus: "Pending",
      date: (new Date()),
      deliveryFee: "0",
      serviceFee: "0",
      active: true
    };
    
    let insertResult = await collection.insertOne(addOrder);

    res.send(JSON.stringify(addOrder, null, 2));
  
    // console.log(`Order added for user ${userid}:`, newOrder);
    // res.status(200).send({ message: "Order added successfully", orderDetails: newOrder });
});

  //get orders for a particular user
  // ordersrouter.get("/get", async (req, res) => {
  //   try {
  //     const { email } = req.body;

  //     const collection = await db.collection("ahara-orders");
  //     const userId = email;  // Retrieve the user ID from URL parameter
  
  //     // Query to find orders by user ID
  //     const results = await collection.find({ restaurant: userId }).limit(50).toArray();
  
  //     if (results.length === 0) {
  //       res.status(404).send("No orders found for this user.");
  //     } else {
  //       res.status(200).send(results);
  //     }
  //   } catch (error) {
  //     console.error("Error retrieving orders:", error);
  //     res.status(500).send("Failed to retrieve orders.");
  //   }
  // });
  
export default ordersrouter;