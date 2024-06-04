import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const ingredientsrouter = express.Router();

// Get a list of 50 posts
ingredientsrouter.get("/", async (req, res) => {
  let collection = await db.collection("ahara-collection");
  let results = await collection.find({})
    .limit(50)
    .toArray();
  console.log(results);
  res.send(results).status(200);
});


// Get a single ingredient
ingredientsrouter.get("/:id", async (req, res) => {
  let collection = await db.collection("ahara-collection");
  let query = {_id: ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Fetches the latest posts
ingredientsrouter.get("/latest", async (req, res) => {
  let collection = await db.collection("ahara-collection");
  let results = await collection.aggregate([
    {"$project": {"author": 1, "title": 1, "tags": 1, "date": 1}},
    {"$sort": {"date": -1}},
    {"$limit": 5}
  ]).toArray();
  res.send(results).status(200);
});


// Add a new document to the collection
ingredientsrouter.post("/", async (req, res) => {
  let collection = await db.collection("ahara-collection");
  let newDocument = req.body;
  newDocument.date = new Date();
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// Update the post with a new comment
// Update the body of the post
ingredientsrouter.patch("/body/:id", async (req, res) => {
  const query = { _id: ObjectId(req.params.id) };
  const updates = {
    $set: { content: req.body.content } // Update to use $set and target 'content' field
  };

  let collection = await db.collection("ahara-collection");
  let result = await collection.updateOne(query, updates);

  if (result.modifiedCount === 0) {
    res.status(404).send("Post not found or no changes made.");
  } else {
    res.status(200).send(result);
  }
});


ingredientsrouter.get("/cheapest/:productSpecification", async (req, res) => {
  try {
    let collection = await db.collection('ahara-collection');

    // Query to find the cheapest ingredient matching the product specification
    const query = { productSpecification: req.params.productSpecification };
    const options = {
      sort: { price: 1 },  // Sort by price ascending
      limit: 1  // Return only the cheapest one
    };

    const result = await collection.findOne(query, options);

    if (!result) {
      res.status(404).send("No ingredient found matching the specification.");
    } else {
      res.status(200).send({ distributor: result.distributor });
    }
  } catch (error) {
    console.error("Failed to retrieve the ingredient:", error);
    res.status(500).send("An error occurred while fetching the ingredient");
  }
});


ingredientsrouter.post("/cheapest-order-package", async (req, res) => {
  try {
    const db = await getDb();
    const collection = db.collection('ingredients');
    const productSpecs = req.body.productSpecifications; // Expect an array of product specifications

    // Prepare the aggregation pipeline
    const pipeline = [
      {
        $match: {
          productSpecification: { $in: productSpecs }
        }
      },
      {
        $sort: { price: 1 }
      },
      {
        $group: {
          _id: "$productSpecification",
          distributor: { $first: "$distributor" },
          price: { $first: "$price" }
        }
      },
      {
        $sort: { "_id": 1, "price": 1 }
      },
      {
        $project: {
          _id: 0,
          productSpecification: "$_id",
          distributor: 1,
          price: 1
        }
      }
    ];

    const results = await collection.aggregate(pipeline).toArray();

    if (results.length === 0) {
      res.status(404).send("No matching ingredients found for the given specifications.");
    } else {
      res.status(200).json(results);
    }
  } catch (error) {
    console.error("Failed to retrieve ingredients:", error);
    res.status(500).send("An error occurred while fetching the ingredients");
  }
});



// Delete an entry
ingredientsrouter.delete("/:id", async (req, res) => {
  const query = { _id: ObjectId(req.params.id) };

  const collection = db.collection("ahara-collection");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default ingredientsrouter;
