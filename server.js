import express from "express";
const app = express();

import cors from "cors";
import mongoose from "mongoose";
import dnsrouter from "./routes/dnsroutes.js";

app.use(cors());
app.use(express.json());
const port = 5000;

mongoose
  .connect(
    "mongodb+srv://romrom:itiswhatitis@blogapp.nl23uxd.mongodb.net/dns?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to Mongo DB Successfully."))
  .catch((err) => console.log("Failed to connect with Mongo DB:", err));

app.use("/api", dnsrouter);

app.all("*", (req, res) => {
  res
    .status(404)
    .json({ status: 404, message: "Route does not exists", data: {} });
});
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
