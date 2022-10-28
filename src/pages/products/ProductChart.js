import React, { useState, useEffect } from "react";
import axios from "axios";
import collect from "collect.js";
import ColorHash from "color-hash";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const ProductChart = () => {
  // membuat nilai awal dari products
  const [products, setProducts] = useState([]); // array kosong
  const [name, setName] = useState([]); // hanya menampung nilai name
  const [price, setPrice] = useState([]); // hanya menampung nilai price

  // perintah apapun didalam useEffect akan dijalankan secara otomatis
  useEffect(() => {
    getAllProducts();
  });

  const getAllProducts = async () => {
    const response = await axios.get("http://localhost:5001/products");
    setProducts(response.data);
    // console.log(response.data);
    // hanya mengambil nilai dari name dan price menggunakan collect.js
    const nameItem = collect(products)
      .map(function (item) {
        return item.name;
      })
      .all();
    const priceItem = collect(products)
      .map(function (item) {
        return item.price;
      })
      .all();

    console.log(nameItem);
    console.log(priceItem);

    setName(nameItem);
    setPrice(priceItem);
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Products Comparation by Price",
        padding: {
          bottom: 30,
        },
        weight: "bold",
        color: "#0035c3",
        font: {
          size: 30,
        },
        align: "center",
      },
      datalabels: {
        display: true,
        color: "black",
        align: "center",
        labels: {
          title: {
            font: {
              weight: "bold",
            },
          },
          value: {
            color: "black",
          },
        },
        formatter: function (value) {
          return value;
        },
      },
    },
  };

  const colorHash = new ColorHash();

  return (
    <div className="px-5 py-5 mt-5">
      <Bar
        options={options}
        data={{
          labels: name,
          datasets: [
            {
              label: "Product Price",
              backgroundColor: name.map((name) => colorHash.hex(name)),
              borderColor: "rgba(0,30,255,0.4)",
              borderWidth: 2,
              data: price, // product price
            },
          ],
        }}
      />
    </div>
  );
};

export default ProductChart;
