import React, { Fragment, useEffect, useState } from "react";
import AdminLayout from "../layout";
import { useHistory } from "react-router-dom";
import { getAllProduct } from "../products/FetchApi";
import { createCombo } from "./FecthApi";

const AddCombosComponent = () => {
  const history = useHistory();

  // States to store form inputs
  const [comboName, setComboName] = useState("");
  const [comboDescription, setComboDescription] = useState("");
  const [comboStatus, setComboStatus] = useState("Active");
  const [comboPrice, setComboPrice] = useState(0); // For total combo price
  const [selectedProducts, setSelectedProducts] = useState([]); // To store selected products
  const [allPro, setAllPro] = useState([]); // All products

  // Fetch product data on component mount
  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    let responseData = await getAllProduct();
    if (responseData.Products) {
      setAllPro(responseData.Products);
      // Ensure Products is an array
    }
  };

  // Handle the calculation of the total combo price
  const calculateComboPrice = (products) => {
    let total = products.reduce((sum, product) => sum + product.pPrice, 0);
    setComboPrice(total);
  };

  // Handle product selection via checkbox
  const handleProductSelect = (product, isChecked) => {
    let updatedSelectedProducts = [...selectedProducts];

    if (isChecked) {
      updatedSelectedProducts.push(product);
    } else {
      updatedSelectedProducts = updatedSelectedProducts.filter(
        (p) => p._id !== product._id
      );
    }

    setSelectedProducts(updatedSelectedProducts);
    calculateComboPrice(updatedSelectedProducts); // Recalculate the price
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const comboData = {
      comboName,
      comboProducts: selectedProducts.map((product) => product._id), // Only send product IDs
      comboPrice,
      comboStatus,
      comboDescription,
    };

    try {
      const response = await createCombo(comboData); // Call the API service to create combo

      // Log response to check structure
      console.log("Response from API:", response);

      // Check if combo was created based on the presence of a message or combo object
      if (
        response &&
        response.message === "Combo created successfully" &&
        response.combo
      ) {
        console.log("Combo created successfully:", response);

        // Reset form states
        setComboName("");
        setComboDescription("");
        setComboStatus("Active");
        setComboPrice(0);
        setSelectedProducts([]); // Clear selected products

        // Reset checkboxes
        const checkboxes = document.querySelectorAll("input[type='checkbox']");
        checkboxes.forEach((checkbox) => (checkbox.checked = false)); // Uncheck all checkboxes

        // Optionally redirect or show a success message here
      } else {
        // Handle failure, if the combo wasn't created as expected
        console.error(
          "Failed to create combo:",
          response.message || "Unknown error"
        );
      }
    } catch (error) {
      // Catch any errors during the API request
      console.error("Error creating combo:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 space-y-4 p-4">
      <div className="col-span-1 flex items-center">
        <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center w-full">
          {/* Back button */}
          <div
            style={{ background: "#303031" }}
            onClick={(e) => history.push("/admin/dashboard/combos")}
            className="cursor-pointer rounded-full p-2 flex items-center justify-center text-gray-100 text-sm font-semibold uppercase"
          >
            <svg
              className="w-6 h-6 text-gray-100 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7 10l4-4v3h6v2h-6v3l-4-4z"
                clipRule="evenodd"
              />
            </svg>
            Back
          </div>
        </div>
      </div>

      <div className={`flex items-center justify-center`}>
        <div className="bg-white w-12/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4 overflow-y-auto px-4 py-4 md:px-8">
          <div className="flex items-center justify-between w-full pt-4">
            <span className="text-left font-semibold text-2xl tracking-wider">
              Add Combo
            </span>
          </div>

          <form className="w-full" onSubmit={handleSubmit}>
            {/* Combo Name */}
            <div className="flex flex-col space-y-1 w-full py-4">
              <label htmlFor="name">Combo Name</label>
              <input
                className="px-4 py-2 border focus:outline-none"
                type="text"
                value={comboName}
                onChange={(e) => setComboName(e.target.value)} // Update state
              />
            </div>

            {/* Combo Description */}
            <div className="flex flex-col space-y-1 w-full">
              <label htmlFor="description">Combo Description</label>
              <textarea
                className="px-4 py-2 border focus:outline-none"
                name="description"
                id="description"
                cols={5}
                rows={5}
                value={comboDescription}
                onChange={(e) => setComboDescription(e.target.value)} // Update state
              />
            </div>

            {/* Product List with checkboxes */}
            <div className="flex flex-col space-y-1 w-full">
              <label htmlFor="product">Select Products</label>
              {allPro.length > 0 ? (
                allPro.map((pro) => (
                  <div key={pro._id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`product_check_${pro._id}`}
                      name="selectedProducts"
                      value={pro._id}
                      className="cursor-pointer"
                      onChange={(e) =>
                        handleProductSelect(pro, e.target.checked)
                      } // Add onChange event
                    />
                    <label htmlFor={`product_check_${pro._id}`}>
                      {pro.pName} - {pro.pPrice} $
                    </label>
                  </div>
                ))
              ) : (
                <p>No products available</p>
              )}
            </div>

            {/* Combo Price */}
            <div className="flex flex-col space-y-1 w-full">
              <label htmlFor="price">Combo Price</label>
              <input
                className="px-4 py-2 border focus:outline-none"
                type="text"
                value={comboPrice} // Display total combo price
                readOnly
              />
            </div>

            {/* Combo Status */}
            <div className="flex flex-col space-y-1 w-full">
              <label htmlFor="status">Category Status</label>
              <select
                name="status"
                className="px-4 py-2 border focus:outline-none"
                id="status"
                value={comboStatus}
                onChange={(e) => setComboStatus(e.target.value)} // Update state
              >
                <option value="Active">Active</option>
                <option value="Disabled">Disabled</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col space-y-1 w-full pb-4 md:pb-6 mt-4">
              <button
                style={{ background: "#303031" }}
                type="submit"
                className="bg-gray-800 text-gray-100 rounded-full text-lg font-medium py-2"
              >
                Create Combo
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const AddCombo = () => {
  return (
    <Fragment>
      <AdminLayout>
        <AddCombosComponent />
      </AdminLayout>
    </Fragment>
  );
};

export default AddCombo;
