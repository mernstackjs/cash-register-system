const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/cash-register-system")
  .then(() => console.log("db is connected success full"))
  .catch((err) => console.log(err));

// Middleware
app.use(express.json());
app.use(
  session({
    secret: "fghaj",
    resave: false,
    saveUninitialized: false,
  })
);

// Routes
const productRouter = require("./routes/productRouter");
const saleRouter = require("./routes/saleRouter");
const userRouter = require("./routes/userRouter");

app.use("/api", productRouter);
app.use("/api", saleRouter);
app.use("/api", userRouter);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Cash Register System API");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
