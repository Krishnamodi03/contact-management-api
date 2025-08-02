import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import contactRoutes from "./Routes/contact.js";
import cors from "cors";

// Load environment variables
dotenv.config();

const app = express();
const port = 3000;
const mongoURI = process.env.MONGODB_URI;

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173', 'http://localhost:4173', 'http://127.0.0.1:5173', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

mongoose.connect(mongoURI);
const connection = mongoose.connection;

// Connect to the database
try {
  connection.on("open", () => {
    console.log("Connected to the database: node-js");
  });
} catch (error) {
  console.log("Error: " + error);
}

// Home route
app.get("/", (req, res) => {
  console.log("req.path", req.hostname);
  res.send("Hello World");
});

// Use the contact routes
app.use(express.json());
app.use("/contact", contactRoutes);

// Start the server
app.listen(port, () => {
  console.log("Server listening on port: localhost:", port);
});
