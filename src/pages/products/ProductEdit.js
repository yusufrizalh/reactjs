import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ProductEdit = () => {
  // input form: name, price, description
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getProductById();
  }, []);

  const getProductById = async () => {
    const response = await axios.get(`http://localhost:5001/products/${id}`);
    setName(response.data.name);
    setPrice(response.data.price);
    setDescription(response.data.description);
  };

  const updateProduct = async (event) => {
    event.preventDefault();
    await axios.patch(`http://localhost:5001/products/${id}`, {
      name: name,
      price: price,
      description: description,
    });
    navigate("/");
  };

  return (
    <div>
      <h3 className="title is-3 mt-4">Update Product</h3>
      <form onSubmit={updateProduct}>
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
          <button className="button is-primary">Update Product</button>
        </div>
      </form>
    </div>
  );
};

export default ProductEdit;
