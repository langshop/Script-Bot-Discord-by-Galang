const config = require("../config/config.json");
const express = require("express");
const path = require("path");
const app = new express();

module.exports = (client) => {
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));

  app.use(express.static(path.join(__dirname, "public")));

  app.get("/", (req, res) => {
    res.render("index", {
      bot: client,
      domain: config.domain,
    });
  });

  app.get("/dashboard", (req, res) => {
    res.render("dashboard", {
      bot: client,
      domain: config.domain,
      link: config.link,
    });
  });

  app.listen(3000, () => console.log("Listening on port 3000!"));
};
