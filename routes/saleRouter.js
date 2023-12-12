const express = require("express");
const { createSale, getAllSales } = require("../controllers/saleController");
const router = express.Router();

router.get("/sales", getAllSales);
router.post("/sales", createSale);

module.exports = router;
