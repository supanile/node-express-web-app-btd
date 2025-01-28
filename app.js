const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;
const productsRouter = require("./src/router/productsRouter");

app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, "/public/")));

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use("/products", productsRouter);

app.get("/", (req, res) => {
  res.render("index", {
    username: "John Doe",
    customers: ["Tom", "Jerry", "Spike"],
  });
});

app.listen(PORT, () => {
  console.log("Listening on PORT " + chalk.green(PORT));
});
