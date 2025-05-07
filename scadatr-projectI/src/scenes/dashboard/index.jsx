import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import PieChart from "../../components/PieChart";
import CircleIcon from "@mui/icons-material/Circle";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [alerts, setAlerts] = useState([]);
  const [attackStats, setAttackStats] = useState({
    dailyCounts: {},
    severityCounts: {},
  });

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get("/alerts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Resposta da API /alerts:", response.data);

        const fetchedAlerts = Array.isArray(response.data) ? response.data : [];

        // Prepara dados para os gráficos
        const dailyCounts = {};
        const severityCounts = { High: 0, Medium: 0, Low: 0 };

        fetchedAlerts.forEach((alert) => {
          // Contar por data
          const date = new Date(alert.timestamp).toLocaleDateString(); // ou .toISOString().slice(0,10)
          dailyCounts[date] = (dailyCounts[date] || 0) + 1;

          // Contar por severidade
          if (alert.severity in severityCounts) {
            severityCounts[alert.severity]++;
          }
        });

        setAlerts(fetchedAlerts);
        setAttackStats({ dailyCounts, severityCounts });
      } catch (error) {
        console.error("Erro ao buscar alertas:", error);
        setAlerts([]);
        setAttackStats({ dailyCounts: {}, severityCounts: {} });
      }
    };

    fetchAlerts();
  }, []);

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
              ml: 2,
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
        {/* Gráfico de Linhas - Número de Ataques Detetados */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.primary.main}
          borderRadius="10px"
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h3"
              fontWeight="bold"
              color={theme.palette.text.primary}
            >
              Número de Ataques Detetados
            </Typography>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart
              data={Object.entries(attackStats.dailyCounts).map(
                ([date, count]) => ({
                  date,
                  count,
                })
              )}
            />
          </Box>
        </Box>

        {/* Gráfico de Pizza - Distribuição por Severidade */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.primary.main}
          borderRadius="10px"
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h3"
              fontWeight="bold"
              color={theme.palette.text.primary}
            >
              Severidade dos Ataques
            </Typography>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <PieChart data={attackStats.severityCounts} />
          </Box>
        </Box>

        {/* SysState Values */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.primary.main}
          overflow="auto"
          borderRadius="10px"
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
          borderRadius="10px"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${theme.palette.divider}`}
            p="15px"
          >
            <Typography
              color={theme.palette.text.primary}
              variant="h5"
              fontWeight="600"
            >
              Alertas Recentes
            </Typography>
          </Box>

          {/* Alert Values dinâmicos */}
          {Array.isArray(alerts) && alerts.length > 0 ? (
            alerts.map((alert, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${theme.palette.divider}`}
                p="15px"
              >
                <Box>
                  <ReportProblemRoundedIcon
                    sx={{
                      color:
                        alert.severity === "High"
                          ? "#F04437"
                          : alert.severity === "Medium"
                          ? "#F6D606"
                          : "#CECECE",
                      fontSize: 40,
                    }}
                  />
                </Box>

                <Typography
                  color={theme.palette.text.primary}
                  variant="h5"
                  fontWeight="600"
                  ml="10px"
                >
                  {alert.message || "Alerta sem mensagem"}
                </Typography>
              </Box>
            ))
          ) : (
            <Box p="15px">
              <Typography
                color={theme.palette.text.secondary}
                variant="h6"
                fontWeight="400"
              >
                Sem alertas recentes.
              </Typography>
            </Box>
          )}
        </Box>

        {/* ActiveUsrs */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.primary.main}
          overflow="auto"
          borderRadius="10px"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${theme.palette.divider}`}
            colors={theme.palette.divider}
            p="15px"
          >
            <Typography
              color={theme.palette.text.primary}
              variant="h5"
              fontWeight="600"
            >
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
      </Box>
    </Box>
  );
};

export default Dashboard;
