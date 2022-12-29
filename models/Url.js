import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
  urlId: {
    type: String,
    required: true,
  },
  originalUrl: {
    type: String,
    required: true,
  },
  shortnedUrl: {
    type: String,
    required: true,
  },
  numberOfClicks: {
    type: Number,
    required: true,
    default: 0,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

export default mongoose.model("Url,", UrlSchema);
