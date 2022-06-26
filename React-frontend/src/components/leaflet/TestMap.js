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
import L from "leaflet";

const TestMap = () => {

  function LocationMarkers() {
    // const initialMarkers: LatLng[] = [new LatLng(51.505, -0.09)];
    const [markers, setMarkers] = useState([]);
    console.log(markers[0])
    const map = useMapEvents({
      click(e) {
        markers.push(e.latlng);
        setMarkers( [ e.latlng]);
      },
    });

    return (
      <React.Fragment>
        {markers.map((marker) => (
          <Marker position={marker}></Marker>
        ))}
      </React.Fragment>
    );
  }

//   function LeafletMap() {
//     const mapCentre = new LatLng(51.505, -0.09);

    return (
      <MapContainer center={{ lat: 33.8912224627, lng: 35.5057954788 }}
      zoom={15}
      scrollWheelZoom={false}>
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
        <LocationMarkers />
      </MapContainer>
    );
  
};

export default TestMap;
