import React from "react";
import weeding from "../../assets/wedding-2.png";
import network from "../../assets/network.png";
import love from "../../assets/love-birds.png";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Register",
      time: "7:00 PM",
      description:
        "Create your profile and start your journey by registering on our platform.",
      image: weeding,
      reverse: false,
    },
    {
      id: 2,
      title: "Find Your Match",
      time: "7:30 PM",
      description:
        "Browse through profiles and use filters to find your compatible match.",
      image: network,
      reverse: true,
    },
    {
      id: 3,
      title: "Send Interest",
      time: "8:00 PM",
      description:
        "Send an interest request to connect with the profiles you like.",
      image: love,
      reverse: false,
    },
  ];

  return (
    <div className="bg-[#FFF8F0] py-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#623F1D] mb-4">How it works</h2>
          <p className="text-[#623F1D] text-lg">
            Follow the steps below to find your perfect match.
          </p>
        </div>

        <div className="relative">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center mb-12 ${
                step.reverse ? "flex-row-reverse" : ""
              }`}
            >
              {/* Image Section */}
              <div className="w-1/4 text-center">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-2/3 mx-auto"
                />
              </div>

              {/* Timeline Section */}
              <div className="w-1/12 flex justify-center relative">
                {/* Line */}
                <div
                  className={`h-full w-[2px] bg-[#E5C07B] ${
                    index === steps.length - 1 ? "h-1/2" : ""
                  } absolute`}
                ></div>
                {/* Dot */}
                <div className="w-6 h-6 bg-[#FFF8F0] border-4 border-[#623F1D] rounded-full z-10"></div>
              </div>

              {/* Text Section */}
              <div className="w-1/2">
                <h3 className="text-xl font-semibold text-[#623F1D] mb-2">
                  {step.title}
                </h3>
                <p className="text-[#FE287A] font-medium mb-2">
                  TIMING: {step.time}
                </p>
                <p className="text-[#623F1D] text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
