import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const tablerouter = express.Router();

// Get a list of 50 posts
tablerouter.get("/", async (req, res) => {

  const { products } = req.query;

  let collection = await db.collection("ahara-product-inventory-table");
  let productSpecPriceCollection = await db.collection("ahara-product-specs");

  if (products) {
    // will make the query into a list
    const productList = products.split(',');

    // finds all the distributors that have products in the product list
    let results = await collection.find({
      Product: { $in: productList }
    }).toArray();

    let distributorsSet = new Set();
    results.forEach(item => {
      item.Distributors.split(',').forEach(distributor => {
        distributorsSet.add(distributor.trim());
      });
    });

    let distributorPrices = {};

    for (let product of productList) {
      // find the queries that match the Name
      let productSpecs = await productSpecPriceCollection.find({ Name: product }).toArray();
      productSpecs.forEach(spec => {
        // gets the price, and makes it into a float
        let price = parseFloat(spec.Price.replace('$', ''));

        // gets the distributor, and makes it cleaner
        let distributors = spec.Distributor.split(',').map(distributor => distributor.trim());
        distributors.forEach(distributor => {
          // if the distributor is in the set that contains the distributors that have certain products
          if (distributorsSet.has(distributor)) {

            if (!distributorPrices[distributor]) {
              distributorPrices[distributor] = { total: 0, products: new Set() };
            }
            // add the prices
            distributorPrices[distributor][product] = price;
            distributorPrices[distributor].total += price;
            distributorPrices[distributor].products.add(product);
          }
        });
      });
    }

    // filter out distributors that do not have all the products in the query
    let filteredDistributorPrices = {};
    for (let distributor in distributorPrices) {
      if (distributorPrices[distributor].products.size === productList.length) {
        filteredDistributorPrices[distributor] = distributorPrices[distributor];
        delete filteredDistributorPrices[distributor].products;
      }
    }

    // sort distributorPrices by total
    let sortedDistributorPrices = Object.entries(filteredDistributorPrices)
      .sort(([, a], [, b]) => a.total - b.total)
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

    res.status(200).send(sortedDistributorPrices);
  } else {
    let results = await collection.find({})
      .limit(50)
      .toArray();
    res.send(results).status(200);
  }
});

export default tablerouter;
