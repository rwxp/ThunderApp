import React from "react";
import { Box, IconButton, Typography } from "@mui/material";

import { tokens, ColorModeContext, useMode } from "../Theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { mockTransactions } from "../data/mockData";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import LineChart from "../ComponentsDashboard/LineChart";
import GeographyChart from "../ComponentsDashboard/GeographyChart";
import BarChart from "../ComponentsDashboard/BarChart";
import StatBox from "../ComponentsDashboard/StatBox";
import ProgressCircle from "../ComponentsDashboard/ProgressCircle";

import * as UserAPI from "../../../UserList/UserAPI";

const Charts = () => {
  const [clientes, setclientes] = React.useState();

  const listUsers = async () => {
    try {
      const res = await UserAPI.listUsers();
      const data = await res.json();
      const clients = data.users.filter((user) => user.role === "Cliente");
      setclientes(clients.length);
    } catch (error) {
      console.log(error);
    }
  };

  React.useMemo(() => {
    listUsers();
    // eslint-disable-next-line
  }, []);

  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          height="30vh"
          width="15vw"
          justifyContent="center"
        >
          <StatBox
            title={clientes}
            subtitle="Nuevos clientes"
            progress="0.30"
            icon={
              <PersonAddIcon
                sx={{
                  color: colors.greenAccent[600],
                  fontSize: "26px",
                }}
              />
            }
          />
        </Box>
    
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          height="30vh"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Transacciones recientes
            </Typography>
          </Box>
            <Box
              key={0}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  ID Factura
                </Typography>
                <Typography color={colors.grey[100]}>
                  Usuario
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>Fecha</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${0}
              </Box>
            </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="20px"
          height="30vh"
        >
          <Typography variant="h5" fontWeight="600">
            Crecimiento
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="20px"
          >
            <ProgressCircle size="100" />
          </Box>
        </Box>
      </Box>
    </ColorModeContext.Provider>
  );
};
export default Charts;
