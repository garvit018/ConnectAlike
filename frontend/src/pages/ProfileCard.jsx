import React from "react";
import { Link } from "react-router-dom";

const ProfileCard = ({
  profileImageUrl,
  bio,
  name,
  skills,
  rating,
  username,
}) => {
  return (
    <div className="flex flex-col justify-between items-center text-center bg-black/50 text-gray-300 rounded-2xl shadow-xl w-[300px] min-w-[300px] h-[450px] m-12 overflow-hidden">
      {/* Profile Image */}
      <img
        className="border border-yellow-200 rounded-full p-2 h-24 w-24 mt-4"
        src={profileImageUrl}
        alt="user"
      />

      {/* Name + Rating */}
      <h3 className="font-montserrat text-lg font-semibold mt-2">{name}</h3>
      <h6 className="font-montserrat text-sm uppercase">Rating: {rating} ⭐</h6>

      {/* Bio */}
      <p className="font-montserrat text-sm w-[150px] truncate">{bio}</p>

      {/* Buttons */}
      <div className="flex justify-around">
        <Link to={`/profile/${username}`}>
          <button className="m-4 border border-cyan-500 text-cyan-500 rounded px-4 py-1 transition hover:bg-cyan-500 hover:text-white">
            View Profile
          </button>
        </Link>
      </div>

      {/* Skills */}
      <div className="bg-cyan-900/30 w-full px-4 py-2 mt-4 h-[15vh] overflow-y-auto text-left">
        <h6 className="font-montserrat text-sm uppercase">Skills</h6>
        <div className="flex flex-wrap mt-2">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-green-700 text-white px-3 py-1 rounded mr-2 mt-2 text-sm"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
