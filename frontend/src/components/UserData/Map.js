import React, { useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
  MarkerF,
  LoadScript,
  useLoadScript,
} from "@react-google-maps/api";

import Geocode from "react-geocode";

import { useNavigate } from "react-router-dom";

import { Box, Button, Grid, IconButton, TextField } from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";

const googleApi = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const testAddress = "Univalle";

Geocode.setApiKey(googleApi);

const Map = () => {
  const navigate = useNavigate();
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  Geocode.fromAddress(testAddress).then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      setLatitude(lat);
      setLongitude(lng);
      console.log(lat, lng);
    },
    (error) => {
      console.error(error);
    }
  );

  const google = window.google;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleApi,
    libraries: ["places"],
  });

  const containerStyle = {
    width: "450px",
    height: "450px",
  };
  const pos = [41.38096843088273, 2.122841255241081];
  const center = {
    lat: latitude,
    lng: longitude,
  };

  return (
    <div style={{overflow:"hidden"}}>
      {isLoaded ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
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
              center={center}
              zoom={18}
              mapContainerStyle={containerStyle}
              onLoad={(map) => {
                setMap(map);
              }}
              options={{ disableDefaultUI: true }}
            >
              <MarkerF position={center} />
            </GoogleMap>

            <Box sx={{ position: "absolute", bottom: 30, right: 30 }}>
              <IconButton
                disableRipple
                sx={{
                  backgroundColor: "#AB274F",
                  color: "white",
                  "&:hover": { backgroundColor: "#AB274F", color: "white" },
                }}
                onClick={() => map.panTo(center)}
              >
                <MyLocationIcon />
              </IconButton>
            </Box>
          </Box>
          <Button variant="contained" onClick={()=>navigate('/UserList')}> Go back </Button>
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
          <h1>Loading....</h1>
        </Box>
      )}
    </div>
  );
};

export default React.memo(Map);
