import { Box, Typography, useTheme, Button, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataReports } from "../../data/mockData";
import Header from "../../components/Header";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
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
    },
    {
      field: "tipo",
      headerName: "Tipo",
      flex: 1,
    },
    {
      field: "creation_date",
      headerName: "Data de Criação",
      flex: 1,
    },
    {
      flex: 0,
      sortable: false,
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
            sx={{ color: "#fcfcfc", cursor: "pointer" }}
            onClick={() => console.log("Ver relatório:", params.row)}
          />
          <FileDownloadRoundedIcon
            sx={{ color: "#fcfcfc", cursor: "pointer" }}
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
              backgroundColor: colors.primary[400],
              color: colors.grey[100],
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
