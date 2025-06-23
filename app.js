const [express, cors, fs, path] = [
  require("express"),
  require("cors"),
  require("fs"),
  require("path"),
];
const { Observable } = require("rxjs");

const app = express();
const port = 3000;

const photos = ["waterdrop", "flowerbloom", "bomb"];
const photo = photos[0];

let bg;
bg = photo == "flowerbloom" ? "#fff" : "#0a1e2d";

app.use(express.static(path.join(__dirname, photo)));
app.use(express.static(__dirname));

app.use(
  cors({
    origin: "*",
    methods: ["GET"],
  })
);

const fileNames = fs.readdirSync(photo);
const fullPaths = fileNames.map((f) => path.join(photo, f));

const x = new Observable((r) => {
  for (let i = 0; i < fullPaths.length; i++) {
    r.next(i);
  }
});

x.subscribe((i) => {
  app.get(`/${i}`, (_, res) => {
    res.send(`${i}`);
  });
});

app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/config", (_, res) => {
  res.send({ len: fullPaths.length, bg });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`application started`);
});
