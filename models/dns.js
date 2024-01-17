import mongoose, { Schema } from "mongoose";

const dnsrecord = new mongoose.Schema({
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

const DNSRecord = mongoose.model("DNSRecord", dnsrecord);

export { DNSRecord };
