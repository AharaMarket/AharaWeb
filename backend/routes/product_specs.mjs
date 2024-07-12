import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const product_spec = express.Router();

product_spec.get("/", async (req, res) => {
  let collection = await db.collection("ahara-product-specs");
  try {
    const products = await collection.aggregate([
      {
        $group: {
          _id: '$Product-Specification',
          // array called details
          details: {
            $push: {
              Price: '$Price',
              Unit: '$Unit',
              Distributor: '$Distributor'
            }
          }
        }
      }
    ]).toArray();

    // removes $ sign and comma. it makes a price stirng into a floating point number
    const extractPrice = (priceStr) => {
      return parseFloat(priceStr.replace('$', '').replace(',', ''));
    };

    // make into JSON
    // map applies a function to each element in original array
    const transformedData = products.map(product => {
      const prices = product.details.map(detail => extractPrice(detail.Price));
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      return {
        'Product-Specification': product._id,
        'Price-Range': `${minPrice.toFixed(2)} - $${maxPrice.toFixed(2)}`,
        'URL': 'https://ingredient-photos.s3.us-east-2.amazonaws.com/' + product._id.toLowerCase() + '.jpg',
        details: product.details
      };
    });

    res.status(200).json(transformedData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching product specifications');
  }
});

export default product_spec;