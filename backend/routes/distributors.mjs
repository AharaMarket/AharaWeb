import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const distributorsrouter = express.Router();

// Get a list of 50 distributors
distributorsrouter.get("/", async (req, res) => {
  let collection = await db.collection("ahara-distributors");
  let results = await collection.find({})
    .limit(50)
    .toArray();
//   console.log(results);
  res.send(results).status(200);
});


export default distributorsrouter;