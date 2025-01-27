import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Bounce, Fade } from "react-awesome-reveal";

const Footer = () => {
  return (
    <Fade>
      <footer className="bg-pink-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-center md:text-left">
            {/* Logo */}
            <div className="col-span-1">
              <h2 className="text-2xl font-bold">Shubho Porinoy</h2>
              <p className="mt-2 text-sm text-gray-200">
                Connecting hearts for a lifetime journey. Discover your perfect partner with Shubho Porinoy!
              </p>
            </div>

            {/* Get Started */}
            <div>
              <h3 className="text-lg font-bold mb-4">GET STARTED</h3>
              <ul className="space-y-2">
                <li><a href="/register" className="hover:underline">Sign Up</a></li>
                <li><a href="/login" className="hover:underline">Login</a></li>
              </ul>
            </div>

            {/* Explore */}
            <div>
              <h3 className="text-lg font-bold mb-4">EXPLORE</h3>
              <ul className="space-y-2">
                <li><a href="/biodatas" className="hover:underline">View Biodatas</a></li>
                <li><a href="/success-stories" className="hover:underline">Success Stories</a></li>
                <li><a href="/premium" className="hover:underline">Premium Membership</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-bold mb-4">RESOURCES</h3>
              <ul className="space-y-2">
                <li><a href="/faq" className="hover:underline">FAQ</a></li>
                <li><a href="/contact" className="hover:underline">Contact Us</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-bold mb-4">LEGAL</h3>
              <ul className="space-y-2">
                <li><a href="/privacy-policy" className="hover:underline">Privacy Policy</a></li>
                <li><a href="/terms-of-service" className="hover:underline">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* Social Media */}
          <div className="mt-8 text-center">
            <h3 className="text-lg font-bold mb-4">FOLLOW US</h3>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-white hover:text-yellow-300 text-2xl"><FaFacebook /></a>
              <a href="#" className="text-white hover:text-yellow-300 text-2xl"><FaInstagram /></a>
              <a href="#" className="text-white hover:text-yellow-300 text-2xl"><FaTwitter /></a>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-8 text-center text-sm text-gray-200">
            &copy; {new Date().getFullYear()} Shubho Porinoy. All Rights Reserved.
          </div>
        </div>
      </footer>
    </Fade>
  );
};

export default Footer;
