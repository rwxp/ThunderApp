import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
  MarkerF,
  LoadScript,
  useLoadScript,
} from "@react-google-maps/api";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import { useNavigate } from "react-router-dom";

import { Box, Button, Grid, IconButton, TextField } from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";

const googleApi = "AIzaSyCuDfadM8HL6wSWYIcwJ31ub-1t_PFqTK4";
const libraries = ["places"];

const Map = () => {
  const testAddress = window.localStorage.getItem("userAddress");
  const address = JSON.parse(testAddress);
  const navigate = useNavigate();
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleApi,
    libraries,
  });

  const containerStyle = {
    width: "450px",
    height: "450px",
  };

  const {
    ready,
    value,
    suggestions: { status, data },
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });

  const loadInfo = async (address) => {
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = getLatLng(results[0]);
      setLatitude(lat);
      setLongitude(lng);
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  useEffect(() => {
    isLoaded && loadInfo(address);
  });

  const path = window.location.pathname;

  const handleGoBack = () => {
    if (path === "/Dashboard") {
      navigate(`/Dashboard#users`);
    } else if (path === "/Operador") {
      navigate(`/Operador#users`);
    }
  };

  return (
    <div style={{ overflow: "hidden" }}>
      {isLoaded ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            width: "100vw",
            mt: 6,
            rowGap: 2,
          }}
        >
          <Box
            sx={{
              position: "relative",
              border: "1px solid black",
              width: "fit-content",
              height: "fit-content",
            }}
          >
            <GoogleMap
              center={{ lat: latitude, lng: longitude }}
              zoom={18}
              mapContainerStyle={containerStyle}
              onLoad={(map) => {
                setMap(map);
              }}
              options={{ disableDefaultUI: true }}
            >
              <MarkerF position={{ lat: latitude, lng: longitude }} />
            </GoogleMap>

            <Box sx={{ position: "absolute", bottom: 30, right: 30 }}>
              <IconButton
                disableRipple
                sx={{
                  backgroundColor: "#AB274F",
                  color: "white",
                  "&:hover": { backgroundColor: "#AB274F", color: "white" },
                }}
                onClick={() => map.panTo({ lat: latitude, lng: longitude })}
              >
                <MyLocationIcon />
              </IconButton>
            </Box>
          </Box>
          <Button
            variant="contained"
            onClick={handleGoBack}
            sx={{
              bgcolor: "lightblue",
              color: "black",
              "&:hover": {
                color: "white",
              },
            }}
          >
            {" "}
            Volver{" "}
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            placeItems: "center",
            height: "100vh",
            width: "100vw",
            backgroundColor: "rgba(114, 160, 193, 0.5)",
          }}
        >
          <h1>Cargando...</h1>
        </Box>
      )}
    </div>
  );
};

export default React.memo(Map);
