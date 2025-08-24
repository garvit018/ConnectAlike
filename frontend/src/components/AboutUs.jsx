import React from "react";
import aboutImg from "../assets/AboutUs.png";

const AboutUs = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-center bg-[#2D2D2D]">
      <div className="max-w-[50vw] m-10">
        <h2 className="font-oswald text-[#FBF1A4] text-4xl font-bold mb-5 text-left">
          About Us
        </h2>
        <p className="font-montserrat text-[#f2efdb] text-base leading-7 text-left">
          <i>
            As students, we have looked for upskilling everywhere. Mostly, we end
            up paying big amounts to gain certifications and learn relevant skills.
            We thought of SkillSwap to resolve that. Learning new skills and gaining
            more knowledge all while networking with talented people!
          </i>
        </p>
        <p className="font-montserrat text-[#f2efdb] text-base leading-7 text-left mt-5">
          At SkillSwap, we believe in the power of learning and sharing knowledge.
          Our platform connects individuals from diverse backgrounds to exchange
          practical skills and expertise. Whether you're a seasoned professional
          looking to mentor others or a beginner eager to learn, SkillSwap provides
          a supportive environment for growth and collaboration.
          <br />
          <br />
          Our mission is to empower individuals to unlock their full potential
          through skill sharing. By facilitating meaningful interactions and
          fostering a culture of lifelong learning, we aim to create a community
          where everyone has the opportunity to thrive.
        </p>
      </div>
      <img
        src={aboutImg}
        alt="About Us"
        className="max-w-[50vw] max-h-screen"
      />
    </div>
  );
};

export default AboutUs;
