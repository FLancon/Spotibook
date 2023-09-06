const express = require("express");
const fs = require("fs");
const app = express();

const userList = require("./data/userList.json");
const bookList = require("./data/bookList.json");
const boxLocation = require("./data/boxLocation.json");

app.get("/", async (req, res) => {
res.send(userList)
});

app.listen(5000, () => console.log("listining on port 5000"));
