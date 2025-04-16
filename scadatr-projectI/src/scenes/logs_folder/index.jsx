import { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import axios from "axios";

const LogsPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/logs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLogs(response.data);
      } catch (error) {
        console.error("Erro ao buscar logs:", error);
      }
    };

    fetchLogs();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "timestamp", headerName: "Data/Hora", flex: 1 },
    { field: "source_ip", headerName: "IP Origem", flex: 1 },
    { field: "destination_ip", headerName: "IP Destino", flex: 1 },
    { field: "protocol", headerName: "Protocolo", flex: 1 },
    { field: "packet_size", headerName: "Tamanho Pacote", flex: 1 },
    { field: "prediction", headerName: "Predição", flex: 1 },
    { field: "user_id", headerName: "ID Utilizador", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Header title="LOGS" subtitle="Registos de tráfego analisado" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.primary.main,
            color: "#FFFFFF",
            fontWeight: "bold",
            fontSize: "16px",
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
        }}
      >
        <DataGrid
          rows={logs}
          columns={columns}
          getRowId={(row) => row.id}
          autoPageSize
          disableColumnResize
        />
      </Box>
    </Box>
  );
};

export default LogsPage;
