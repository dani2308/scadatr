import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";

const Alerts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "title", headerName: "Título", flex: 0.7, minWidth: 120 },
    { field: "severity", headerName: "Gravidade", flex: 0.7, minWidth: 120 },
    { field: "dateHour", headerName: "Data/Hora", flex: 0.9, minWidth: 150 },
    { field: "description", headerName: "Descrição", flex: 1.5, minWidth: 200 },
    { field: "state", headerName: "Estado", flex: 0.6, minWidth: 100 },
  ];

  return (
    <Box m="20px">
      <Header
        title="ALERTAS"
        subtitle="Tabela de Alertas Criados pelo Sistema"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.grey[100],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.primary[600]} !important`,
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
