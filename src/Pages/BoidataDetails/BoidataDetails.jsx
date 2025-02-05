import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
// import useAxiosSecure from "../hooks/AxiosHooks";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../hooks/AxiosHooks";
import UseAuth from "../../hooks/UseAuth";
import Swal from "sweetalert2";

const BiodataDetails = () => {
  const {user} = UseAuth(); 
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  
  // Fetch biodata details
  const { data: biodata, isLoading } = useQuery({
    queryKey: ["biodata", id],
    queryFn: async () => {
      const response = await axiosSecure.get(`/biodata/${id}`);
      return response.data;
    }
  });

  // Fetch similar biodatas (limit 3)
  const { data: similarBiodatas = [] } = useQuery({
    queryKey: ["similarBiodatas", biodata?.biodataType],
    queryFn: async () => {
      if (!biodata) return [];
      const response = await axiosSecure.get("/biodataSimilar", {
        params: { gender: biodata?.biodataType }, // Correct query parameter
      });
      return response.data;
    },
    enabled: !!biodata,
  });
  

  // Add to Favorites Mutation
  const addToFavorites = useMutation({

    mutationFn: async (favoritesData) => {

      await axiosSecure.post("/favorites", favoritesData)
      .then( ()=> {
        Swal.fire({
          title: "Favorites Added Successfully",
          icon: "success"
        });
        // console.log('done')
      })
      
    }
  });
  const handleFavorites = (id)=>{
    const favoritesPeople = {
      favoritesId : id,
      userEmail: user.email,

    }
    console.log(favoritesPeople)
    addToFavorites.mutate(favoritesPeople)
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <img src={biodata?.profileImage} alt="Profile" className="w-24 h-24 rounded-full mx-auto" />
        <h2 className="text-xl font-semibold text-center mt-2">{biodata?.name}</h2>
        <p className="text-center text-gray-600">{biodata?.biodataType} | {biodata?.age} years</p>
        <p>Occupation: {biodata?.occupation}</p>
        <p>Division: {biodata?.division}</p>
        <p>Height: {biodata?.height} cm</p>
        <p>Weight: {biodata?.weight} kg</p>
        <p>Religion: {biodata?.religion}</p>
        <p>Race: {biodata?.race}</p>
        <p>Father's Name: {biodata?.fatherName}</p>
        <p>Mother's Name: {biodata?.motherName}</p>
        <p>Expected Partner Age: {biodata?.expectedPartnerAge} years</p>
        <p>Expected Partner Height: {biodata?.expectedPartnerHeight} cm</p>
        <p>Expected Partner Weight: {biodata?.expectedPartnerWeight} kg</p>
        <p>Created At: {new Date(biodata?.createdAt).toLocaleDateString()}</p>
        <p>Updated At: {new Date(biodata?.updatedAt).toLocaleDateString()}</p>
        
        {/* Show Contact Info if Premium */}
        {biodata?.isPremium == "premium" ? (
          <div className="mt-4 p-4 bg-green-100 rounded">
            <p className="text-green-700 font-semibold">Contact Information:</p>
            <p>Email: {biodata?.contactEmail}</p>
            <p>Phone: {biodata?.contactPhone}</p>
          </div>
        ) : (
          <button
            className="block w-full bg-blue-500 text-white py-2 mt-4 rounded"
            onClick={() => navigate(`/checkout/${id}`)}
          >
            Request Contact Information
          </button>
        )}

        {/* Add to Favorites Button */}
        <button
          className="block w-full bg-yellow-500 text-white py-2 mt-2 rounded"
          onClick={() => handleFavorites(biodata?._id)}
        >
          Add to Favorites
        </button>
      </div>

      {/* Similar Biodatas */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Similar Biodatas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {similarBiodatas.map((similar) => (
            <div key={similar._id} className="p-4 border rounded-lg shadow">
              <img src={similar.profileImage} alt="Profile" className="w-16 h-16 rounded-full mx-auto" />
              <h3 className="text-lg font-semibold text-center mt-2">{similar.name}</h3>
              <p className="text-center">{similar.age} years</p>
              <p className="text-center">{similar.occupation}</p>
              <button
                className="block w-full bg-pink-500 text-white py-2 mt-2 rounded"
                onClick={() => navigate(`/biodataDetails/${similar._id}`)}
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BiodataDetails;
