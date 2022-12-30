const express = require("express");
const contacts = require("./models/contacts.json");

const app = express();

app.get("/", (req, res) => {
  console.log(contacts);
  res.send(contacts);
});

app.get("/contact", (req, res) => {
  res.send(``);
});

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});
