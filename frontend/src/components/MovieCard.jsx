import React from "react";
import { Star, Play, Plus } from "lucide-react";

const MovieCard = ({ movie }) => {
  return (
    <div className="group relative bg-gray-800/50 rounded-xl overflow-hidden hover:bg-gray-800/70 transition-all duration-300 hover:scale-105">
      <div className="aspect-[2/3] relative overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center space-x-2 mb-3">
              <button className="flex items-center justify-center w-12 h-12 bg-purple-600 hover:bg-purple-700 rounded-full transition-colors duration-200">
                <Play className="h-5 w-5 text-white ml-1" />
              </button>
              <button className="flex items-center justify-center w-10 h-10 bg-gray-800/80 hover:bg-gray-700 rounded-full transition-colors duration-200">
                <Plus className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full">
          <Star className="h-3 w-3 text-yellow-400 fill-current" />
          <span className="text-xs font-semibold text-white">
            {movie.rating}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-white text-sm mb-1 line-clamp-2 group-hover:text-purple-400 transition-colors duration-200">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{movie.year}</span>
          <span className="bg-gray-700 px-2 py-1 rounded-full">
            {movie.genre}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
