const Sale = require("../models/saleModel");

exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate("products.product")
      .populate("cashier", "username");
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createSale = async (req, res) => {
  const { products, cashier } = req.body;

  try {
    const newSale = await Sale.create({ products, cashier });
    await newSale.calculateTotal();
    res.status(201).json(newSale);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
