import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductCreate = () => {
  // input form: name, price, description
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const createProduct = async (event) => {
    event.preventDefault(); // menghindari refresh didalam form
    await axios.post("http://localhost:5001/products/", {
      name: name,
      price: price,
      description: description,
    });
    navigate("/");
  };

  return (
    <div>
      <h3 className="title is-3 mt-4">Create New Product</h3>
      <form onSubmit={createProduct}>
        <div className="field">
          <label className="label">Product Name</label>
          <input
            type="text"
            className="input"
            placeholder="Please enter product name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="field">
          <label className="label">Product Price</label>
          <input
            type="text"
            className="input"
            placeholder="Please enter product price"
            required
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </div>
        <div className="field">
          <label className="label">Description</label>
          <input
            type="text"
            className="input"
            placeholder="Please enter description"
            required
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className="field">
          <button className="button is-primary">Create Product</button>
        </div>
      </form>
    </div>
  );
};

export default ProductCreate;
