import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/AxiosHooks";
import UseAuth from "../../hooks/UseAuth";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useAuth } from "../../hooks/useAuth"; // Ensure you have user authentication

const FavouritesBiodata = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();
  const queryClient = useQueryClient();

  // Fetch Favorite Biodatas
  const { data: favoriteBiodatas = [], isLoading } = useQuery({
    queryKey: ["favorites", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites/${user.email}`);
      return res.data;
      
    },
    enabled: !!user?.email, // Only run query if email is available
  });
  console.log(favoriteBiodatas)

  // Mutation to delete a favorite
  const deleteMutation = useMutation({
    mutationFn: async (favoriteId) => {
      await axiosSecure.delete(`/favorites/${favoriteId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["favorites", user?.email]); // Refetch after delete
    },
  });

  if (isLoading) return <p>Loading favorites...</p>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">My Favorite Biodatas</h2>
      {favoriteBiodatas.length === 0 ? (
        <p>No favorite biodatas found.</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Biodata ID</th>
              <th className="border px-4 py-2">Permanent Address</th>
              <th className="border px-4 py-2">Occupation</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {favoriteBiodatas.map((biodata) => (
              <tr key={biodata.favoritesId} className="text-center">
                <td className="border px-4 py-2">{biodata.name}</td>
                <td className="border px-4 py-2">{biodata.biodataId}</td>
                <td className="border px-4 py-2">{biodata.permanentDivision}</td>
                <td className="border px-4 py-2">{biodata.occupation}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => deleteMutation.mutate(biodata.favoritesId)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    disabled={deleteMutation.isLoading}
                  >
                    {deleteMutation.isLoading ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FavouritesBiodata;
