const mongoose = require("mongoose");
const library = require("./models/book-model");
const methodOverride = require("method-override");
const controller = require("./controllers/controller");
const express = require("express"),

  app = express();
app.set("view engine", "ejs");

app.set("port", process.env.PORT || 3000);

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);
app.use(express.json());
require("dotenv").config();
const uri = process.env.ATLAS_URI;

console.log(uri);

mongoose.connect(uri, { useUnifiedTopology: true });

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

app.get("/home", controller.getBooks);
app.get("/books/:booknum", controller.getabook);
app.get("/AddNewBook", (req, res, next) => {
  res.render("create");
});

app.post("/Bookcreate", controller.bookcreate);

app.get("/DeleteABook", controller.deletebooks, (req, res, next) => {
  res.render("delete", { books: req.data });
});
app.delete("/books/:booknum/delete", controller.delete);
app.listen(app.get("port"), () => {
  console.log(`Server Running on http://localhost:${app.get("port")}`);
});
