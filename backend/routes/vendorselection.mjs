import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const vendorselectionrouter = express.Router();

vendorselectionrouter.post("/", async (req, res) => {
  const { products } = req.body;

  // Validate that products is an array of tuples [quantity, productName]
  if (!Array.isArray(products) || products.length === 0 || !products.every(p => Array.isArray(p) && p.length === 2)) {
    return res.status(400).json({ success: false, message: 'Products list is required and should be an array of tuples [quantity, productName]' });
  }

  try {
    let collection = await db.collection("ahara-product-inventory-table");
    let productSpecPriceCollection = await db.collection("ahara-product-specs");

    // Extract just the product names from the tuples for querying
    const productNames = products.map(([quantity, product]) => product);

    // Find all distributors that have products in the product list
    let results = await collection.find({
      Product: { $in: productNames }
    }).toArray();

    let distributorsSet = new Set();
    results.forEach(item => {
      item.Distributors.split(',').forEach(distributor => {
        distributorsSet.add(distributor.trim());
      });
    });

    let distributorPrices = {};

    // Loop through the products to calculate prices
    for (let [quantity, product] of products) {
      // Find the specs for the current product
      let productSpecs = await productSpecPriceCollection.find({ Name: product }).toArray();
      productSpecs.forEach(spec => {
        // Parse the price as a float and multiply by the quantity
        let price = parseFloat(spec.Price.replace('$', '')) * quantity;
        let uom = spec.Unit

        // Get and clean the distributor list
        let distributors = spec.Distributor.split(',').map(distributor => distributor.trim());
        distributors.forEach(distributor => {
          // If the distributor is in the set of distributors that have the products
          if (distributorsSet.has(distributor)) {
            if (!distributorPrices[distributor]) {
              distributorPrices[distributor] = { total: 0, products: new Set() };
            }
            // Add the prices and product information
            distributorPrices[distributor][product] = price;
            distributorPrices[distributor].total += price;
            distributorPrices[distributor].products.add(product);
            distributorPrices[distributor].uom = uom;
          }
        });
      });
    }

    // Filter out distributors that do not have all the products in the query
    let filteredDistributorPrices = {};
    for (let distributor in distributorPrices) {
      if (distributorPrices[distributor].products.size === products.length) {
        filteredDistributorPrices[distributor] = distributorPrices[distributor];
        delete filteredDistributorPrices[distributor].products;
      }
    }

    // Sort distributorPrices by total
    let sortedDistributorPrices = Object.entries(filteredDistributorPrices)
      .sort(([, a], [, b]) => a.total - b.total)
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

    res.status(200).send(sortedDistributorPrices);
  } catch (error) {
    console.error("Error fetching vendor selection:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default vendorselectionrouter;
