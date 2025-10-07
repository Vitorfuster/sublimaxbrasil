import React from "react";

import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import { Home, Login, Register, Admin } from "../containers";

import paths from "../constants/paths";

function Rotas() {
  return (
    <Router>
      <Routes>
        <Route element={<Register />} path="/cadastro" />
        <Route element={<Login />} path="/login" />
        <Route element={<Home />} path="/" />

        <Route element={<Admin />} path={paths.NewProducts} />
      </Routes>
    </Router>
  );
}

export default Rotas;
