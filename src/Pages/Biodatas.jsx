import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../hooks/AxiosHooks';


const Biodatas = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    // State for filters
    const [ageRange, setAgeRange] = useState([18, 60]);
    const [biodataType, setBiodataType] = useState('');
    const [division, setDivision] = useState('');

    // Fetch biodatas with TanStack Query
    const { data: biodatas = [], isLoading } = useQuery({
        queryKey: ['biodatas', ageRange, biodataType, division], // This is the key for caching
        queryFn: async () => {
            const response = await axiosSecure.get('/biodatas', {
                params: {
                    minAge: ageRange[0],
                    maxAge: ageRange[1],
                    type: biodataType,
                    division,
                    limit: 20,
                },
            });
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
                        value={ageRange[1]}
                        onChange={(e) => setAgeRange([18, Number(e.target.value)])}
                        className="w-full"
                    />
                    <p>18 to {ageRange[1]}</p>
                </div>

                <div className="mb-4">
                    <label className="block mb-2 font-medium">Biodata Type:</label>
                    <select
                        value={biodataType}
                        onChange={(e) => setBiodataType(e.target.value)}
                        className="w-full p-2 border rounded">
                        <option value="">All</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
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
                        <option value="Chattagra">Chattagra</option>
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
                    <p>Loading...</p>
                ) : (
                    biodatas.map((biodata) => (
                        <div key={biodata.id} className="p-4 border rounded-lg shadow">
                            <img
                                src={biodata.profileImage || '/default-profile.png'}
                                alt="Profile"
                                className="w-16 h-16 rounded-full mx-auto"
                            />
                            <h3 className="text-lg font-semibold text-center mt-2">Biodata #{biodata.id}</h3>
                            <p className="text-sm text-center">{biodata.type}</p>
                            <p className="text-sm">Division: {biodata.division}</p>
                            <p className="text-sm">Age: {biodata.age}</p>
                            <p className="text-sm">Occupation: {biodata.occupation}</p>
                            <button
                                onClick={() => handleViewProfile(biodata.id)}
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
