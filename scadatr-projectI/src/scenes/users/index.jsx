import { Box, Typography, useTheme, Button, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataUsers } from "../../data/mockData";
import Header from "../../components/Header";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

const Users = () => {
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
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "profile",
      headerName: "Perfil",
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
          <EditRoundedIcon
            sx={{ color: "#fcfcfc", cursor: "pointer" }}
            onClick={() => console.log("Ver relatório:", params.row)}
          />
          <DeleteRoundedIcon
            sx={{ color: "#F04437", cursor: "pointer" }}
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
          title="UTILIZADORES"
          subtitle="Tabela de Utilizadores no Sistema"
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
            Criar Utilizador
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
        <DataGrid rows={mockDataUsers} columns={columns} />
      </Box>
    </Box>
  );
};

export default Users;
