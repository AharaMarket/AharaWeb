import express from "express";
import db from "../db/conn.mjs";

const cartsrouter = express.Router();

// Get a list of 50 carts
cartsrouter.get("/", async (req, res) => {
  let collection = await db.collection("ahara-restaurant-carts");
  let results = await collection.find({})
    .limit(50)
    .toArray();
  res.send(results).status(200);
});

// Fetch a user's cart
cartsrouter.get("/user", async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }
  let collection = await db.collection("ahara-restaurant-carts");

  try {
    const cart = await collection.findOne({ email });
    if (cart) {
      res.status(200).json({ success: true, cart });
    } else {
      res.status(404).json({ success: false, message: 'Cart not found' });
    }
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Add an item to the cart
cartsrouter.post('/add', async (req, res) => {
  const { email, productSpecification, quantity, imageurl } = req.body;
  // add unit within this
  let collection = await db.collection("ahara-restaurant-carts");

  if (!email || !productSpecification || !quantity) {
    return res.status(400).json({ success: false, message: 'Email, productSpecification, and quantity are required' });
  }

  try {
    let cart = await collection.findOne({ email });
    if (!cart) {
      cart = { email, items: [] };
    }

    const itemIndex = cart.items.findIndex(item => 
      item.productSpecification === productSpecification.name
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productSpecification, quantity, imageurl });
    }

    await collection.updateOne(
      { email },
      { $set: { items: cart.items } },
      { upsert: true }
    );
    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update the quantity of an item in the cart
cartsrouter.post('/update', async (req, res) => {
  const { email, productSpecification, quantity } = req.body;
  let collection = await db.collection("ahara-restaurant-carts");

  if (!email || !productSpecification || quantity == null) {
    return res.status(400).json({ success: false, message: 'Email, productSpecification, and quantity are required' });
  }

  try {
    const cart = await collection.findOne({ email });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => 
      item.productSpecification === productSpecification
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      await collection.updateOne(
        { email },
        { $set: { items: cart.items } }
      );
      res.status(200).json({ success: true, cart });
    } else {
      res.status(404).json({ success: false, message: 'Item not found in cart' });
    }
  } catch (error) {
    console.error('Error updating item in cart:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Remove an item from the cart
cartsrouter.post('/remove', async (req, res) => {
  const { email, productSpecification } = req.body;
  let collection = await db.collection("ahara-restaurant-carts");

  if (!email || !productSpecification) {
    return res.status(400).json({ success: false, message: 'Email and productSpecification are required' });
  }

  try {
    const cart = await collection.findOne({ email });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    // Ensure you correctly match productSpecification by comparing fields explicitly
    cart.items = cart.items.filter(item => 
      item.productSpecification !== productSpecification
       );
    
    console.log(cart.items)

    await collection.updateOne(
      { email },
      { $set: { items: cart.items } }
    );

    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


export default cartsrouter;
