import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Alerts from "./scenes/alertas";
import LogsPage from "./scenes/logs_folder";
import Reports from "./scenes/relatorios";
import Users from "./scenes/users";
import ConfsPage from "./scenes/confs";
import LoginForm from "./LoginForm/LoginForm";
import AlertDetail from "./scenes/alertas/AlertDetail";
import { ToastContainer } from "react-toastify";
import { NotificationProvider } from "./context/NotificationContext";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("accessToken");
  });

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <NotificationProvider>
      {" "}
      {/* <-- envolver aqui */}
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            {isAuthenticated && <Sidebar isSidebar={isSidebar} />}
            <main className="content">
              {isAuthenticated && <Topbar setIsSidebar={setIsSidebar} />}
              <Routes>
                <Route
                  path="/login"
                  element={
                    <LoginForm setIsAuthenticated={setIsAuthenticated} />
                  }
                />
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/alertas"
                  element={
                    <PrivateRoute>
                      <Alerts />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/alertas/:id"
                  element={
                    <PrivateRoute>
                      <AlertDetail />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/logs_folder"
                  element={
                    <PrivateRoute>
                      <LogsPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/relatorios"
                  element={
                    <PrivateRoute>
                      <Reports />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/users"
                  element={
                    <PrivateRoute>
                      <Users />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/confs"
                  element={
                    <PrivateRoute>
                      <ConfsPage />
                    </PrivateRoute>
                  }
                />
              </Routes>
              <ToastContainer newestOnTop pauseOnFocusLoss />
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </NotificationProvider>
  );
}

export default App;
