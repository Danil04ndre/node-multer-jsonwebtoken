import React, { useEffect } from "react";
import { useState } from "react";

const initialForm = {
  titulo: "",
  precio: "",
  file: null,
};
const Principal = () => {
  const [form, setForm] = useState(initialForm);
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setForm({
        ...form,
        file: e.target.files[0],
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("titulo", form.titulo);
    formData.append("precio", form.precio);
    formData.append("image", form.file);

    const res = await fetch("http://localhost:3000/images", {
        method: "POST",
        body: formData,
      }),
      json = await res.json();
    console.log(res, json);
    if ((json.msg = "Subido con exito.")) {
      getAllData();
    }
  };
  const getAllData = async () => {
    const res = await fetch("http://localhost:3000/data");
    const json = await res.json();
    setData(json);
  };
  useEffect(() => {
    getAllData();
  }, []);

  return (
    <>
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            placeholder="Título"
            name="titulo"
            onChange={handleChange}
            value={form.titulo}
          />
          <input
            className="input"
            type="number"
            placeholder="Precio"
            name="precio"
            onChange={handleChange}
            value={form.precio}
          />
          <label className="file-label">
            Imagen
            <input
              className="file-input"
              type="file"
              name="file"
              onChange={handleChange}
            />
          </label>
          <button className="submit-button" type="submit">
            Agregar
          </button>
        </form>
      </div>
      <div className="content-card">
        {data.map((item, index) => (
          <div className="card" key={index}>
            <div className="content-img">
              <img src={item.imagen} alt="" />
            </div>
            <p>
              <b>{item.titulo}</b>
            </p>
            <p>
              <b>{item.precio}</b>
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Principal;
