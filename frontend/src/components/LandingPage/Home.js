//HOME PAGE
import React from "react";

import About from "./About";
import Footer from "./Footer";
import Banner from "./Banner";

import { useEffect } from "react";

import { Box } from "@mui/material";
import Contact2 from './Contact';

const Home = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div>
      <Box>
        <Banner />
        <Box sx={{ mt: 8 }}>
          <About />
        </Box>
        <Box>
          <Contact2 landing={true} />
        </Box>
        <Box>
          <Footer />
        </Box>
      </Box>
    </div>
  );
};

export default Home;