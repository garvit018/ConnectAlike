import React from "react";
import {
  Home,
  Film,
  Heart,
  Zap,
  Ghost,
  Smile,
  Sword,
  Star,
  TrendingUp,
  Clock,
  X, // Close icon
} from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
  const genres = [
    { name: "Home", icon: Home, count: null },
    { name: "Trending", icon: TrendingUp, count: "127" },
    { name: "Action", icon: Zap, count: "89" },
    { name: "Romance", icon: Heart, count: "56" },
    { name: "Horror", icon: Ghost, count: "34" },
    { name: "Comedy", icon: Smile, count: "78" },
    { name: "Adventure", icon: Sword, count: "45" },
    { name: "Drama", icon: Film, count: "92" },
    { name: "Top Rated", icon: Star, count: "25" },
    { name: "Recently Added", icon: Clock, count: "18" },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900/95 backdrop-blur-sm border-r border-gray-800 transform transition-transform duration-300 z-50 overflow-y-auto
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto`}
      >
        {/* Close button (mobile only) */}
        <div className="flex justify-end lg:hidden p-4">
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-800 transition"
          >
            <X className="h-6 w-6 text-gray-300" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="p-4">
          <div className="space-y-2">
            {genres.map((genre) => {
              const IconComponent = genre.icon;
              return (
                <button
                  key={genre.name}
                  onClick={onClose} // 👈 close sidebar when item clicked
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-3">
                    <IconComponent className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                    <span className="font-medium">{genre.name}</span>
                  </div>
                  {genre.count && (
                    <span className="bg-purple-600/20 text-purple-400 px-2 py-1 rounded-full text-xs font-semibold">
                      {genre.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
