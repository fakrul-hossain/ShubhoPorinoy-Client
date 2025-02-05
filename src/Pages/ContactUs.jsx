import React from "react";

const ContactUs = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center text-pink-500 mb-4">
        Contact Us
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Have questions or need help? Feel free to reach out to us.
      </p>
      
      {/* Contact Form */}
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <input
          type="text"
          placeholder="Subject"
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <textarea
          placeholder="Your Message"
          rows="4"
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-3 rounded hover:bg-pink-600 transition"
        >
          Send Message
        </button>
      </form>
      
      {/* Contact Information */}
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          <strong>Email:</strong> support@shubhoporinoy.com
        </p>
        <p className="text-gray-600">
          <strong>Phone:</strong> +880 1234 567 890
        </p>
      </div>
    </div>
  );
};

export default ContactUs;