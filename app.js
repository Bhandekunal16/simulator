const express = require("express");
const { Observable } = require("rxjs");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const folderPath = "./output";
const app = express();
app.use(express.static(path.join(__dirname, "output")));
app.use(
  cors({
    origin: "*",
    methods: ["GET"],
  })
);
const port = 3000;

const fileNames = fs.readdirSync(folderPath);
const fullPaths = fileNames.map((file) => path.join(folderPath, file));

const x = new Observable((r) => {
  for (let i = 0; i < fullPaths.length; i++) {
    r.next(i);
  }
});

x.subscribe((i) => {
  app.get(`/${i}`, (req, res) => {
    res.send(`${i}`);
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`application started`);
});
