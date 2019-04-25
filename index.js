const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  watch: true
});

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "njk");

const ageMiddleware = (req, res, next) => {
  if (req.query.age == "") {
    console.log("Digite a idade");
    return res.render("formAge");
  }

  return next();
};

app.get("/", (req, res) => {
  return res.render("formAge");
});

app.post("/check", (req, res) => {
  if (req.body.age >= 18) return res.redirect(`/major/?age=${req.body.age}`);

  return res.redirect(`minor/?age=${req.body.age}`);
});

app.get("/major", ageMiddleware, (req, res) => {
  idade = req.query.age;
  return res.render("major", { idade });
});

app.get("/minor", ageMiddleware, (req, res) => {
  idade = req.query.age;
  return res.render("minor", { idade });
});

app.listen(3000);
