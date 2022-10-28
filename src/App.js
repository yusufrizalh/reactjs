import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./pages/products/ProductList.js";
import ProductCreate from "./pages/products/ProductCreate.js";
import ProductEdit from "./pages/products/ProductEdit.js";
import ProductChart from "./pages/products/ProductChart.js";
import UserRegister from "./pages/users/UserRegister.js";
import UserLogin from "./pages/users/UserLogin.js";
import UserProfile from "./pages/users/UserProfile.js";

function App() {
  return (
    <Router>
      <div className="container">
        <div className="columns">
          <div className="column is-full">
            <Routes>
              <Route exact path="/" element={<ProductList />} />
              <Route exact path="/create" element={<ProductCreate />} />
              <Route exact path="/edit/:id" element={<ProductEdit />} />
              <Route exact path="/chart" element={<ProductChart />} />
              <Route exact path="/register" element={<UserRegister />} />
              <Route exact path="/login" element={<UserLogin />} />
              <Route exact path="/profile" element={<UserProfile />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
