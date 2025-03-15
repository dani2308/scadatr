import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";

const LogsPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode) || {
    primary: { 600: "#1E3A8A", 700: "#162D5D", 800: "#121C3D", 900: "#0B1327" },
    grey: { 100: "#FFFFFF" },
    accent: { 400: "#3B82F6", 500: "#2563EB", 700: "#1E40AF" },
  };

  const rows = mockDataInvoices.map((item, index) => ({
    id: item.id || index,
    ...item,
  }));

  const columns = [
    { field: "tipo", headerName: "Tipo", flex: 1, headerClassName: "custom-header" },
    { field: "origem", headerName: "Origem", flex: 1, headerClassName: "custom-header" },
    { field: "date_hour", headerName: "Data/Hora", flex: 1, headerClassName: "custom-header" },
    { field: "description", headerName: "Descrição", flex: 2, headerClassName: "custom-header" },
  ];

  console.log("Dados carregados:", rows);

  return (
    <Box m="20px">
      <Header title="LOGS" subtitle="Tabela de Logs Captados pelo Sistema" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: `${theme.palette.primary.main} !important`,
            color: "#FFFFFF !important",
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
          rows={mockDataInvoices}
          columns={columns}
          rowCount={mockDataInvoices.length}
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

export default LogsPage;
