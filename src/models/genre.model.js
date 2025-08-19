import mongoose from "mongoose";

const genreSchema = new Schema({
  genre: {
    type: String,
    default: "Uncategorized",
  },
});

export const Genre = mongoose.model("Genre", genreSchema);
