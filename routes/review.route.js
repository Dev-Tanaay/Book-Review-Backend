const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const { updateReview, deleteReview } = require("../controllers/review.controller");

router.put("/reviews/:id", authMiddleware,updateReview);
router.delete("/reviews/:id", authMiddleware,deleteReview);

module.exports = router;
