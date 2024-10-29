import React, { Fragment, useEffect, useState } from "react";
import {
    useHistory,
    useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import AdminLayout from "../layout";
import { getComboById, updateCombo } from "./FecthApi";
import { getAllProduct } from "../products/FetchApi";

const EditComboComponent = () => {
    const history = useHistory();
    const { id } = useParams();
    const [allPro, setAllPro] = useState([]); // All products
    const [selectedProducts, setSelectedProducts] = useState([]); // Selected products
    const [comboPrice, setComboPrice] = useState(0); // Combo price
    const [comboData, setComboData] = useState({
        comboName: "",
        comboDescription: "",
        comboProducts: [],
        comboPrice: 0,
        comboStatus: "",
    });

    useEffect(() => {
        fetchProductData();
        fetchComboData();
    }, []);

    const fetchProductData = async () => {
        let responseData = await getAllProduct();
        if (responseData.Products) {
            setAllPro(responseData.Products);
        }
    };

    const fetchComboData = async () => {
        try {
            const res = await getComboById(id);
            setComboData(res);
            const products = res.comboProducts || [];
            setSelectedProducts(products);
            calculateComboPrice(products); // Initialize combo price
        } catch (error) {
            console.error("Error fetching combo data:", error);
        }
    };

    // Handler to update comboData state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setComboData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Calculate combo price based on selected products
    const calculateComboPrice = (products) => {
        const selectedProds = allPro.filter((prod) =>
            products.includes(prod._id)
        );
        const total = selectedProds.reduce(
            (sum, product) => sum + (product.pPrice || 0), // Ensure pPrice is a number
            0
        );
        setComboPrice(total);
    };

    // Handle product selection via checkbox
    const handleProductSelect = (productId, isChecked) => {
        const updatedSelectedProducts = isChecked
            ? [...selectedProducts, productId]
            : selectedProducts.filter((id) => id !== productId);

        setSelectedProducts(updatedSelectedProducts);
        calculateComboPrice(updatedSelectedProducts); // Recalculate the price
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Prepare combo data for update
            const updatedComboData = {
                ...comboData,
                comboProducts: selectedProducts,
                comboPrice, // Use calculated price
            };

            // Update the combo
            await updateCombo(id, updatedComboData);
            alert("Combo updated successfully");
            history.push("/admin/dashboard/combos"); // Redirect after success
        } catch (error) {
            console.error("Error updating combo:", error);
            alert("Failed to update combo");
        }
    };

    return (
        <div className="grid grid-cols-1 space-y-4 p-4">
            <div className="col-span-1 flex items-center">
                <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center w-full">
                    <div
                        style={{ background: "#303031" }}
                        onClick={() => history.push("/admin/dashboard/combos")}
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

            <div className="flex items-center justify-center">
                <div className="bg-white w-12/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4 overflow-y-auto px-4 py-4 md:px-8">
                    <div className="flex items-center justify-between w-full pt-4">
                        <span className="text-left font-semibold text-2xl tracking-wider">
                            Edit Combo
                        </span>
                    </div>

                    <form className="w-full" onSubmit={handleSubmit}>
                        {/* Combo Name */}
                        <div className="flex flex-col space-y-1 w-full py-4">
                            <label htmlFor="comboName">Combo Name</label>
                            <input
                                className="px-4 py-2 border focus:outline-none"
                                type="text"
                                name="comboName"
                                value={comboData.comboName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Combo Description */}
                        <div className="flex flex-col space-y-1 w-full">
                            <label htmlFor="comboDescription">
                                Combo Description
                            </label>
                            <textarea
                                className="px-4 py-2 border focus:outline-none"
                                name="comboDescription"
                                cols={5}
                                rows={5}
                                value={comboData.comboDescription}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Select Products */}
                        <div className="flex flex-col space-y-1 w-full">
                            <label htmlFor="product">Select Products</label>
                            {allPro.length > 0 ? (
                                allPro.map((pro) => (
                                    <div
                                        key={pro._id}
                                        className="flex items-center space-x-2"
                                    >
                                        <input
                                            type="checkbox"
                                            id={`product_check_${pro._id}`}
                                            name="selectedProducts"
                                            value={pro._id}
                                            checked={selectedProducts.includes(
                                                pro._id
                                            )}
                                            onChange={(e) =>
                                                handleProductSelect(
                                                    pro._id,
                                                    e.target.checked
                                                )
                                            }
                                            className="cursor-pointer"
                                        />
                                        <label
                                            htmlFor={`product_check_${pro._id}`}
                                        >
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
                            <label htmlFor="comboPrice">Combo Price</label>
                            <input
                                className="px-4 py-2 border focus:outline-none"
                                type="number"
                                name="comboPrice"
                                value={comboPrice} // This value updates when products change
                                readOnly
                            />
                        </div>

                        {/* Combo Status */}
                        <div className="flex flex-col space-y-1 w-full">
                            <label htmlFor="comboStatus">Combo Status</label>
                            <select
                                name="comboStatus"
                                className="px-4 py-2 border focus:outline-none"
                                value={comboData.comboStatus}
                                onChange={handleChange}
                                required
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
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const EditCombo = () => {
    return (
        <Fragment>
            <AdminLayout>
                <EditComboComponent />
            </AdminLayout>
        </Fragment>
    );
};

export default EditCombo;
