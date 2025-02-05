import React, { useState } from "react";
import { Slide } from "react-awesome-reveal";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const successStories = [
  {
    id: 1,
    groom: "Rahul Ahmed",
    bride: "Sadia Karim",
    marriageDate: "2024-01-15",
    image: "https://i.ibb.co/tPbzDMQK/couple-1.jpg",
    review: 4.5,
    story: "We met through Shubho Porinoy and instantly connected. Thank you for helping us find each other!",
  },
  {
    id: 2,
    groom: "Hasan Chowdhury",
    bride: "Mahi Akter",
    marriageDate: "2023-12-10",
    image: "https://i.ibb.co/20nrjwWF/couple-2.jpg",
    review: 5,
    story: "An amazing platform! It made our journey easy, and we are happily married now.",
  },
  {
    id: 3,
    groom: "Tanvir Hossain",
    bride: "Nusrat Jahan",
    marriageDate: "2023-11-05",
    image: "https://i.ibb.co/d03hSjXS/couple-3.jpg",
    review: 4,
    story: "Shubho Porinoy helped me find my soulmate. I'm forever grateful for this platform!",
  },
  {
    id: 4,
    groom: "Imran Hossain",
    bride: "Sabrina Islam",
    marriageDate: "2023-10-20",
    image: "https://i.ibb.co/sJNYWm92/couple-4.jpg",
    review: 4.5,
    story: "We started talking, and within months, we knew we were meant for each other!",
  },
  {
    id: 5,
    groom: "Farhan Rahman",
    bride: "Jannatul Nahar",
    marriageDate: "2023-09-12",
    image: "https://i.ibb.co/6MbZ35q/couple-5.jpg",
    review: 5,
    story: "We found true love through this platform. Forever grateful!",
  },
  {
    id: 6,
    groom: "Ahsan Ali",
    bride: "Ritu Hasan",
    marriageDate: "2023-08-05",
    image: "https://i.ibb.co/JFpFp1gg/couple-6.jpg",
    review: 4,
    story: "At first, we were skeptical, but this platform changed our lives forever!",
  },
  {
    id: 7,
    groom: "Sajid Rahman",
    bride: "Munia Alam",
    marriageDate: "2023-07-01",
    image: "https://i.ibb.co/RGrPGMkG/couple-7.jpg",
    review: 5,
    story: "We couldn't have asked for a better match. Shubho Porinoy made it possible!",
  },
  {
    id: 8,
    groom: "Rezaul Karim",
    bride: "Nashrin Akter",
    marriageDate: "2023-06-15",
    image: "https://i.ibb.co/d4YkXMpV/couple-8.jpg",
    review: 4.5,
    story: "We are proof that love can be found online! Thank you for this wonderful service.",
  },
  {
    id: 9,
    groom: "Aminul Islam",
    bride: "Mim Chowdhury",
    marriageDate: "2023-05-10",
    image: "https://i.ibb.co/X1LYTJj/couple-9.jpg",
    review: 5,
    story: "Our love story began here, and today, we are happily married.",
  },
  {
    id: 10,
    groom: "Nabil Hossain",
    bride: "Samira Khan",
    marriageDate: "2023-04-02",
    image: "https://i.ibb.co/tpkx6cRs/couple-10.jpg",
    review: 4,
    story: "This platform changed our lives! We highly recommend it to everyone.",
  },
];

const SuccessStory = () => {
  const [isDescending, setIsDescending] = useState(true);
  const [showAll, setShowAll] = useState(false); // To toggle between showing all or only 3 cards

  const toggleSortOrder = () => {
    setIsDescending((prev) => !prev);
  };

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  const sortedStories = successStories.sort((a, b) =>
    isDescending
      ? new Date(b.marriageDate) - new Date(a.marriageDate)
      : new Date(a.marriageDate) - new Date(b.marriageDate)
  );

  const displayedStories = showAll ? sortedStories : sortedStories.slice(0, 3); // Show only 3 stories initially or all if `showAll` is true

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <Slide>
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-[#FEE82E]">
              Shubho Porinoy Success Stories
            </h2>
            <p className="text-lg text-white mt-3">
              Real stories from real couples who found love through our platform!
            </p>
          </div>

          {/* Sort Button */}
          <div className="text-center mb-8">
            <button
              onClick={toggleSortOrder}
              className="bg-[#FEE82E] text-[#FE287A] py-2 px-6 rounded-full text-lg font-semibold"
            >
              Sort by Marriage Date ({isDescending ? "Newest First" : "Oldest First"})
            </button>
          </div>

          {/* Success Stories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedStories.map((story) => (
              <div key={story.id} className="bg-white p-6 rounded-2xl shadow-lg text-center">
                {/* Image */}
                <div className="w-full h-56 bg-gray-300 rounded-xl overflow-hidden">
                  <img src={story.image} alt="Couple" className="w-full h-full object-cover" />
                </div>

                {/* Story Content */}
                <div className="mt-5">
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {story.groom} & {story.bride}
                  </h3>
                  <p className="text-gray-600 text-sm">Married on: {story.marriageDate}</p>

                  {/* Review Stars */}
                  <div className="flex justify-center items-center my-3">
                    {[...Array(Math.floor(story.review))].map((_, i) => (
                      <FaStar key={i} className="text-yellow-200 text-xl" />
                    ))}
                    {story.review % 1 !== 0 && <FaStarHalfAlt className="text-yellow-300 text-xl" />}
                  </div>

                  {/* Story Text */}
                  <p className="text-gray-700 italic">{story.story}</p>
                </div>
              </div>
            ))}
          </div>

          {/* See More Button */}
          <div className="text-center mt-8">
            <button
              onClick={toggleShowAll}
              className="bg-[#FEE82E] text-[#FE287A] py-2 px-6 rounded-full text-lg font-semibold"
            >
              {showAll ? "See Less" : "See More Marriages"}
            </button>
          </div>
        </Slide>
      </div>
    </section>
  );
};

export default SuccessStory;
