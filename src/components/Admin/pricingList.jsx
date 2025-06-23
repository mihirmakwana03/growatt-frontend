import React, { useEffect, useState } from "react";

const PricingListForm = () => {
  const [pricingDetails, setPricingDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editCard, setEditCard] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    basicPrice: "",
    advancePrice: "",
    premiumPrice: "",
    features: [""],
  });
  const [addFormData, setAddFormData] = useState({
    title: "",
    description: "",
    basicPrice: "",
    advancePrice: "",
    premiumPrice: "",
    features: [""],
  });

  useEffect(() => {
    fetch("http://localhost:5000/pricing")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch pricing details: ${response.statusText}`
          );
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          console.error("Unexpected content type:", contentType);
          return Promise.reject(
            new Error("Invalid content type, expected JSON")
          );
        }
        return response.json();
      })
      .then((data) => {
        setPricingDetails(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching pricing details:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center text-xl text-white">
        <p>Loading...</p>
      </div>
    );
  }

  const handleEditCard = (detail) => {
    setEditCard(detail);
    setFormData({
      title: detail.title,
      description: detail.description,
      basicPrice: detail.basicPrice,
      advancePrice: detail.advancePrice,
      premiumPrice: detail.premiumPrice,
      features: detail.features || [""],
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      features: updatedFeatures,
    }));
  };

  const handleAddFeature = () => {
    setFormData((prevData) => ({
      ...prevData,
      features: [...prevData.features, ""],
    }));
  };

  // Add Service Handlers
  const handleAddFormChange = (e) => {
    const { name, value } = e.target;
    setAddFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddFeatureChange = (index, value) => {
    const updatedFeatures = [...addFormData.features];
    updatedFeatures[index] = value;
    setAddFormData((prevData) => ({
      ...prevData,
      features: updatedFeatures,
    }));
  };

  const handleAddFeatureAdd = () => {
    setAddFormData((prevData) => ({
      ...prevData,
      features: [...prevData.features, ""],
    }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newService = {
      ...addFormData,
      basicPrice: parseFloat(addFormData.basicPrice),
      advancePrice: parseFloat(addFormData.advancePrice),
      premiumPrice: parseFloat(addFormData.premiumPrice),
    };

    fetch("http://localhost:5000/pricing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newService),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add new service");
        }
        return response.json();
      })
      .then((data) => {
        setPricingDetails((prev) => [...prev, data]);
        setShowAddModal(false);
        setAddFormData({
          title: "",
          description: "",
          basicPrice: "",
          advancePrice: "",
          premiumPrice: "",
          features: [""],
        });
      })
      .catch((error) => {
        console.error("Error adding new service:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedCard = {
      ...editCard,
      ...formData,
      basicPrice: parseFloat(formData.basicPrice),
      advancePrice: parseFloat(formData.advancePrice),
      premiumPrice: parseFloat(formData.premiumPrice),
    };

    setPricingDetails((prevDetails) =>
      prevDetails.map((item) =>
        item.title === editCard.title ? updatedCard : item
      )
    );

    fetch(`http://localhost:5000/pricing/${encodeURIComponent(editCard.title)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCard),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update pricing details");
        }
        return response.json();
      })
      .then((data) => {
        setEditCard(null);
      })
      .catch((error) => {
        console.error("Error updating card:", error);
      });
  };

  return (
    <div className="container mx-auto px-4 pt-5 min-h-screen bg-gray-300">
      <h1 className="text-center text-2xl font-bold text-blue-600">Services</h1>
      <hr className="my-4 border-gray-600" />

      {/* Add Service Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Add New Service
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricingDetails.length === 0 ? (
          <div className="text-center text-lg text-white">
            No pricing details available
          </div>
        ) : (
          pricingDetails.map((detail, index) => (
            <div
              key={index}
              className="bg-gray-800 shadow-lg rounded-lg p-6 relative hover:shadow-2xl transition duration-300 ease-in-out"
            >
              {/* Edit Button */}
              <button
                onClick={() => handleEditCard(detail)}
                className="absolute top-2 right-2 bg-blue-500 text-white py-1 px-4 rounded-md text-sm hover:bg-blue-600 focus:outline-none"
              >
                Edit
              </button>

              <h3 className="text-2xl font-semibold text-blue-400 mb-4">
                {detail.title}
              </h3>
              <p className="text-lg text-gray-300 mb-4">{detail.description}</p>

              <div className="mb-4">
                <p className="text-sm text-gray-400">
                  <strong>Basic:</strong> ₹{detail.basicPrice}
                </p>
                <p className="text-sm text-gray-400">
                  <strong>Advance:</strong> ₹{detail.advancePrice}
                </p>
                <p className="text-sm text-gray-400">
                  <strong>Premium:</strong> ₹{detail.premiumPrice}
                </p>
              </div>

              {detail.features && detail.features.length > 0 && (
                <div className="mt-4 text-sm text-gray-300">
                  <strong>Features:</strong>
                  <ul className="list-disc pl-5">
                    {detail.features.map((feature, index) => (
                      <li key={index} className="text-gray-400">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Modal Form for Editing */}
      {editCard && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 p-8 rounded-lg max-w-4xl w-full flex">
            {/* Left side (Form inputs) */}
            <div className="flex-1 pr-8">
              <h3 className="text-2xl text-blue-500 font-semibold mb-4">
                Edit Pricing Plan
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-semibold text-gray-300"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    className="w-full p-2 mt-1 text-white bg-gray-700 rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-semibold text-gray-300"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    className="w-full p-2 mt-1 text-white bg-gray-700 rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="basicPrice"
                    className="block text-sm font-semibold text-gray-300"
                  >
                    Basic Price
                  </label>
                  <input
                    type="number"
                    id="basicPrice"
                    name="basicPrice"
                    value={formData.basicPrice}
                    onChange={handleFormChange}
                    className="w-full p-2 mt-1 text-white bg-gray-700 rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="advancePrice"
                    className="block text-sm font-semibold text-gray-300"
                  >
                    Advance Price
                  </label>
                  <input
                    type="number"
                    id="advancePrice"
                    name="advancePrice"
                    value={formData.advancePrice}
                    onChange={handleFormChange}
                    className="w-full p-2 mt-1 text-white bg-gray-700 rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="premiumPrice"
                    className="block text-sm font-semibold text-gray-300"
                  >
                    Premium Price
                  </label>
                  <input
                    type="number"
                    id="premiumPrice"
                    name="premiumPrice"
                    value={formData.premiumPrice}
                    onChange={handleFormChange}
                    className="w-full p-2 mt-1 text-white bg-gray-700 rounded-md"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditCard(null)}
                  className="w-full mt-4 text-center text-red-500"
                >
                  Cancel
                </button>
              </form>
            </div>

            {/* Right side (Features section) */}
            <div className="flex-1 pl-8">
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-300">
                  Features
                </label>
                {formData.features.map((feature, index) => (
                  <input
                    key={index}
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="w-full p-2 mt-1 text-white bg-gray-700 rounded-md mb-2"
                    placeholder={`Feature ${index + 1}`}
                  />
                ))}
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="mt-2 text-blue-500"
                >
                  Add Feature
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Form for Adding New Service */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 p-8 rounded-lg max-w-4xl w-full flex">
            {/* Left side (Form inputs) */}
            <div className="flex-1 pr-8">
              <h3 className="text-2xl text-green-500 font-semibold mb-4">
                Add New Service
              </h3>
              <form onSubmit={handleAddSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="add-title"
                    className="block text-sm font-semibold text-gray-300"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="add-title"
                    name="title"
                    value={addFormData.title}
                    onChange={handleAddFormChange}
                    className="w-full p-2 mt-1 text-white bg-gray-700 rounded-md"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="add-description"
                    className="block text-sm font-semibold text-gray-300"
                  >
                    Description
                  </label>
                  <textarea
                    id="add-description"
                    name="description"
                    value={addFormData.description}
                    onChange={handleAddFormChange}
                    className="w-full p-2 mt-1 text-white bg-gray-700 rounded-md"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="add-basicPrice"
                    className="block text-sm font-semibold text-gray-300"
                  >
                    Basic Price
                  </label>
                  <input
                    type="number"
                    id="add-basicPrice"
                    name="basicPrice"
                    value={addFormData.basicPrice}
                    onChange={handleAddFormChange}
                    className="w-full p-2 mt-1 text-white bg-gray-700 rounded-md"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="add-advancePrice"
                    className="block text-sm font-semibold text-gray-300"
                  >
                    Advance Price
                  </label>
                  <input
                    type="number"
                    id="add-advancePrice"
                    name="advancePrice"
                    value={addFormData.advancePrice}
                    onChange={handleAddFormChange}
                    className="w-full p-2 mt-1 text-white bg-gray-700 rounded-md"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="add-premiumPrice"
                    className="block text-sm font-semibold text-gray-300"
                  >
                    Premium Price
                  </label>
                  <input
                    type="number"
                    id="add-premiumPrice"
                    name="premiumPrice"
                    value={addFormData.premiumPrice}
                    onChange={handleAddFormChange}
                    className="w-full p-2 mt-1 text-white bg-gray-700 rounded-md"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none"
                >
                  Add Service
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-full mt-4 text-center text-red-500"
                >
                  Cancel
                </button>
              </form>
            </div>

            {/* Right side (Features section) */}
            <div className="flex-1 pl-8">
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-300">
                  Features
                </label>
                {addFormData.features.map((feature, index) => (
                  <input
                    key={index}
                    type="text"
                    value={feature}
                    onChange={(e) =>
                      handleAddFeatureChange(index, e.target.value)
                    }
                    className="w-full p-2 mt-1 text-white bg-gray-700 rounded-md mb-2"
                    placeholder={`Feature ${index + 1}`}
                  />
                ))}
                <button
                  type="button"
                  onClick={handleAddFeatureAdd}
                  className="mt-2 text-green-500"
                >
                  Add Feature
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingListForm;
