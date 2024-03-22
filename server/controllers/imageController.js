import { conn } from "../db/conectionDb.js";

export const uploadFile = async (req, res) => {
  const { titulo, precio } = req.body;

  const imagen = `http://localhost:3000/uploads/${req.file.filename}`;
  const sql = await conn.query(
    "INSERT INTO productos (titulo,precio,imagen) VALUES (?,?,?)",
    [titulo, precio, imagen]
  );
  console.log(sql[0]);
  if (sql[0].affectedRows >= 1) {
    res.json({ msg: "Subido con exito." });
  } else {
    res.status(404).json({ msg: "Error" });
  }
};

export const getData = async (req, res) => {
  const sql = await conn.query("SELECT * FROM productos");
  res.json(sql[0]);

};
