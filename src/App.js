import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Welcome from "./components/Welcome";
import Home from "./components/Home";
import Account from "./components/Account";
import Ingredients from "./components/Ingredients";
import FindRecipe from "./components/FindRecipe";
import Favorites from "./components/Favorites";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/ingredients" element={<Ingredients />} />
        <Route path="/findrecipe" element={<FindRecipe />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
