const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 0 },
  category: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Method to update the quantity of a product
productSchema.methods.updateQuantity = function (newQuantity) {
  this.quantity = newQuantity;
  this.updatedAt = Date.now();
  return this.save();
};

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
