import { useEffect, useState } from "react";
import { Box, TextField, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import axios from "axios";
import { green } from "@mui/material/colors";

const LogsPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [logs, setLogs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredLogs, setFilteredLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.error("Token JWT não encontrado.");
          return;
        }

        const response = await axios.get("http://localhost:8000/logs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const dadosFormatados = response.data.map((log) => ({
          ...log,
          timestamp: log.timestamp
            ? new Date(log.timestamp).toLocaleString("pt-PT")
            : "—",
        }));

        setLogs(dadosFormatados);
        setFilteredLogs((prevFiltered) => {
          // Atualiza a pesquisa em tempo real se houver texto no campo
          if (searchText) {
            return dadosFormatados.filter((log) =>
              Object.values(log).some((field) =>
                String(field).toLowerCase().includes(searchText.toLowerCase())
              )
            );
          } else {
            return dadosFormatados;
          }
        });
      } catch (error) {
        console.error("Erro ao encontrar logs:", error);
      }
    };

    // Chamada inicial
    fetchLogs();

    // Polling a cada 5 segundos (5000 ms)
    const interval = setInterval(fetchLogs, 5000);

    // Cleanup
    return () => clearInterval(interval);
  }, [searchText]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);

    const filtered = logs.filter((log) =>
      Object.values(log).some((field) =>
        String(field).toLowerCase().includes(value)
      )
    );
    setFilteredLogs(filtered);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
      headerClassName: "custom-header",
    },
    {
      field: "timestamp",
      headerName: "Data/Hora",
      flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "source_ip",
      headerName: "IP Origem",
      flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "destination_ip",
      headerName: "IP Destino",
      flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "protocol",
      headerName: "Protocolo",
      flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "packet_size",
      headerName: "Tamanho Pacote",
      flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "prediction",
      headerName: "Predição",
      flex: 1,
      headerClassName: "custom-header",
      renderCell: (params) => (
        <strong
          style={{
            color: params.value === "Attack" ? "#f44336" : "#4caf50",
            fontWeight: "bold",
          }}
        >
          {params.value}
        </strong>
      ),
    },
    {
      field: "user_id",
      headerName: "ID Utilizador",
      flex: 1,
      headerClassName: "custom-header",
    },
  ];

  return (
    <Box m="20px">
      <Header title="LOGS" subtitle="Registos de tráfego analisado" />

      {/* Campo de Pesquisa */}
      <Box mb={2}>
        <TextField
          fullWidth
          variant="outlined"
          label="Pesquisar nos Logs"
          value={searchText}
          onChange={handleSearch}
          sx={{
            input: { color: colors.grey[100] },
            label: { color: colors.grey[300] },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: colors.primary[500],
              },
              "&:hover fieldset": {
                borderColor: colors.primary[400],
              },
              "&.Mui-focused fieldset": {
                borderColor: green,
              },
            },
          }}
        />
      </Box>

      {/* Tabela de Logs */}
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: `${colors.primary[700]} !important`,
          },
          "& .custom-header": {
            backgroundColor: `${theme.palette.primary.main} !important`,
            color: "#FFFFFF !important",
          },

          "& .MuiDataGrid-columnHeaderTitle": {
            color: `${colors.grey[100]} !important`,
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
          "& .MuiCheckbox-root": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={filteredLogs}
          columns={columns}
          getRowId={(row) => row.id}
          autoPageSize
          disableColumnResize
          initialState={{
            sorting: {
              sortModel: [{ field: "id", sort: "desc" }],
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default LogsPage;
