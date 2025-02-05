import React from "react";
import { NavLink, Outlet } from "react-router-dom";
// import useRole from "../hooks/UseRole";

const Dashboard = () => {
  // const [role, isLoading] = useRole();
  const role = 'Customer'

  // if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
    {/* Sidebar */}
    <div className="w-64 bg-gray-800 text-white p-5">
      <NavLink to={'/dashboard'}><h2 className="text-xl font-bold mb-4">Dashboard</h2></NavLink>
      <NavLink to={'/'}><h2 className="text-xl font-bold mb-4">Home</h2></NavLink>
      <ul className="space-y-2">
        {role === "Customer" && (
          <>
            <li><NavLink to="/dashboard/editBiodata" className={({ isActive }) => isActive ? "text-yellow-300 font-semibold" : "text-white"}>Edit Biodata</NavLink></li>
            <li><NavLink to="/dashboard/view-biodata" className={({ isActive }) => isActive ? "text-yellow-300 font-semibold" : "text-white"}>View Biodata</NavLink></li>
            <li><NavLink to="/dashboard/my-contact-request" className={({ isActive }) => isActive ? "text-yellow-300 font-semibold" : "text-white"}>My Contact Request</NavLink></li>
            <li><NavLink to="/dashboard/favourites-biodata" className={({ isActive }) => isActive ? "text-yellow-300 font-semibold" : "text-white"}>Favourites Biodata</NavLink></li>
            <li><NavLink to="/logout" className={({ isActive }) => isActive ? "text-yellow-300 font-semibold" : "text-white"}>Logout</NavLink></li>
          </>
        )}
        {role === "Admin" && (
          <>
            <li><NavLink to="/dashboard/adminDashboard" className={({ isActive }) => isActive ? "text-yellow-300 font-semibold" : "text-white"}>Admin Dashboard</NavLink></li>
            <li><NavLink to="/dashboard/manage-users" className={({ isActive }) => isActive ? "text-yellow-300 font-semibold" : "text-white"}>Manage Users</NavLink></li>
            <li><NavLink to="/dashboard/approved-premium" className={({ isActive }) => isActive ? "text-yellow-300 font-semibold" : "text-white"}>Approved Premium</NavLink></li>
            <li><NavLink to="/dashboard/approved-contact-requests" className={({ isActive }) => isActive ? "text-yellow-300 font-semibold" : "text-white"}>Approved Contact Requests</NavLink></li>
            <li><NavLink to="/logout" className={({ isActive }) => isActive ? "text-yellow-300 font-semibold" : "text-white"}>Logout</NavLink></li>
          </>
        )}
      </ul>
    </div>

    {/* Main Content */}
    <div className="flex-1 p-6">
      {/* Dashboard Header */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <h2 className="text-2xl font-semibold">Welcome,!</h2>
        <p className="text-gray-600">Here’s an overview of your dashboard.</p>
      </div>

      {/* Customer Dashboard Widgets */}
      {role === "Customer" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold">Total Contact Requests</h3>
            <p className="text-2xl font-bold text-gray-800">5</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold">Favourites Biodata</h3>
            <p className="text-2xl font-bold text-gray-800">8</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold">Pending Approvals</h3>
            <p className="text-2xl font-bold text-gray-800">2</p>
          </div>
        </div>
      )}

      {/* Admin Dashboard Widgets */}
      {role === "Admin" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-2xl font-bold text-gray-800">120</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold">Pending Premium Requests</h3>
            <p className="text-2xl font-bold text-gray-800">4</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold">Recent Contact Requests</h3>
            <p className="text-2xl font-bold text-gray-800">10</p>
          </div>
        </div>
      )}

      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  </div>
  );
};

export default Dashboard;
