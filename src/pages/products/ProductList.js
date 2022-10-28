import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
  // membuat nilai awal dari products
  const [products, setProducts] = useState([]); // array kosong

  // perintah apapun didalam useEffect akan dijalankan secara otomatis
  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    const response = await axios.get("http://localhost:5001/products");
    setProducts(response.data);
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:5001/products/${id}`);
    getAllProducts();
  };

  return (
    <div>
      <h3 className="title is-3 mt-5">All Products</h3>
      <Link className="button is-primary mb-4" to="/create">
        Create Product
      </Link>{" "}
      <Link className="button is-primary mb-4" to="/chart">
        Products Chart
      </Link>{" "}
      <table className="table is-striped is-hoverable is-bordered is-fullwidth">
        <thead>
          <tr>
            <th>No.</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <Link
                  to={`/edit/${product.id}`}
                  className="button is-warning is-normal is-light"
                >
                  Edit
                </Link>{" "}
                &nbsp;
                <Link
                  to={`#`}
                  className="button is-danger is-normal is-light"
                  onClick={() => {
                    if (window.confirm("Are you sure want to delete?")) {
                      deleteProduct(product.id);
                    }
                  }}
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
