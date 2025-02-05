import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
// import { useAxiosSecure } from "../../hooks/useAxiosSecure"; // Ensure you have this hook
import { Link, NavLink } from "react-router-dom";
import useAxiosSecure from "../../hooks/AxiosHooks";

const SixPremiumMember = () => {
  const axiosSecure = useAxiosSecure();
  const [sortOrder, setSortOrder] = useState("asc"); // Default ascending

  // Fetch biodata
  const { data: biodatas = [], isLoading } = useQuery({
    queryKey: ["biodatas"],
    queryFn: async () => {
      const res = await axiosSecure.get("/biodatas");
      return res.data;
    },
  });

  if (isLoading) {
    return <p>Loading premium members...</p>;
  }

  // Filter only premium biodata
  const premiumBiodatas = biodatas.filter((biodata) => biodata.isPremium === "premium");

  // Sort based on selected order
  const sortedBiodatas = [...premiumBiodatas].sort((a, b) => {
    return sortOrder === "asc" ? a.age - b.age : b.age - a.age;
  });

  // Select top 6 members
  const topSixBiodatas = sortedBiodatas.slice(0, 6);

  return (
    <div className="p-6 max-w-[1440px] mx-auto">
    {/* Header */}
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">Premium Members</h2>
      <select
        className="border p-2 rounded"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="asc">Sort by Age (Ascending)</option>
        <option value="desc">Sort by Age (Descending)</option>
      </select>
    </div>

    {/* Biodata Cards */}
    <div className="grid md:grid-cols-3 gap-4">
      {sortedBiodatas.map((biodata) => (
        <div key={biodata._id} className="border p-4 w-96 rounded-lg shadow-md">
          <img
            src={biodata.profileImage}
            alt={biodata.name}
            className="w-full h-40 object-cover rounded-md"
          />
          <h3 className="text-lg font-semibold mt-2">{biodata.name}</h3>
          <p>Biodata ID: {biodata.biodataId}</p>
          <p>Type: {biodata.biodataType}</p>
          <p>Age: {biodata.age}</p>
          <p>Occupation: {biodata.occupation}</p>
          <p>Division: {biodata.division}</p>
          <Link
            to={`/biodataDetails/${biodata.biodataId}`}
            className="block text-center bg-pink-500 text-white p-2 rounded mt-3"
          >
            View Profile
          </Link>
        </div>
      ))}
    </div>

    {/* NavLink to Biodatas Page */}
    <div className="text-center mt-6">
      <NavLink
        to="/biodatas"
        className="bg-[#FEE82E] text-[#FE287A] py-2 px-4 text-center rounded-full text-lg font-semibold"
      >
        View All Biodatas
      </NavLink>
    </div>
  </div>
  );
};

export default SixPremiumMember;
