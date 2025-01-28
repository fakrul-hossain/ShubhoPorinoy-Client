import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../hooks/AxiosHooks';

const Biodatas = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    // State for filters
    const [age, setage] = useState([18, 60]);
    const [biodataType, setBiodataType] = useState('');
    const [division, setDivision] = useState('');

    // Fetch biodatas with TanStack Query
    const { data: biodatas = [], isLoading } = useQuery({
        queryKey: ['biodatas', age[0], age[1], biodataType, division],
        queryFn: async () => {
            console.log("Fetching with params:", { 
                minAge: age[0], 
                maxAge: age[1], 
                type: biodataType, 
                division 
            });
    
            const response = await axiosSecure.get('/biodatas', {
                params: {
                    ...(age && { minAge: age[0], maxAge: age[1] }),
                    ...(biodataType && { type: biodataType }),
                    ...(division && { division }),
                    limit: 20,
                },
            });
    
            console.log("Response data:", response.data); // Log the response data
            
            console.log(response.data)
            return response.data;
        },
        
    });
    

    const handleViewProfile = (id) => {
        navigate(`/biodatas/${id}`);
    };

    return (
        <div className="flex gap-4 p-4">
            {/* Filter Section */}
            <div className="w-1/4 p-4 border rounded-lg bg-gray-100">
                <h2 className="text-xl font-semibold mb-4">Filters</h2>
                <div className="mb-4">
                    <label className="block mb-2 font-medium">Age Range:</label>
                    <input
                        type="range"
                        min="18"
                        max="60"
                        value={age[1]}
                        onChange={(e) => setage([age[0], Number(e.target.value)])}
                        className="w-full"
                    />
                    <p>18 to {age[1]}</p>
                </div>

                <div className="mb-4">
                    <label className="block mb-2 font-medium">Biodata Type:</label>
                    <select
                        value={biodataType}
                        onChange={(e) => setBiodataType(e.target.value)}
                        className="w-full p-2 border rounded">
                        <option value="">All</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block mb-2 font-medium">Division:</label>
                    <select
                        value={division}
                        onChange={(e) => setDivision(e.target.value)}
                        className="w-full p-2 border rounded">
                        <option value="">All</option>
                        <option value="Dhaka">Dhaka</option>
                        <option value="Chattogram">Chattogram</option>
                        <option value="Rangpur">Rangpur</option>
                        <option value="Barisal">Barisal</option>
                        <option value="Khulna">Khulna</option>
                        <option value="Mymensingh">Mymensingh</option>
                        <option value="Sylhet">Sylhet</option>
                    </select>
                </div>
            </div>

            {/* Biodatas Section */}
            <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {isLoading ? (
                    <div className="flex items-center justify-center h-screen">
                        <div className="loader border-t-4 border-b-4 border-pink-500 w-12 h-12 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    biodatas.map((biodata) => (
                        <div key={biodata._id} className="p-4 border rounded-lg shadow">
                            <img
                                src={biodata.profileImage || 'https://i.ibb.co/0cCSJzs/pexels-olly-733872.jpg'}
                                alt="Profile"
                                className="w-16 h-16 rounded-full mx-auto"
                            />
                            <h3 className="text-lg font-semibold text-center mt-2">Biodata #{biodata.biodataId}</h3>
                            <p className="text-sm text-center">{biodata.biodataType}</p>
                            <p className="text-sm">Division: {biodata.division}</p>
                            <p className="text-sm">Age: {biodata.age}</p>
                            <p className="text-sm">Occupation: {biodata.occupation}</p>
                            <button
                                onClick={() => handleViewProfile(biodata._id)}
                                className="block w-full bg-pink-500 text-white py-2 mt-4 rounded">
                                View Profile
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Biodatas;
