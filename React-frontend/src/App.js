import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/general/Navbar";
import Register from "./components/general/Register";
import Login from "./components/general/Login";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Navbar/>
      <Routes>
      <Route
            path="/login"
            element={
              <>
              <Login/>
              </>
            }
            ></Route>
      <Route
            path="/register"
            element={
              <>
              <Register/>
              </>
            }
            ></Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
