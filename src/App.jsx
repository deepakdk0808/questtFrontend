import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Cart from "./Pages/AddCart";
import ProductShow from "./Pages/ProductShow";
import PrivateRoute from "./Components/PrivateRoute";
import AdminBookForm from "./Pages/AdminPage";
import "./App.css"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/booksInfo/:id" element={<ProductShow />}></Route>
      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        }
      ></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path='/admin' element={<AdminBookForm/>}></Route>
    </Routes>
  );
}
