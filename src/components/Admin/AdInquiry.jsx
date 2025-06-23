import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function AdInquiry() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");


  useEffect(() => {
    fetchContacts();
  }, []);

  // Fetch all contacts
  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${API_URL}/contact/inquiry`);
      setContacts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setLoading(false);
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = (id) => {
    setSelectedContact(id);
    document.getElementById("deleteModal").classList.remove("hidden");
  };

  // Close delete confirmation modal
  const closeDeleteModal = () => {
    setSelectedContact(null);
    document.getElementById("deleteModal").classList.add("hidden");
  };

  // Delete a contact by ID
  const handleDelete = async () => {
    if (!selectedContact) return;

    try {
      await axios.delete(`${API_URL}/contact/delete/${selectedContact}`);

      // Remove deleted contact from state
      setContacts(
        contacts.filter((contact) => contact._id !== selectedContact)
      );
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 pt-5 min-h-screen bg-gray-300">
      <h1 className="text-center text-2xl font-bold text-blue-600">
        Contact Submissions
      </h1>
      <hr className="my-4 border-gray-600" />

      {/* ✅ Loading Spinner */}
      {loading && (
        <div className="text-center mt-3">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* ✅ No Data Found */}
      {!loading && contacts.length === 0 && (
        <p className="text-gray-500 text-center">
          No contact submissions found.
        </p>
      )}

      {/* ✅ Status Filter */}
      <div className="mb-4 flex flex-col sm:flex-row items-center gap-2">
        <label htmlFor="statusFilter" className="font-semibold text-gray-800">
          Filter by Status:
        </label>
        <select
          id="statusFilter"
          className="border border-gray-300 bg-white text-gray-900 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All</option>
          {[...new Set(contacts.map((c) => c.status).filter(Boolean))].map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* ✅ Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts
          .filter((contact) =>
            statusFilter ? contact.status === statusFilter : true
          )
          .map((contact) => (
            <div
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200 text-black"
              key={contact._id}
            >
              <h5 className="text-lg font-bold text-blue-600">
                {contact.fullName}
              </h5>
              <p className="text-sm">
                <strong>Email:</strong> {contact.email}
              </p>
              <p className="text-sm">
                <strong>Phone:</strong> +{contact.phone}
              </p>
              <p className="text-sm">
                <strong>Subject:</strong> {contact.subject}
              </p>
              <p className="text-sm">
                <strong>Message:</strong> {contact.message}
              </p>
              <p className="text-sm">
                <strong>Status:</strong> {contact.status}
              </p>
              <p className="text-sm">
                <strong>File:</strong>{" "}
                {contact.files ? (
                  <a
                    href={`${API_URL}/contactuploadsimg/${contact.files}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline font-bold"
                  >
                    View File
                  </a>
                ) : (
                  "No files attached"
                )}
              </p>

              <div className="flex justify-between mt-4">
                {/* ✅ Reply Email Button */}
                <a
                  href={`mailto:${contact.email}`}
                  className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                >
                  Reply Email
                </a>

                {/* ✅ Delete Button */}
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                  onClick={() => openDeleteModal(contact._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* ✅ Delete Confirmation Modal */}
      <div
        id="deleteModal"
        className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div className="bg-white rounded-lg p-6 w-11/12 sm:w-96">
          <h5 className="text-lg font-bold text-red-600">Confirm Deletion</h5>
          <p className="text-sm text-gray-600 mt-2">
            Are you sure you want to delete this contact? This action cannot be
            undone.
          </p>
          <div className="flex justify-end mt-4">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400"
              onClick={closeDeleteModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdInquiry;
              Delete
            </button>
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400"
              onClick={closeDeleteModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdInquiry;
