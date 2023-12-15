import express from "express";
import createError from "http-errors";
import cors from "cors";

const app = express();
import "dotenv/config";
import { upload } from "./src/middlewares/upload-file.js";
import { connectDb } from "./src/config/db.js";
import { User } from "./src/models/user.js";
const port = process.env.SERVER_PORT || 5001;

// middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// home route
app.get("/", (req, res) => {
  res.send("Hello from home route!");
});

// create user
app.post("/api/users/create", upload.single("image"), async (req, res) => {
  const { name, email } = req.body;
  const image = req.file.filename;
  const newUser = {
    name,
    email,
    image,
  };

  try {
    await User.create(newUser);
    res.status(201).json({ message: "User created" });
  } catch (error) {
    throw new Error(error.message);
  }
});
// get all user
app.get("/api/users", async (req, res) => {
  try {
    res.status(200).json({ message: "Users returned!" });
  } catch (error) {
    throw new Error(error.message);
  }
});
// get specific user
app.get("/api/users/:id", async (req, res) => {
  try {
    res.status(200).json({ message: "User returned!" });
  } catch (error) {
    throw new Error(error.message);
  }
});
// update specific user
app.patch("/api/users/:id", async (req, res) => {
  try {
    res.status(201).json({ message: "User updated!" });
  } catch (error) {
    throw new Error(error.message);
  }
});
// delete specific user
app.delete("/api/users/:id", async (req, res) => {
  try {
    res.status(201).json({ message: "User deleted!" });
  } catch (error) {
    throw new Error(error.message);
  }
});

// client error route
app.all("*", (req, res, next) => {
  next(createError(404, "Route not found!"));
});

// server error route
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

// server running
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  connectDb();
});
