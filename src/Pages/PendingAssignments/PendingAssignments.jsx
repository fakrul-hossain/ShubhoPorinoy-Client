import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2"; //
import axios from "axios";

const PendingAssignments = () => {
  const { user } = useContext(AuthContext); // Get the logged-in user from context
  const [pendingAssignments, setPendingAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState(null); // For the modal
  const [marks, setMarks] = useState("");
  const [feedback, setFeedback] = useState("");
  const [statusUpdate, setStatusUpdate] = useState(false);

  useEffect(() => {
    if (user?.email) {
      // fetch(`${import.meta.env.VITE_API_URL}/submissions`)


      axios.get(`${import.meta.env.VITE_API_URL}/submissions`,{
        withCredentials: true
      })
        // .then((res) => res.json())
        .then(({data}) => {
          // Filter out assignments that are already marked (status is 'completed')
          const unmarkedAssignments = data.filter(
            (assignment) => assignment.status === "pending"
          );
          setPendingAssignments(unmarkedAssignments);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching pending assignments:", error);
          setLoading(false);
        });
    }
  }, [user?.email, statusUpdate]);

  // Function to handle marks and feedback submission
  const handleSubmitMarks = (assignmentId) => {
    if (!marks || !feedback) {
      Swal.fire({
        icon: "error",
        title: "Fill all the inputs!",
      });
      return;
    }
  
    // Update the status and submit obtainMarks along with feedback to the backend
    fetch(`${import.meta.env.VITE_API_URL}/submissions/${assignmentId}`, {
      method: "PATCH", // Using PUT to update existing data
      body: JSON.stringify({
        obtainMarks: marks, // Add obtainMarks field
        feedback,
        status: "completed", // Update status
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Marks and Feedback Submitted!",
          text: "The marks and feedback have been successfully updated.",
        });
  
        setStatusUpdate(true); // Trigger re-fetch to update the assignment list
        setMarks("");
        setFeedback("");
        setSelectedAssignment(null); // Close modal
      })
      .catch((error) => {
        console.error("Error updating assignment:", error);
      });
  };
  

  const handleModalClose = () => {
    setSelectedAssignment(null);
    setMarks("");
    setFeedback("");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader border-t-4 border-b-4 border-teal-500 w-12 h-12 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
  <h1 className="text-2xl font-bold text-teal-700 dark:text-teal-400 text-center mb-6">
    Pending Assignments
  </h1>
  {pendingAssignments.length === 0 ? (
    <p className="text-center text-gray-500 dark:text-gray-400">
      No pending assignments found.
    </p>
  ) : (
    <div className="overflow-x-auto">
      <table className="table-auto w-full text-left border-collapse bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="px-4 py-2 border-b text-gray-800 dark:text-gray-200">Assignment Title</th>
            <th className="px-4 py-2 border-b text-gray-800 dark:text-gray-200">Marks</th>
            <th className="px-4 py-2 border-b text-gray-800 dark:text-gray-200">Examinee Name</th>
            <th className="px-4 py-2 border-b text-gray-800 dark:text-gray-200">Action</th>
          </tr>
        </thead>
        <tbody>
          {pendingAssignments.map((assignment) => (
            <tr key={assignment._id} className="hover:bg-teal-100 dark:hover:bg-teal-700 transition-colors">
              <td className="px-4 py-2 border-b text-gray-700 dark:text-gray-300">{assignment.title}</td>
              <td className="px-4 py-2 border-b text-gray-700 dark:text-gray-300">{assignment.marks}</td>
              <td className="px-4 py-2 border-b text-gray-700 dark:text-gray-300">{assignment.userName}</td>
              <td className="px-4 py-2 border-b">
                <button
                  className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 dark:hover:bg-teal-400 transition"
                  onClick={() => setSelectedAssignment(assignment)}
                  disabled={assignment.userEmail === user?.email}
                >
                  Give Mark
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}

  {selectedAssignment && (
    <div className="modal modal-open">
      <div className="modal-box bg-gray-50 dark:bg-gray-800">
        <h2 className="text-xl font-semibold text-teal-700 dark:text-teal-400 mb-4">
          Mark Assignment: {selectedAssignment.title}
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Google Docs Link: </strong>
          <a
            href={selectedAssignment.docsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-600 dark:text-teal-400 hover:underline"
          >
            {selectedAssignment.docsLink}
          </a>
        </p>
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          <strong>Notes: </strong>
          {selectedAssignment.quickNote}
        </p>
        <div className="mt-6">
          <label htmlFor="marks" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Marks:
          </label>
          <input
            type="number"
            id="marks"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="mt-6">
          <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Feedback:
          </label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            rows="4"
          />
        </div>
        <button
          onClick={() => handleSubmitMarks(selectedAssignment._id)}
          className="mt-4 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 dark:hover:bg-teal-400 transition"
        >
          Submit Marks & Feedback
        </button>
        <div className="modal-action">
          <button
            className="btn btn-sm bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
            onClick={handleModalClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )}
</div>

  );
};

export default PendingAssignments;
