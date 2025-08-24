import React from "react";
import { useNavigate } from "react-router-dom";

const SkillSphere = () => {
    const navigate = useNavigate();
  return (
    <div className="bg-[#0d0d0d] text-white min-h-screen font-[Montserrat,sans-serif]">
      <section className="flex flex-col items-center justify-center text-center px-5 py-24 bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a]">
        <h1 className="text-6xl md:text-7xl font-bold font-[Josefin_Sans,sans-serif] mb-6 text-[#d32f2f]">
          SkillSphere
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8 text-gray-300">
          Connect. Learn. Grow. Exchange skills with a vibrant community of
          learners and experts – all for free.
        </p>
        <button
          className="bg-[#d32f2f] text-white font-semibold px-6 py-3 rounded-lg text-lg shadow-md transition-all hover:bg-[#b71c1c] cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Get Started 🚀
        </button>
      </section>

      {/* Why Section */}
      <h2 className="text-4xl md:text-5xl text-center mt-24 mb-12 font-[Oswald,sans-serif] text-[#d32f2f]">
        Why SkillSphere?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8 md:px-20 pb-24 max-w-6xl mx-auto">
        <div className="bg-[#1a1a1a] border border-[#d32f2f] p-6 rounded-xl hover:scale-105 transition-transform">
          <h3 className="text-xl font-semibold text-[#d32f2f] mb-3">
            ➊ Learn From Experts
          </h3>
          <p className="text-gray-300">
            Gain insights directly from mentors who excel in their fields.
            Whether it’s coding, cooking, or marketing – learn from the best.
          </p>
        </div>
        <div className="bg-[#1a1a1a] border border-[#d32f2f] p-6 rounded-xl hover:scale-105 transition-transform">
          <h3 className="text-xl font-semibold text-[#d32f2f] mb-3">
            ➋ Share Your Expertise
          </h3>
          <p className="text-gray-300">
            Become a mentor, share your knowledge, and empower others while
            building your own reputation in the community.
          </p>
        </div>
        <div className="bg-[#1a1a1a] border border-[#d32f2f] p-6 rounded-xl hover:scale-105 transition-transform">
          <h3 className="text-xl font-semibold text-[#d32f2f] mb-3">
            ➌ Collaborative Environment
          </h3>
          <p className="text-gray-300">
            Join projects, connect with peers, and work together in a thriving
            network that sparks creativity and innovation.
          </p>
        </div>
        <div className="bg-[#1a1a1a] border border-[#d32f2f] p-6 rounded-xl hover:scale-105 transition-transform">
          <h3 className="text-xl font-semibold text-[#d32f2f] mb-3">
            ➍ Diverse Learning Opportunities
          </h3>
          <p className="text-gray-300">
            From traditional crafts to cutting-edge tech, explore skills across
            countless domains – all free of cost.
          </p>
        </div>
        <div className="bg-[#1a1a1a] border border-[#d32f2f] p-6 rounded-xl hover:scale-105 transition-transform sm:col-span-2 lg:col-span-1">
          <h3 className="text-xl font-semibold text-[#d32f2f] mb-3">
            ➎ Continuous Growth
          </h3>
          <p className="text-gray-300">
            Keep learning, stay challenged, and unlock new opportunities. Growth
            is endless with SkillSphere.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkillSphere;
