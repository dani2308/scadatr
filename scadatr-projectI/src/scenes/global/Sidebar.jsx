import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import WebStoriesIcon from "@mui/icons-material/WebStories";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useUser } from "../../scenes/global/useUser";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: theme.palette.text.primary,
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const user = useUser();

  return (
    <Box
      sx={{
        height: "100vh",
        "& .pro-sidebar-inner": {
          background: `${colors.primary[500]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          backgroundColor: `${colors.primary[600]} !important`,
          color: `${theme.palette.text.primary} !important`,
          borderRadius: "10px",
          transition: "background-color 0.3s ease",
          mr: "10px",
        },
        "& .pro-menu-item.active": {
          backgroundColor: `${colors.primary[700]} !important`,
          color: `${theme.palette.text.primary} !important`,
          borderRadius: "10px",
          mr: "10px",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed} style={{ height: "100%" }}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: theme.palette.text.primary,
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={theme.palette.text.primary}>
                  SCADATR
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="80px"
                  height="80px"
                  src={`../../assets/scadatr_logo_img.png`}
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    border: "2px solid",
                    borderColor: "#ffffff",
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  color={theme.palette.text.primary}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user ? user.email : "A carregar..."}
                </Typography>
                <Typography variant="h5" color={theme.palette.text.primary}>
                  Administrador
                </Typography>
              </Box>
            </Box>
          )}

          {/* Menu Items */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<DashboardIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Alertas"
              to="/alertas"
              icon={<ReportProblemIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Logs"
              to="/logs_folder"
              icon={<WebStoriesIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Relatórios"
              to="/relatorios"
              icon={<AssignmentIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Utilizadores"
              to="/users"
              icon={<PeopleIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Configurações"
              to="/confs"
              icon={<SettingsIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={theme.palette.text.primary}
              sx={{ m: "25px 0 5px 20px" }}
            ></Typography>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
