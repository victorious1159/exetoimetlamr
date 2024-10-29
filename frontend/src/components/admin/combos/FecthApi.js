import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL;

// Function to retrieve Bearer token from local storage
const BearerToken = () =>
    localStorage.getItem("jwt")
        ? JSON.parse(localStorage.getItem("jwt")).token
        : false;

// Function to set headers with the Bearer token
const Headers = () => {
    return {
        headers: {
            Authorization: `Bearer ${BearerToken()}`,
        },
    };
};

export const getAllCombos = async () => {
    try {
        const res = await axios.get(
            `${apiURL}/api/combo/get-all-combos`,
            Headers()
        );
        return res.data; // Return the response data
    } catch (error) {
        console.error("Error fetching combos:", error);
        throw error; // Optionally throw the error to handle in the frontend
    }
};

export const getComboById = async (comboId) => {
    try {
        const res = await axios.get(`${apiURL}/api/combo/get-combo/${comboId}`);
        return res.data;
    } catch (error) {
        throw error;
    }
};

// API service to create a new combo
export const createCombo = async (comboData) => {
    try {
        let res = await axios.post(
            `${apiURL}/api/combo/add-combo`,
            comboData,
            Headers()
        );
        return res.data; // Return the response data
    } catch (error) {
        console.error("Error creating combo:", error);
        throw error; // Optionally throw the error to handle in the frontend
    }
};

export const updateCombo = async (comboId, comboData) => {
    try {
        const res = await axios.put(
            `${apiURL}/api/combo/edit-combo/${comboId}`,
            comboData,
            Headers()
        );
        return res.data; // Return the response data
    } catch (error) {
        console.error("Error updating combo:", error);
        throw error; // Optionally throw the error to handle in the frontend
    }
};

export const deleteCombo = async (comboId) => {
    try {
        const res = await axios.delete(
            `${apiURL}/api/combo/delete-combo/${comboId}`,
            Headers()
        );
        return res.data;
    } catch (error) {
        console.error("Error updating combo:", error);
        throw error;
    }
};

export const getPaymentLink = async (orderData) => {
    try {
        const res = await axios.post(`${apiURL}/api/payment/checkout-url`, orderData);
        return res.data.url; // This is the checkout URL returned by the backend
    } catch (error) {
        console.error("Error generating payment link:", error);
        throw error; // Rethrow to handle in the frontend
    }
};
