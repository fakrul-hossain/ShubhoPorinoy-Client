import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import UseAuth from "../../hooks/UseAuth";
import useAxiosSecure from "../../hooks/AxiosHooks";
import Swal from "sweetalert2";

const divisions = ["Dhaka", "Chattagram", "Rangpur", "Barisal", "Khulna", "Mymensingh", "Sylhet"];
const occupations = ["Teacher", "Engineer", "Doctor", "Business", "Student", "Other"];
const races = ["Bangali", "Non-Bangali"];

const EditBiodata = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, watch } = useForm();
  const [biodata, setBiodata] = useState(null);

  useEffect(() => {
    // Fetch user biodata if exists
    axiosSecure
      .get(`/biodata/${user.email}`)
      .then((res) => {
        if (res.data) {
          setBiodata(res.data);
          Object.keys(res.data).forEach((key) => setValue(key, res.data[key]));
        }
      })
      .catch((err) => console.error(err));
  }, [user.email, axiosSecure, setValue]);

  // Auto-calculate age from DOB
  useEffect(() => {
    const dob = watch("dob");
    if (dob) {
      const age = new Date().getFullYear() - new Date(dob).getFullYear();
      setValue("age", age);
    }
  }, [watch("dob")]);

  const onSubmit = async (data) => {
    try {
      let response;
      if (biodata) {
        // Update existing biodata
        response = await axiosSecure.put(`/biodata/${biodata._id}`, data);
      } else {
        // Create new biodata
        response = await axiosSecure.post(`/biodata?email=${user.email}`, data);
        
        // Set biodataId from server response if created successfully
        if (response.data.biodataId) {
          data.biodataId = response.data.biodataId;

        }
      }
  
      if (response.data.success || response.data.biodataId) {
        // toast.success("Biodata saved successfully!");
        Swal.fire({
            title: "Biodata Post Successfully",

            icon: "success"
          });
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error saving biodata:", error);
      toast.error("Failed to save biodata!");
    }
  };
  

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{biodata ? "Edit" : "Create"} Biodata</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        {/* Biodata Type */}
        <select {...register("biodataType", { required: true })} className="border p-2 rounded">
          <option value="">Select Biodata Type</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input {...register("name")} placeholder="Full Name" className="border p-2 rounded" required />
        <input {...register("profileImage")} placeholder="Profile Image URL" className="border p-2 rounded" />
        <input type="date" {...register("dob")} className="border p-2 rounded" required />
        <input type="number" {...register("height", { required: true })} placeholder="Height (cm)" className="border p-2 rounded" />
        <input type="number" {...register("weight", { required: true })} placeholder="Weight (kg)" className="border p-2 rounded" />
        <input type="number" {...register("age")} placeholder="Age (Auto-filled)" className="border p-2 rounded bg-gray-200" readOnly />

        {/* Occupation */}
        <select {...register("occupation", { required: true })} className="border p-2 rounded">
          <option value="">Select Occupation</option>
          {occupations.map((occ) => (
            <option key={occ} value={occ}>{occ}</option>
          ))}
        </select>

        {/* Race */}
        <select {...register("race", { required: true })} className="border p-2 rounded">
          <option value="">Select Race</option>
          {races.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        <input type="text" {...register("fatherName")} placeholder="Father's Name" className="border p-2 rounded" />
        <input type="text" {...register("motherName")} placeholder="Mother's Name" className="border p-2 rounded" />

        {/* Divisions */}
        <select {...register("permanentDivision", { required: true })} className="border p-2 rounded">
          <option value="">Select Permanent Division</option>
          {divisions.map((div) => (
            <option key={div} value={div}>{div}</option>
          ))}
        </select>

        <select {...register("presentDivision", { required: true })} className="border p-2 rounded">
          <option value="">Select Present Division</option>
          {divisions.map((div) => (
            <option key={div} value={div}>{div}</option>
          ))}
        </select>

        {/* Expected Partner Details */}
        <input type="number" {...register("expectedPartnerAge")} placeholder="Expected Partner Age" className="border p-2 rounded" />
        <input type="number" {...register("expectedPartnerHeight", { required: true })} placeholder="Expected Partner Height (cm)" className="border p-2 rounded" />
        <input type="number" {...register("expectedPartnerWeight", { required: true })} placeholder="Expected Partner Weight (kg)" className="border p-2 rounded" />

        <input type="email" {...register("contactEmail")} value={user.email} readOnly className="border p-2 rounded bg-gray-200" />
        <input type="text" {...register("contactPhone", { required: true })} placeholder="Mobile Number" className="border p-2 rounded" />

        <button type="submit" className="bg-pink-500 text-white p-2 rounded">Save & Publish Now</button>
      </form>
    </div>
  );
};

export default EditBiodata;
