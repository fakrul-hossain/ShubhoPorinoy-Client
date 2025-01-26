import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import logo from "../../assets/logoo.png";
import {
  FaHome,
  FaUserAlt,
  FaSignInAlt,
  FaUserPlus,
  FaList,
  FaInfoCircle,
  FaPhoneAlt
} from "react-icons/fa";
import {
  MdMenu,
  MdCancel,
  MdDashboard,
} from "react-icons/md";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire("Success!", "You have logged out successfully!", "success");
        navigate("/");
      })
      .catch((error) => console.error("Logout Error:", error));
  };

  const activeLink =
    "text-primary font-semibold border-b-2 border-primary pb-1 transition-all ease-in-out flex items-center gap-2";
  const normalLink =
    "text-gray-600 hover:text-primary transition-all flex items-center gap-2";

  return (
    <div
      className={`bg-white shadow-md ${isSticky ? "fixed top-0 w-full z-50" : ""}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink
            to="/"
            className="flex justify-center items-center gap-2 text-xl font-bold text-primary"
          >
            <img src={logo} alt="Shubho Porinoy Logo" className="h-12 w-12" />
            <span className="hidden sm:inline">Shubho Porinoy</span>
          </NavLink>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 text-2xl"
          >
            {isMenuOpen ? <MdCancel /> : <MdMenu />}
          </button>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
              <FaHome />
              Home
            </NavLink>
            <NavLink
              to="/biodatas"
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <FaList />
              Biodatas
            </NavLink>
            <NavLink
              to="/about-us"
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <FaInfoCircle />
              About Us
            </NavLink>
            <NavLink
              to="/contact-us"
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <FaPhoneAlt />
              Contact Us
            </NavLink>
            {user && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? activeLink : normalLink)}
              >
                <MdDashboard />
                Dashboard
              </NavLink>
            )}
          </nav>

          {/* Auth Section */}
          <div className="relative flex items-center gap-4">
            {user ? (
              <div className="relative inline-block">
                <img
                  src={user.photoURL || "https://via.placeholder.com/40"}
                  alt="User Profile"
                  className="h-10 w-10 rounded-full cursor-pointer border-2 border-primary hover:border-secondary"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                />

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                    {/* Header with User Info */}
                    <div className="bg-primary text-white px-4 py-2 flex items-center gap-3">
                      <img
                        src={user.photoURL || "https://via.placeholder.com/40"}
                        alt="User Avatar"
                        className="h-10 w-10 rounded-full border-2 border-white"
                      />
                      <div>
                        <p className="font-semibold">{user.displayName || "User"}</p>
                        <p className="text-sm opacity-80">{user.email}</p>
                      </div>
                    </div>

                    {/* Dropdown Options */}
                    <div className="py-2">
                      <NavLink
                        to="/settings"
                        className={({ isActive }) => (isActive ? activeLink : normalLink)}
                      >
                        Settings
                      </NavLink>
                      <button
                        onClick={handleLogOut}
                        className="block w-full px-4 py-2 font-semibold text-left text-sm text-red-600 hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-3">
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? activeLink : normalLink)}
                >
                  <FaSignInAlt />
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) => (isActive ? activeLink : normalLink)}
                >
                  <FaUserPlus />
                  Register
                </NavLink>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-100 border-t mt-2">
            <nav className="flex flex-col gap-2 p-4">
              <NavLink to="/" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                <FaHome />
                Home
              </NavLink>
              <NavLink
                to="/biodatas"
                className={({ isActive }) => (isActive ? activeLink : normalLink)}
              >
                <FaList />
                Biodatas
              </NavLink>
              <NavLink
                to="/about-us"
                className={({ isActive }) => (isActive ? activeLink : normalLink)}
              >
                <FaInfoCircle />
                About Us
              </NavLink>
              <NavLink
                to="/contact-us"
                className={({ isActive }) => (isActive ? activeLink : normalLink)}
              >
                <FaPhoneAlt />
                Contact Us
              </NavLink>
              {user && (
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) => (isActive ? activeLink : normalLink)}
                >
                  <MdDashboard />
                  Dashboard
                </NavLink>
              )}
              {!user && (
                <>
                  <NavLink
                    to="/login"
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    <FaSignInAlt />
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    <FaUserPlus />
                    Register
                  </NavLink>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
