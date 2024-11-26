import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import "express-async-errors";
import ingredients from "./routes/ingredients.mjs";
import users from "./routes/users.mjs";
import orders from "./routes/orders.mjs";
import distributors from "./routes/distributors.mjs";
import restaurants from "./routes/restaurants.mjs";
import carts from "./routes/carts.mjs";
import vendorselection from "./routes/vendorselection.mjs";
import geolocation from "./routes/geolocation.mjs";
import email from "./routes/email.mjs";
import nodemailer from 'nodemailer';


// import distributors from "./routes/distributors.mjs";
const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// Load the /posts routes
app.use("/ingredients", ingredients);
app.use("/users", users);
app.use("/orders", orders);
app.use("/distributors", distributors);
app.use("/restaurants", restaurants);
app.use("/carts", carts);
app.use("/vendorselection", vendorselection);
app.use("/geolocation", geolocation);
app.use("/email", email);


// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
