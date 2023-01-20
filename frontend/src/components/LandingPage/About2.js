//About 2
import React from "react";

//images import
import Image1 from "./Images/Group 29.png";

import "../../App.css";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const About2 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className="mainPage">
      <Container sx={{ py: 8, px: 6 }} maxWidth="lg">
        <Grid container justifyContent="center">
          <Card
            className={isMobile ? "Card-mobile" : "Card-default"}
            variant="filled"
          >
            <Box className="Paper-def" variant="contained" textAlign="center" sx={{px:5}}>
              <img src={Image1} alt="Image1"/>
            </Box>

            <CardContent sx={{ flexGrow: 1, px:5}}>
              <Typography
                textAlign="center"
                variant={isMobile ? "h5" : "h4"}
                sx={{ mb: 2, fontWeight: 600 }}
              >
                Lanzamiento con los mejores
              </Typography>

              <Typography
                className={isMobile ? "About-textmobile" : "About-text"}
              >
                A centralized platform that integrates zillions of data sources
                using Big Data ELT (Extract,Load & Transform that leaves no data
                behind)
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </div>
  );
};

export default About2;
// CODE BY GRACY PATEL
