import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Slide } from "react-awesome-reveal";
import useAxiosSecure from "../../hooks/AxiosHooks";

const Success = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch biodata counts
  const { data: biodatas = [], isLoading } = useQuery({
    queryKey: ["biodatas"],
    queryFn: async () => {
      const res = await axiosSecure.get("/biodatas");
      return res.data;
    },
  });

  // Fetch successful marriages count
  const { data: successStories = [] } = useQuery({
    queryKey: ["successStories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/success-stories");
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center text-white text-xl">Loading statistics...</p>;
  }

  // Calculate male and female biodata count
  const totalMale = biodatas.filter((b) => b.biodataType === "Male").length;
  const totalFemale = biodatas.filter((b) => b.biodataType === "Female").length;
  const totalMarriages = successStories.length || "100+"; // Show "100+" if no marriages

  return (
    <section className="bg-[#FE287A] py-16">
      <div className="max-w-6xl md:w-[600px] lg:w-[800px] p-6 mx-auto px-4 lg:px-8">
        <Slide>
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Shubho Porinoy Success Stories & Achievements
            </h2>
          </div>

          {/* Statistics Container */}
          <div className="flex flex-col md:flex-row justify-around items-center space-y-8 md:space-y-0 text-white">
            {/* Male Biodata Count */}
            <div className="text-center md:border-r md:border-[#FEE82E] md:pr-12">
              <h3 className="text-4xl md:text-6xl font-bold text-[#FEE82E]">
                {totalMale}+
              </h3>
              <p className="mt-2 text-white text-lg md:text-xl">
                Male Biodatas Registered
              </p>
            </div>

            {/* Female Biodata Count */}
            <div className="text-center md:border-r md:border-[#FEE82E] md:pr-12">
              <h3 className="text-4xl md:text-6xl font-bold text-[#FEE82E]">
                {totalFemale}+
              </h3>
              <p className="mt-2 text-white text-lg md:text-xl">
                Female Biodatas Registered
              </p>
            </div>

            {/* Successful Marriages */}
            <div className="text-center md:pl-12">
              <h3 className="text-4xl md:text-6xl font-bold text-[#FEE82E]">
                {totalMarriages}+
              </h3>
              <p className="mt-2 text-white text-lg md:text-xl">
                Successful Marriages Completed
              </p>
            </div>
          </div>
        </Slide>
      </div>
    </section>
  );
};

export default Success;
