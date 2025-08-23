import React, { useState } from "react";
import Header from "./Header.jsx";
import Sidebar from "./SideBar.jsx";
import MovieCard from "./MovieCard.jsx";
import { TrendingUp, Star, Clock } from "lucide-react";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const featuredMovies = [
    {
      id: 1,
      title: "Inception",
      poster:
        "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 8.8,
      year: 2010,
      genre: "Sci-Fi",
    },
    {
      id: 2,
      title: "The Dark Knight",
      poster:
        "https://images.pexels.com/photos/7991319/pexels-photo-7991319.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 9.0,
      year: 2008,
      genre: "Action",
    },
    {
      id: 3,
      title: "Interstellar",
      poster:
        "https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&w=400",
      rating: 8.6,
      year: 2014,
      genre: "Drama",
    },
    {
      id: 4,
      title: "Pulp Fiction",
      poster:
        "https://images.pexels.com/photos/7991578/pexels-photo-7991578.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 8.9,
      year: 1994,
      genre: "Crime",
    },
    {
      id: 5,
      title: "The Matrix",
      poster:
        "https://images.pexels.com/photos/7991675/pexels-photo-7991675.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 8.7,
      year: 1999,
      genre: "Sci-Fi",
    },
    {
      id: 6,
      title: "Forrest Gump",
      poster:
        "https://images.pexels.com/photos/7991677/pexels-photo-7991677.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 8.8,
      year: 1994,
      genre: "Drama",
    },
  ];

  const trendingMovies = [
    {
      id: 7,
      title: "Avatar: The Way of Water",
      poster:
        "https://images.pexels.com/photos/7991674/pexels-photo-7991674.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 7.8,
      year: 2022,
      genre: "Adventure",
    },
    {
      id: 8,
      title: "Top Gun: Maverick",
      poster:
        "https://images.pexels.com/photos/7991676/pexels-photo-7991676.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 8.3,
      year: 2022,
      genre: "Action",
    },
    {
      id: 9,
      title: "Black Panther",
      poster:
        "https://images.pexels.com/photos/7991673/pexels-photo-7991673.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 7.3,
      year: 2018,
      genre: "Action",
    },
    {
      id: 10,
      title: "Dune",
      poster:
        "https://images.pexels.com/photos/8263925/pexels-photo-8263925.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 8.0,
      year: 2021,
      genre: "Sci-Fi",
    },
  ];

  const recentMovies = [
    {
      id: 11,
      title: "Everything Everywhere All at Once",
      poster:
        "https://images.pexels.com/photos/8263924/pexels-photo-8263924.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 7.8,
      year: 2022,
      genre: "Comedy",
    },
    {
      id: 12,
      title: "The Batman",
      poster:
        "https://images.pexels.com/photos/8042561/pexels-photo-8042561.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 7.8,
      year: 2022,
      genre: "Crime",
    },
  ];

  return (
    <div className="min-h-screen flex bg-black text-white">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="p-6">
          {/* Hero Section */}
          <div className="mb-12 rounded-2xl bg-gradient-to-r from-purple-700/70 to-indigo-700/70 p-10 text-center">
            <h2 className="text-5xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
              Discover the latest blockbusters and timeless classics. Your next
              favorite movie is just a click away.
            </p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center mx-auto space-x-2">
              <span>Browse Movies</span>
              <TrendingUp className="h-5 w-5" />
            </button>
          </div>

          {/* Featured Movies */}
          <section className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Star className="h-6 w-6 text-yellow-400" />
              <h3 className="text-2xl font-bold">Featured Movies</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {featuredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>

          {/* Trending Now */}
          <section className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <TrendingUp className="h-6 w-6 text-purple-400" />
              <h3 className="text-2xl font-bold">Trending Now</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {trendingMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>

          {/* Recently Added */}
          <section>
            <div className="flex items-center space-x-3 mb-6">
              <Clock className="h-6 w-6 text-blue-400" />
              <h3 className="text-2xl font-bold">Recently Added</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {recentMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
