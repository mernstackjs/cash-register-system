const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  cashier: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Assuming you have a User model for cashiers
  timestamp: { type: Date, default: Date.now },
});

// Method to calculate and set the total based on product prices and quantities
saleSchema.methods.calculateTotal = function () {
  this.total = this.products.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  return this.save();
};

const Sale = mongoose.model("Sale", saleSchema);

module.exports = Sale;
