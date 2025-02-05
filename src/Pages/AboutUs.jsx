import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-[#FE287A]">About Shubho Porinoy</h1>
        <p className="mt-4 text-gray-700 text-lg">
          Welcome to <span className="font-semibold text-[#FE287A]">Shubho Porinoy</span>, a trusted platform designed to bring 
          like-minded individuals together for a lifetime of happiness. Our mission is to simplify the journey 
          of finding the perfect match by providing a seamless and secure matrimony experience.
        </p>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#FEE82E] rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-gray-800">Verified Profiles</h3>
            <p className="text-gray-700 mt-2">
              We ensure authenticity by verifying each profile, making your search reliable and secure.
            </p>
          </div>
          <div className="p-6 bg-[#FE287A] text-white rounded-xl shadow-md">
            <h3 className="text-xl font-bold">Privacy & Security</h3>
            <p className="mt-2">
              Your privacy is our priority. We use advanced security measures to protect your data.
            </p>
          </div>
          <div className="p-6 bg-gray-200 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-gray-800">Perfect Matchmaking</h3>
            <p className="text-gray-700 mt-2">
              Our intelligent matchmaking algorithm helps you find the right partner based on your preferences.
            </p>
          </div>
        </div>
        
        <p className="mt-8 text-gray-700 text-lg">
          Whether you&apos;re looking for love, companionship, or a meaningful connection, 
          <span className="font-semibold text-[#FE287A]"> Shubho Porinoy</span> is here to help. Join us and start your journey today!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
