import React from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
  //   LocationMarker,
} from "react-leaflet";
import { useState } from "react";
import { Icon } from "leaflet";

const Leaflet = () => {
  // SE Factory coordinates
  //   const position = [33.8912224627, 35.5057954788];

  //Marker
  function LocationMarker ()  {
    console.log("hello");
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        console.log("clicked", e);
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return position === null ? null : (
      <Marker position={position} icon={Icon}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }

  return (
    <MapContainer
      center={{ lat: 33.8912224627, lng: 35.5057954788 }}
      zoom={15}
      scrollWheelZoom={false}
    
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <Marker position={position}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker> */}
      <LocationMarker />
    </MapContainer>
  );
};

export default Leaflet;
