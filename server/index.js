import express from "express";
import cors from "cors";
import routerImage from "./routes/imageRoutes.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { conn } from "./db/conectionDb.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "./public/uploads")));

app.get("/", async (req, res) => {
  const sql = await conn.query("SELECT * FROM alumnos");
  res.json(sql[0]);
});

app.use(routerImage);

app.listen(3000, () => {
  console.log("port 3000");
});
