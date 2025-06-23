import React, { useEffect, useState } from "react";

const ApplicationForm = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emailData, setEmailData] = useState({
    recipient: "",
    subject: "",
    name: "",
    jobTitle: "",
  });
  const [selectedApplication, setSelectedApplication] = useState(null);

  const [filterJobTitle, setFilterJobTitle] = useState("");
  const [filterExp, setFilterExp] = useState("");
  const [filterTwelvethPer, setFilterTwelvethPer] = useState("");
  const [filterBachelorsPer, setFilterBachelorsPer] = useState("");
  const [filterStatus, setFilterStatus] = useState(""); // New filter for status

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch("http://localhost:5000/applications");
      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }
      const data = await response.json();
      setApplications(data);
      setFilteredApps(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = applications.filter((app) => {
      return (
        (filterJobTitle === "" ||
          app.jobTitle.toLowerCase().includes(filterJobTitle.toLowerCase())) &&
        (filterExp === "" || app.experience >= parseFloat(filterExp)) &&
        (filterTwelvethPer === "" ||
          app.twelvethPercentage >= parseFloat(filterTwelvethPer)) &&
        (filterBachelorsPer === "" ||
          app.bachelorsDegree >= parseFloat(filterBachelorsPer)) &&
        (filterStatus === "" ||
          (app.status && app.status.toLowerCase() === filterStatus.toLowerCase()))
      );
    });
    setFilteredApps(filtered);
  }, [
    filterJobTitle,
    filterExp,
    filterTwelvethPer,
    filterBachelorsPer,
    filterStatus,
    applications,
  ]);

  const resetFilters = () => {
    setFilterJobTitle("");
    setFilterExp("");
    setFilterTwelvethPer("");
    setFilterBachelorsPer("");
    setFilterStatus("");
    setFilteredApps(applications);
  };

  const deleteApplication = async (id) => {
    if (!window.confirm("⚠️ Are you sure you want to delete this application?"))
      return;

    try {
      const response = await fetch(`http://localhost:5000/applications/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete application");

      setApplications((prev) => prev.filter((app) => app._id !== id));
      alert("✅ Application deleted successfully!");
    } catch (error) {
      console.error("❌ Error deleting application:", error);
      alert("❌ Failed to delete application.");
    }
  };

  const sendEmail = async () => {
    if (
      !emailData.recipient ||
      !emailData.subject ||
      !emailData.name ||
      !emailData.jobTitle
    ) {
      alert("❌ All fields are required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: emailData.recipient,
          subject: emailData.subject,
          name: emailData.name,
          jobTitle: emailData.jobTitle,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Email sent successfully!");

        // Update status in the database
        const updateResponse = await fetch(
          `http://localhost:5000/applications/${selectedApplication._id}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "Mail Sent" }),
          }
        );

        if (!updateResponse.ok) {
          throw new Error(
            "Failed to update application status in the database"
          );
        }

        // Update local state
        setApplications((prev) =>
          prev.map((app) =>
            app._id === selectedApplication._id
              ? { ...app, status: "Mail Sent" }
              : app
          )
        );

        setEmailData({ recipient: "", subject: "", name: "", jobTitle: "" });
        setSelectedApplication(null);
      } else {
        alert("❌ Failed to send email: " + data.error);
      }
    } catch (error) {
      console.error("❌ Error sending email:", error);
      alert("❌ Email sending failed.");
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 pt-5 min-h-screen bg-gray-300">
        <h1 className="text-center text-2xl font-bold text-blue-600">
          Job Applications
        </h1>
        <hr className="my-4 border-gray-600" />

        {/* Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 p-4 rounded">
          <div>
            <label className="block text-sm font-medium text-gray-800">
              Job Title:
            </label>
            <input
              type="text"
              className="w-full border-2 border-gray-300 rounded p-2 bg-white text-gray-800 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter job title"
              value={filterJobTitle}
              onChange={(e) => setFilterJobTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-800">
              Min Experience (years):
            </label>
            <input
              type="number"
              className="w-full border-2 border-gray-300 rounded p-2 bg-white text-gray-800 focus:ring-blue-500 focus:border-blue-500"
              value={filterExp}
              onChange={(e) => setFilterExp(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-800">
              Min 12th Percentage:
            </label>
            <input
              type="number"
              step="0.01"
              className="w-full border-2 border-gray-300 rounded p-2 bg-white text-gray-800 focus:ring-blue-500 focus:border-blue-500"
              value={filterTwelvethPer}
              onChange={(e) => setFilterTwelvethPer(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-800">
              Min Bachelor's Degree (%):
            </label>
            <input
              type="number"
              step="0.01"
              className="w-full border-2 border-gray-300 rounded p-2 bg-white text-gray-800 focus:ring-blue-500 focus:border-blue-500"
              value={filterBachelorsPer}
              onChange={(e) => setFilterBachelorsPer(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-800">
              Status:
            </label>
            <select
              className="w-full border-2 border-gray-300 rounded p-2 bg-white text-gray-800 focus:ring-blue-500 focus:border-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="Mail Sent">Mail Sent</option>
            </select>
          </div>
        </div>

        {/* Reset Filters Button */}
        <div className="flex justify-center mb-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-1/3"
            onClick={resetFilters}
          >
            Reset Filters
          </button>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="text-center mt-3">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
          </div>
        )}

        {/* Error Message */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Applications List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {!loading && !error && filteredApps.length > 0
            ? filteredApps.map((app) => (
                <div
                  key={app._id}
                  className="border border-gray-200 rounded shadow p-4 bg-white text-gray-800"
                >
                  <p className="mb-2">
                    <b>Job Title:</b> {app.jobTitle}
                  </p>
                  <p className="mb-2">
                    <b>Applicant Name:</b> {app.name}
                  </p>
                  <p className="mb-2">
                    <b>Experience:</b> {app.experience} years
                  </p>
                  <p className="mb-2">
                    <b>12th Percentage:</b> {app.twelvethPercentage}%
                  </p>
                  <p className="mb-2">
                    <b>Bachelor's Degree:</b> {app.bachelorsDegree}%
                  </p>
                  <p className="mb-2">
                    <b>Status:</b>{" "}
                    <span
                      className={
                        app.status === "Pending"
                          ? "text-red-500"
                          : app.status === "Mail Sent"
                          ? "text-green-500"
                          : ""
                      }
                    >
                      {app.status}
                    </span>
                  </p>
                  <a
                    href={`http://localhost:5000${app.resume}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View Resume
                  </a>
                  <div className="mt-4 flex justify-between">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      onClick={() => {
                        setEmailData({
                          recipient: app.email,
                          name: app.name,
                          jobTitle: app.jobTitle,
                        });
                        setSelectedApplication(app);
                      }}
                    >
                      Send Email
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      onClick={() => deleteApplication(app._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            : !loading && (
                <p className="text-gray-500 text-center">
                  No applications found.
                </p>
              )}
        </div>

        {/* Email Form Modal */}
        {selectedApplication && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md border border-gray-300"></div>
              <div className="flex justify-between items-center border-b px-4 py-3 bg-blue-600 rounded-t-lg">
                <h5 className="text-lg font-semibold text-white">
                  Send Email
                </h5>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="text-white hover:text-gray-200 text-xl font-bold"
                >
                  &times;
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendEmail();
                }}
                className="rounded-b-lg"
              >
                <div className="px-4 py-4 bg-gray-100">
                  <div className="mb-4">
                    <label className="block font-medium mb-1 text-gray-700">
                      Recipient
                    </label>
                    <input
                      type="email"
                      className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-200 text-gray-700"
                      value={emailData.recipient}
                      readOnly
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block font-medium mb-1 text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your Name"
                      value={emailData.name}
                      onChange={(e) =>
                        setEmailData({ ...emailData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block font-medium mb-1 text-gray-700">
                      Job Title
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter Job Title"
                      value={emailData.jobTitle}
                      onChange={(e) =>
                        setEmailData({ ...emailData, jobTitle: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block font-medium mb-1 text-gray-700">
                      Selection
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                      value={emailData.subject}
                      onChange={(e) =>
                        setEmailData({ ...emailData, subject: e.target.value })
                      }
                      required
                    >
                      <option value="">Select an Option</option>
                      <option value="selected">Selected</option>
                      <option value="unselected">Unselected</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 px-4 py-3 border-t bg-gray-50 rounded-b-lg">
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    onClick={() => setSelectedApplication(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Send Email
                  </button>
                </div>
              </form>
            </div>
        )}
      </div>
    </>
  );
};

export default ApplicationForm;