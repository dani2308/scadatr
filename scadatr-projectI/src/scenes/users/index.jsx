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
      headerClassName: "custom-header",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "profile",
      headerName: "Perfil",
      flex: 1,
      headerClassName: "custom-header",
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
          <EditRoundedIcon
            sx={{ color: colors.grey[100], cursor: "pointer" }}
            onClick={() => console.log("Editar utilizador:", params.row)}
          />
          <DeleteRoundedIcon
            sx={{ color: "#F04437", cursor: "pointer" }}
            onClick={() => console.log("Eliminar utilizador:", params.row)}
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
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.text.primary,
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
        <DataGrid rows={mockDataUsers} columns={columns} />
      </Box>
    </Box>
  );
};

export default Users;