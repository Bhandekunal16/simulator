const [express, cors, fs, path] = [
  require("express"),
  require("cors"),
  require("fs"),
  require("path"),
];
const { Observable } = require("rxjs");

const app = express();

const photos = ["waterdrop", "flowerbloom"];
const photo = photos[0];

app.use(express.static(path.join(__dirname, photo)));

app.use(express.static(__dirname));
app.use(
  cors({
    origin: "*",
    methods: ["GET"],
  })
);
const port = 3000;

const fileNames = fs.readdirSync(photo);
const fullPaths = fileNames.map((file) => path.join(photo, file));

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

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/config", (req, res) => {
  res.send({ len: fullPaths.length });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`application started`);
});
