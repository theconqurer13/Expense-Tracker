// routes/transectionRoutes.js
const express = require("express");
const {
  getAllTransection,
  addTransection,
  editTransection,
  deleteTransection,
  getTransactionStat,
} = require("../controllers/transectionCtrl");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Apply protect middleware to all routes
router.use(protect);

// @route   GET /api/v1/transactions
// @desc    Get all transactions
// @access  Private
router.get("/", getAllTransection);

// @route   POST /api/v1/transactions
// @desc    Add new transaction
// @access  Private
router.post("/", addTransection);

// @route   PUT /api/v1/transactions/:id
// @desc    Update transaction
// @access  Private
router.put("/:id", editTransection);

// @route   DELETE /api/v1/transactions/:id
// @desc    Delete transaction
// @access  Private
router.delete("/:id", deleteTransection);

// @route   GET /api/v1/transactions/stats
// @desc    Get transaction statistics
// @access  Private
router.get("/stats", getTransactionStat);

module.exports = router;