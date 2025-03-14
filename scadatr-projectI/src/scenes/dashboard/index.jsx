import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import CircleIcon from "@mui/icons-material/Circle";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Bem-vindo ao Dashboard" />

        <Box>
          <Button
            variant="contained"
            color="primary"
            sx={{
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              ml: 2, // Adiciona espaçamento à esquerda
              ":hover": { backgroundColor: theme.palette.primary.dark },
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download de Relatórios
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={theme.palette.primary.main}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={theme.palette.text.primary}
              >
                Número de Acessos
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: theme.palette.text.primary }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        
          {/* SysState Values */}
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={theme.palette.primary.main}
            overflow="auto"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${theme.palette.divider}`}
              colors={theme.palette.text.secondary}
              p="15px"
            >
              <Typography
                color={theme.palette.text.primary}
                variant="h5"
                fontWeight="600"
              >
                Estado do Sistema
              </Typography>
            </Box>

            {/* SysStatus Values */}
            {[
              {
                status: "Base de Dados",
                icon: <CircleIcon sx={{ color: "#F04437", fontSize: 20 }} />,
              },
              {
                status: "Servidor",
                icon: <CircleIcon sx={{ color: "#08FA00", fontSize: 20 }} />,
              },
              {
                status: "Sistema",
                icon: <CircleIcon sx={{ color: "#F6D606", fontSize: 20 }} />,
              },
            ].map((item, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${theme.palette.divider}`}
                p="15px"
              >
                <Box>{item.icon}</Box>

                <Typography
                  color={theme.palette.text.primary}
                  variant="h5"
                  fontWeight="600"
                >
                  {item.status}
                </Typography>
              </Box>
            ))}
          </Box>
        

        {/* Alerts */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.primary.main}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${theme.palette.divider}`}
            colors={theme.palette.primary.main}
            p="15px"
          >
            <Typography color={theme.palette.text.primary} variant="h5" fontWeight="600">
              Alertas Recentes
            </Typography>
          </Box>

          {/* Alert Values */}
          {[
            {
              status: "Detetada Anomalia na Máquina 192.168.23.124 ",
              icon: (
                <ReportProblemRoundedIcon
                  sx={{ color: "#F04437", fontSize: 40 }}
                />
              ),
            },
            {
              status: "Falha na Criação do Relatório de Acessos",
              icon: (
                <ReportProblemRoundedIcon
                  sx={{ color: "#F6D606", fontSize: 40 }}
                />
              ),
            },
            {
              status: "Sistema Atualizado para a Versão 'v.1.5.2'",
              icon: (
                <ReportProblemRoundedIcon
                  sx={{ color: "#CECECE", fontSize: 40 }}
                />
              ),
            },
            {
              status: "Sistema Atualizado para a Versão 'v.1.5.1'",
              icon: (
                <ReportProblemRoundedIcon
                  sx={{ color: "#CECECE", fontSize: 40 }}
                />
              ),
            },
          ].map((item, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${theme.palette.divider}`}
              p="15px"
            >
              <Box>{item.icon}</Box>

              <Typography
                color={theme.palette.text.primary}
                variant="h5"
                fontWeight="600"
              >
                {item.status}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* ActiveUsrs */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.primary.main}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${theme.palette.divider}`}
            colors={theme.palette.divider}
            p="15px"
          >
            <Typography color={theme.palette.text.primary} variant="h5" fontWeight="600">
              Utilizadores Ativos
            </Typography>
          </Box>

          {/* ActiveUsrs Values */}
          {[
            {
              status: "A_Andrade90",
              icon: <AccountCircleRoundedIcon sx={{ fontSize: 40 }} />,
            },
            {
              status: "B_Baltazar91",
              icon: <AccountCircleRoundedIcon sx={{ fontSize: 40 }} />,
            },
            {
              status: "C_Candido92",
              icon: <AccountCircleRoundedIcon sx={{ fontSize: 40 }} />,
            },
            {
              status: "D_Diospiro93",
              icon: <AccountCircleRoundedIcon sx={{ fontSize: 40 }} />,
            },
            {
              status: "E_Ermindo94",
              icon: <AccountCircleRoundedIcon sx={{ fontSize: 40 }} />,
            },
            {
              status: "F_Franguinho95",
              icon: <AccountCircleRoundedIcon sx={{ fontSize: 40 }} />,
            },
          ].map((item, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${theme.palette.divider}`}
              p="15px"
            >
              <Box>{item.icon}</Box>

              <Typography
                color={theme.palette.text.primary}
                variant="h5"
                fontWeight="600"
              >
                {item.status}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={theme.palette.primary.main}
          mb="10px"
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={theme.palette.text.primary}
              >
                Número de Acessos
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: theme.palette.text.primary }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
