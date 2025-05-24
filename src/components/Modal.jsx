
import React from "react";
import { Spinner } from "react-bootstrap";


const Modal = ({ user, loading, onClose }) => {
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg">
          <div className="flex justify-center items-center">
            <Spinner animation="border" variant="danger" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg w-full max-w-md overflow-hidden">
        {/* Brighter red header */}
        <div className="bg-red-500 p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">User Details</h2>
          
        </div>

        {/* Modal body */}
        <div className="p-6">
          <p>
            <strong>ID:</strong> {user.useridId}
          </p>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
          <p>
            <strong>Phone:</strong> {user.mobile}
          </p>

          <button
            onClick={onClose}
            className="mt-4 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
