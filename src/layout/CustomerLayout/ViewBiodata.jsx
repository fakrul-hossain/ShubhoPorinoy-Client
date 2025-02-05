import React, { useState } from "react";
import { Button, Modal } from "flowbite-react";
import { toast } from "react-toastify";
// import UseAuth from "../../hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../hooks/UseAuth";
import useAxiosSecure from "../../hooks/AxiosHooks";
import Swal from "sweetalert2";
// import useAxiosSecure from "../../hooks/AxiosHooks";
// import useAxiosSecure from "../../hooks/AxiosHooks";

// Custom hook to get logged-in user info
const ViewBiodata = () => {
  const { user } = UseAuth(); // 🔥 Get logged-in user info
  const [isPremiumModalOpen, setPremiumModalOpen] = useState(false);

  // Fetch biodata using TanStack Query (React Query)
  const axiosSecure = useAxiosSecure()
  const { data: biodata, error, isLoading } = useQuery({
      queryKey: ["viewBiodata", user?.email],
      queryFn: async () => {
        const {data} = await axiosSecure.get(`/biodata/email/${user?.email}`);
          return data;
      },
      enabled: !!user?.email, 
  });
  
  const handleMakePremium = () => {
    console.log('hlw')
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            axiosSecure.patch(`/premium-requests/${biodata._id}`)
            .then(() => {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                  });
              setPremiumModalOpen(false);
            })
            .catch((err) => {
              toast.error("Failed to send premium request");
              console.error(err);
            });
        
        }
      });
   
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching biodata</p>;
  if (!biodata) return <p>Biodata not found</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Biodata Details</h2>
      <img src={biodata.profileImage} alt={biodata.name} className="w-40 h-40 rounded-full mb-4" />
      <p><strong>Name:</strong> {biodata.name}</p>
      <p><strong>Biodata Type:</strong> {biodata.biodataType}</p>
      <p><strong>Date of Birth:</strong> {biodata.dob}</p>
      <p><strong>Height:</strong> {biodata.height}</p>
      <p><strong>Weight:</strong> {biodata.weight}</p>
      <p><strong>Age:</strong> {biodata.age}</p>
      <p><strong>Occupation:</strong> {biodata.occupation}</p>
      <p><strong>Race:</strong> {biodata.race}</p>
      <p><strong>Father's Name:</strong> {biodata.fatherName}</p>
      <p><strong>Mother's Name:</strong> {biodata.motherName}</p>
      <p><strong>Permanent Division:</strong> {biodata.permanentDivision}</p>
      <p><strong>Present Division:</strong> {biodata.presentDivision}</p>
      <p><strong>Expected Partner Age:</strong> {biodata.expectedPartnerAge}</p>
      <p><strong>Expected Partner Height:</strong> {biodata.expectedPartnerHeight}</p>
      <p><strong>Expected Partner Weight:</strong> {biodata.expectedPartnerWeight}</p>
      <p><strong>Contact Email:</strong> {biodata.contactEmail}</p>
      <p><strong>Mobile Number:</strong> {biodata.contactPhone}</p>

      {/* <Button className="mt-4 bg-[#FE287A] text-white" onClick={() => setPremiumModalOpen(true)}>
        Make Biodata Premium
      </Button> */}
<Button className="bg-[#FE287A] text-white" onClick={handleMakePremium}>Make Premium</Button>
      <Modal isOpen={isPremiumModalOpen} onClose={() => setPremiumModalOpen(false)}>
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">Confirm Premium Request</h3>
          <p>Are you sure you want to make this biodata premium?</p>
          <div className="flex justify-end gap-2 mt-4">
            <Button className="bg-gray-500" onClick={() => setPremiumModalOpen(false)}>Cancel</Button>
            
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ViewBiodata;
