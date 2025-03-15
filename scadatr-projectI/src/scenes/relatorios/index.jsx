import { Box, Typography, useTheme, Button, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataReports } from "../../data/mockData";
import Header from "../../components/Header";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

const Reports = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: "name",
      headerName: "Nome",
      flex: 1,
      cellClassName: "name-column--cell",
      headerClassName: "custom-header"
    },
    {
      field: "tipo",
      headerName: "Tipo",
      flex: 1,
      headerClassName: "custom-header"
    },
    {
      field: "creation_date",
      headerName: "Data de Criação",
      flex: 1,
      headerClassName: "custom-header"
    },
    {
      flex: 0,
      sortable: false,
      headerClassName: "custom-header",
      renderCell: (params) => (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={1}
          width="100%"
          height="100%"
        >
          <RemoveRedEyeRoundedIcon
            sx={{ color: colors.grey[100], cursor: "pointer" }}
            onClick={() => console.log("Ver relatório:", params.row)}
          />
          <FileDownloadRoundedIcon
            sx={{ color: colors.grey[100], cursor: "pointer" }}
            onClick={() => console.log("Download relatório:", params.row)}
          />
        </Box>
      ),
      headerAlign: "center",
      align: "center",
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="RELATÓRIOS"
          subtitle="Tabela de Relatórios Criados pelo Sistema"
        />

        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.text.primary,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <AddCircleRoundedIcon sx={{ mr: "10px" }} />
            Criar Relatório
          </Button>
        </Box>
      </Box>

      <Box
        m="20px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: `1px solid ${colors.primary[600]}`,
            color: colors.grey[100],
          },
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
        <DataGrid rows={mockDataReports} columns={columns} />
      </Box>
    </Box>
  );
};

export default Reports;
