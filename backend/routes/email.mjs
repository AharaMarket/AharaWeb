import express from "express";
import db from "../db/conn.mjs";
import nodemailer from 'nodemailer';

const emailrouter = express.Router();

// Define a POST route for sending email
emailrouter.post('/send', async (req, res) => {
    const { email, orderId, newOrder } = req.body; // Get email details from the client
    console.log("inside the router " + email);

    const subject = "Order# " + {orderId};

    let addOrder = {
        orderId: orderId,
        restaurant: email,
        items: newOrder,
        orderStatus: "Pending",
        date: (new Date()).toLocaleDateString('en-US'),
        time: (new Date()).toTimeString('en-US'),
        deliveryFee: "0",
        serviceFee: "0",
        active: true
      };
    
    const text = "The order is " + JSON.stringify(addOrder, null, 2);
  
    // Create a transporter using SMTP (You can use Gmail, SendGrid, etc.)
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can use other services like Outlook, SendGrid, etc.
      auth: {
        user: 'aharamarket@gmail.com', // Your email
        pass: 'icjz ecxg eftx fzoj', // Your email password (or app password)
      },
    });
  
    // Define email options
    const mailOptions = {
      from: 'aharamarket@gmail.com', // Sender's email address
      to: email, // Recipient's email
      subject, // Subject of the email
      text, // Body content of the email
    };

    const transporter2 = nodemailer.createTransport({
      service: 'gmail', // You can use other services like Outlook, SendGrid, etc.
      auth: {
        user: 'aharamarket@gmail.com', // Your email
        pass: 'icjz ecxg eftx fzoj', // Your email password (or app password)
      },
    });
  
    // Define email options
    const mailOptions2 = {
      from: 'aharamarket@gmail.com', // Sender's email address
      to: 'aharamarket@gmail.com', // Recipient's email
      subject, // Subject of the email
      text, // Body content of the email
    };
  
    try {
      // Send email using Nodemailer
      const info = await transporter.sendMail(mailOptions);
      const info2 = await transporter2.sendMail(mailOptions2);
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    } catch (error) {
      console.error('Error sending email: ', error);
      res.status(500).send('Error sending email');
    }
  });

export default emailrouter;