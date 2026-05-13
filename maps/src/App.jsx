import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

function App() {
  const center = {
    lat: 25.1972,
    lng: 55.2744,
  };

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
    >
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "500px",
        }}
        center={center}
        zoom={13}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}

export default App;