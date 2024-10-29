const express = require("express");
const router = express.Router();
const {
  createCombo,
  getAllCombos,
  getComboById,
  editCombo,
  deleteCombo,
} = require("../controller/combos.controller");

// Route for creating a new combo
router.get("/get-all-combos", getAllCombos);
router.post("/add-combo", createCombo);
router.get("/get-combo/:id", getComboById)
router.put("/edit-combo/:id", editCombo)
router.delete("/delete-combo/:id", deleteCombo)

module.exports = router;
