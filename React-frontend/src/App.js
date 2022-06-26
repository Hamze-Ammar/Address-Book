import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/general/Navbar";
import Register from "./components/general/Register";
import Login from "./components/general/Login";
import AddContact from "./components/contact/AddContact";
import ShowContacts from "./components/contact/ShowContacts";
import EditContact from "./components/contact/EditContact";
import Leaflet from "./components/leaflet/Leaflet";
import Map from "./components/leaflet/Map";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Navbar/>
      <Routes>
        {/* Testing leaflet */}
        <Route
            path="/map"
            element={
              <>
              <Leaflet/>
              </>
            }
            ></Route>
            <Route
            path="/map1"
            element={
              <>
              <Map/>
              </>
            }
            ></Route>
        {/* End Testing leaflet */}

      <Route
            path="/"
            element={
              <>
              <ShowContacts/>
              </>
            }
            ></Route>
        <Route path="edit/:id" element={<EditContact />}></Route>

      <Route
            path="/add"
            element={
              <>
              <AddContact/>
              </>
            }
            ></Route>
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
