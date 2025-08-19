import mongoose from "mongoose";

const movieSchema = new Schema({
  movieName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Genre",
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  trailer: {
    type: String,
  },
});

export const Movie = mongoose.model("Movie", movieSchema);
