const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    project: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    venue: { type: String, required: true },
    desc: { type: String, required: true },
    latitude: { type: Number, required: true },   // ✅ FIXED
    longitude: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
