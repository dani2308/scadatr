import { Box, Typography, Chip, TextField, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import { green } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const Alerts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredAlerts, setFilteredAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.error(
            "Token JWT não encontrado. Utilizador não autenticado."
          );
          return;
        }

        const response = await axios.get("http://localhost:8000/alerts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const formattedAlerts = response.data.map((alert) => ({
          id: alert.id,
          title: alert.title,
          severity: alert.severity,
          dateHour: alert.timestamp
            ? new Date(alert.timestamp).toLocaleString("pt-PT")
            : "—",
          description: alert.description,
          state: alert.state,
        }));

        setAlerts(formattedAlerts);
        setFilteredAlerts(formattedAlerts);
        console.log("✅ Alertas recebidos:", formattedAlerts);
      } catch (error) {
        console.error("❌ Erro ao buscar alertas:", error);
      }
    };

    fetchAlerts();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);

    const filtered = alerts.filter((alert) =>
      Object.values(alert).some((field) =>
        String(field).toLowerCase().includes(value)
      )
    );
    setFilteredAlerts(filtered);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "High":
        return "#d32f2f";
      case "Alto":
        return "#f57c00";
      case "Médio":
        return "#fbc02d";
      case "Baixo":
        return "#388e3c";
      default:
        return colors.grey[100];
    }
  };

  const columns = [
    {
      field: "description",
      headerName: "Descrição",
      flex: 1.5,
      minWidth: 200,
      headerClassName: "custom-header",
    },
    {
      field: "severity",
      headerName: "Gravidade",
      flex: 0.7,
      minWidth: 120,
      headerClassName: "custom-header",
      renderCell: (params) => (
        <Chip
          label={params.value}
          style={{
            backgroundColor: getSeverityColor(params.value),
            color: "#fff",
            fontWeight: "bold",
          }}
        />
      ),
    },
    {
      field: "dateHour",
      headerName: "Data/Hora",
      flex: 0.9,
      minWidth: 150,
      headerClassName: "custom-header",
    },
    {
      field: "state",
      headerName: "Estado",
      flex: 0.6,
      minWidth: 100,
      headerClassName: "custom-header",
      renderCell: (params) => {
        const isResolved = params.value === "resolved";
        return (
          <Chip
            label={isResolved ? "Resolvido" : "Pendente"}
            size="small"
            style={{
              backgroundColor: isResolved ? "#4caf50" : "#ff9800",
              color: "#fff",
              fontWeight: "bold",
            }}
          />
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="ALERTAS"
        subtitle="Tabela de Alertas Criados pelo Sistema"
      />

      <Box mb={2}>
        <TextField
          fullWidth
          variant="outlined"
          label="Pesquisar nos Alertas"
          value={searchText}
          onChange={handleSearch}
          sx={{
            input: { color: colors.grey[100] },
            label: { color: colors.grey[300] },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: colors.primary[500] },
              "&:hover fieldset": { borderColor: colors.primary[400] },
              "&.Mui-focused fieldset": { borderColor: green },
            },
          }}
        />
      </Box>

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.accent[700],
            color: colors.grey[100],
            fontWeight: "bold",
            fontSize: "16px",
          },
          "& .custom-header": {
            backgroundColor: `${theme.palette.primary.main} !important`,
            color: "#FFFFFF !important",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: `1px solid ${colors.primary[600]}`,
            color: colors.grey[100],
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[900],
          },
          "& .MuiDataGrid-row:nth-of-type(even)": {
            backgroundColor: colors.primary[800],
          },
          "& .MuiDataGrid-row:nth-of-type(odd)": {
            backgroundColor: colors.primary[900],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: `2px solid ${colors.primary[600]}`,
            backgroundColor: colors.primary[700],
            color: colors.grey[100],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={filteredAlerts}
          columns={columns}
          getRowId={(row) => row.id}
          autoPageSize
          disableColumnResize
          initialState={{
            sorting: {
              sortModel: [{ field: "dateHour", sort: "desc" }],
            },
          }}
          onRowClick={(params) => navigate(`/alertas/${params.row.id}`)}
        />
      </Box>
    </Box>
  );
};

export default Alerts;
