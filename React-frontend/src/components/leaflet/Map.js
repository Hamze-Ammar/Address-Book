import React from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useState } from "react";
import { Icon } from "leaflet";
import useStore from "../zustand/Store";
import { Link, useNavigate } from "react-router-dom";

const TestMap = () => {
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    console.log(latitude);
    console.log(longitude);
    let navigate = useNavigate();

    //Onclick saveAndReturn
    const saveAndReturn = () => {
      console.log("clicked");
      if (latitude && longitude){
        useStore.setState({latitude});
        useStore.setState({longitude});
        navigate('/add');
      }
      else{
        alert("Please click on the map and choose location!")
        return
      }
    }

  function LocationMarkers() {
    // const initialMarkers: LatLng[] = [new LatLng(51.505, -0.09)];
    const [markers, setMarkers] = useState([]);
    // console.log(markers[0]);
    // setPoint(markers);

    const map = useMapEvents({
      click(e) {
        markers.push(e.latlng);
        setMarkers([e.latlng]);
        // setPoint([e.latlng])
        if (markers[0]){
            // console.log(markers[0].lng);
            setLatitude(markers[0].lat);
            setLongitude(markers[0].lng);
        }
      },
    });

    return (
      <React.Fragment>
        {markers.map((marker) => (
          <Marker position={marker} icon={Icon}></Marker>
        ))}
      </React.Fragment>
    );
  }

  //   function LeafletMap() {
  //     const mapCentre = new LatLng(51.505, -0.09);

  return (
    <div className="main-map">
      <div className="map-container">
        <MapContainer
        className="map-container"
          center={{ lat: 33.8912224627, lng: 35.5057954788 }}
          zoom={15}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarkers />
        </MapContainer>
       </div>
       <div className="modal-map">
        <h2>Location</h2>
        <h3>Latitude: {latitude && latitude} </h3>
        <h3>Longitude: {longitude && longitude} </h3>
        <button className="normal" onClick={saveAndReturn}>Save Location</button>
      </div> 
    </div>
  )
};

export default TestMap;
