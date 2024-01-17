import mongoose, { Schema } from "mongoose";

const record = new mongoose.Schema({
  domain: {
    type: String,
    unique: true,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
});

const Record = mongoose.model("Record", record);

export { Record };
