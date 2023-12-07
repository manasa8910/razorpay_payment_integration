const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static("public"));

const path = require("path");

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("pizza");
});

app.get("/checkout", (req, res) => {
  res.render("checkout");
});

app.get("/success", (req, res) => {
  res.render("success");
});

const paymentController = require("./controller/paymentController");

app.post("/createOrder", paymentController.createOrder);

app.listen(3000);
