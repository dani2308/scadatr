import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import Header from "../../components/Header";

const Alerts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode) || {
    primary: { 600: "#1E3A8A", 700: "#162D5D", 800: "#121C3D", 900: "#0B1327" },
    grey: { 100: "#FFFFFF" },
    accent: { 400: "#3B82F6", 500: "#2563EB", 700: "#1E40AF" },
  };

  const columns = [
    { field: "title", headerName: "Título", flex: 0.7, minWidth: 120, headerClassName: "custom-header" },
    { field: "severity", headerName: "Gravidade", flex: 0.7, minWidth: 120, headerClassName: "custom-header" },
    { field: "dateHour", headerName: "Data/Hora", flex: 0.9, minWidth: 150, headerClassName: "custom-header" },
    { field: "description", headerName: "Descrição", flex: 1.5, minWidth: 200, headerClassName: "custom-header" },
    { field: "state", headerName: "Estado", flex: 0.6, minWidth: 100, headerClassName: "custom-header" },
  ];

  return (
    <Box m="20px">
      <Header title="ALERTAS" subtitle="Tabela de Alertas Criados pelo Sistema" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.accent[700],
            color: "#FFFFFF",
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
        }}
      >
        <DataGrid
          rows={mockDataTeam}
          columns={columns}
          rowCount={mockDataTeam.length}
          paginationMode="server"
          autoPageSize
          disableColumnResize
          sx={{
            width: "100%",
            overflowX: "auto",
          }}
        />
      </Box>
    </Box>
  );
};

export default Alerts;