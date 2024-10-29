const Combo = require("../models/combos.model");
const getAllCombos = async (req, res) => {
  try {
    const combos = await Combo.find()
      .populate("comboProducts")
      .populate("comboReviews.user"); // Populate the referenced fields
    res.status(200).json({ success: true, combos });
  } catch (error) {
    console.error("Error fetching combos:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getComboById = async (req, res) => {
  try {
    const { id } = req.params;
    const combo = await Combo
      .findById(id)

    if (!combo) {
      return res.status(404).json({ message: "Combo not found" });
    }

    res.status(200).json(combo);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create combo
const createCombo = async (req, res) => {
  try {
    const { comboName, comboProducts, comboPrice, comboStatus, comboDescription } = req.body;

    // Check if all required fields are provided
    if (!comboName || !comboProducts || !comboPrice || !comboStatus || !comboDescription ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create the new combo
    const newCombo = new Combo({
      comboName,
      comboProducts,
      comboPrice,
      comboStatus,
      comboDescription
    });

    // Save combo in database
    await newCombo.save();

    return res.status(201).json({
      message: "Combo created successfully",
      combo: newCombo,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

const editCombo = async (req, res) => {
    const { id } = req.params;
    const {
        comboName,
        comboDescription,
        comboProducts,
        comboPrice,
        comboStatus,
    } = req.body;

    try {
        // Find the combo by ID
        const combo = await Combo.findById(id);

        if (!combo) {
            return res.status(404).json({ error: "Combo not found" });
        }

        // Update the combo fields
        combo.comboName = comboName || combo.comboName;
        combo.comboDescription = comboDescription || combo.comboDescription;
        combo.comboProducts = comboProducts || combo.comboProducts;
        combo.comboPrice = comboPrice || combo.comboPrice;
        combo.comboStatus = comboStatus || combo.comboStatus;

        // Save the updated combo
        await combo.save();

        res.status(200).json({ message: "Combo updated successfully", combo });
    } catch (error) {
        console.error("Error updating combo:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteCombo = async (req, res) => {
  const { id } = req.params;

  try {
      // Find the combo by ID and delete it
      const deletedCombo = await Combo.findByIdAndDelete(id);

      if (!deletedCombo) {
          return res.status(404).json({ message: "Combo not found" });
      }

      res.status(200).json({ message: "Combo deleted successfully" });
  } catch (error) {
      res.status(500).json({ message: "Error deleting combo", error });
  }
}

module.exports = { createCombo, getAllCombos, getComboById, editCombo, deleteCombo };
