import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Alerts from "./scenes/alertas";
import LogsPage from "./scenes/logs_folder";
import Reports from "./scenes/relatorios";
import Users from "./scenes/users";
import ConfsPage from "./scenes/confs";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/alertas" element={<Alerts />} />
              <Route path="/logs_folder" element={<LogsPage />} />
              <Route path="/relatorios" element={<Reports />} />
              <Route path="/users" element={<Users />} />
              <Route path="/confs" element={<ConfsPage />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
