import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/general/Navbar";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Navbar/>
    </div>
    </BrowserRouter>
  );
}

export default App;
