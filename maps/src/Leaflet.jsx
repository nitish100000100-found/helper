import { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function App() {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [position, setPosition] = useState(null);

  return (
    <div>
      <input
        placeholder="Latitude"
        onChange={(e) => setLat(e.target.value)}
      />

      <input
        placeholder="Longitude"
        onChange={(e) => setLng(e.target.value)}
      />

      <button
        onClick={() => {
          setPosition([lat, lng]);
        }}
      >
        Show Map
      </button>

      {position && (
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <Marker position={position} />
        </MapContainer>
      )}
    </div>
  );
}

export default App;