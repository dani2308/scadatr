import { Box, useTheme, Typography, MenuItem, Select, FormControl, Checkbox, FormControlLabel } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState } from "react";

const ConfsPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode) || {
    primary: { 600: "#1E3A8A", 700: "#162D5D", 800: "#121C3D", 900: "#0B1327" },
    grey: { 100: "#FFFFFF" },
    accent: { 400: "#3B82F6", 500: "#2563EB", 700: "#1E40AF" },
  };

  const [idioma, setIdioma] = useState("Português");
  const [fusoHorario, setFusoHorario] = useState("Lisboa GMT +0h00");

  const [tempoSessao, setTempoSessao] = useState("30min");
  const [ativarMFA, setAtivarMFA] = useState(false);
  const [bloquearIP, setBloquearIP] = useState(true);

  const [confSeveridade, setSeveridade] = useState(false);
  const [ativarNotif, setAtivarNotif] = useState(true);


  return (
    <Box m="20px">
      <Header title="CONFIGURAÇÕES" subtitle="Configurações do Sistema" />

      {/* GERAL */}
      <Box 
        mt="20px" 
        p="20px" 
        bgcolor={theme.palette.primary.main} 
        borderRadius="8px"
      >
        <Typography variant="h6" fontWeight="bold" color={theme.palette.text.primary}>
          Geral
        </Typography>

        {/* Configuração de Idioma */}
        <Box display="flex" alignItems="center" mt="15px">
          <Typography color={theme.palette.text.primary} flex={1}>Idioma:</Typography>
          <FormControl sx={{ minWidth: 200 }}>
            <Select
              value={idioma}
              onChange={(e) => setIdioma(e.target.value)}
              sx={{ bgcolor: colors.primary[600], color: theme.palette.text.primary }}
            >
              <MenuItem value="Português">Português</MenuItem>
              <MenuItem value="Inglês">Inglês</MenuItem>
              <MenuItem value="Espanhol">Espanhol</MenuItem>
              <MenuItem value="Francês">Francês</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Configuração de Fuso Horário */}
        <Box display="flex" alignItems="center" mt="15px">
          <Typography color={theme.palette.text.primary} flex={1}>Fuso Horário:</Typography>
          <FormControl sx={{ minWidth: 200 }}>
            <Select
              value={fusoHorario}
              onChange={(e) => setFusoHorario(e.target.value)}
              sx={{ bgcolor: colors.primary[600], color: theme.palette.text.primary }}
            >
              <MenuItem value="Lisboa GMT +0h00">Lisboa GMT +0h00</MenuItem>
              <MenuItem value="Madrid GMT +1h00">Madrid GMT +1h00</MenuItem>
              <MenuItem value="Nova Iorque GMT -5h00">Nova Iorque GMT -5h00</MenuItem>
              <MenuItem value="Tóquio GMT +9h00">Tóquio GMT +9h00</MenuItem>
            </Select>
          </FormControl>
        </Box>        
      </Box>      


      {/* SEGURANÇA */}
      <Box 
        mt="20px" 
        p="20px" 
        bgcolor={theme.palette.primary.main}
        borderRadius="8px"
      >
        <Typography variant="h6" fontWeight="bold" color={theme.palette.text.primary}>
          Segurança
        </Typography>

        {/* Configuração de Tempo limite sessão */}
        <Box display="flex" alignItems="center" mt="15px">
          <Typography color={theme.palette.text.primary} flex={1}>Tempo de Sessão:</Typography>
          <FormControl sx={{ minWidth: 200 }}>
            <Select
              value={tempoSessao}
              onChange={(e) => setTempoSessao(e.target.value)}
              sx={{ bgcolor: colors.primary[600], color: theme.palette.text.primary }}
            >
              <MenuItem value="15min">15 min</MenuItem>
              <MenuItem value="30min">30 min</MenuItem>
              <MenuItem value="60min">60 min</MenuItem>
              <MenuItem value="120min">120 min</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Ativar MFA */}
        <Box display="flex" alignItems="center" mt="15px">
          <Typography color={theme.palette.text.primary} flex={1}>Ativar MFA:</Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={ativarMFA}
                onChange={(e) => setAtivarMFA(e.target.checked)}
                color={theme.palette.primary.main}
              />
            }
            label=""
          />
        </Box>

        {/* Políticas de Bloqueio */}
        <Box display="flex" alignItems="center" mt="15px">
          <Typography color={theme.palette.text.primary} flex={1}>Políticas de Bloqueio:</Typography>
          <Typography color={theme.palette.text.primary} mr={2}>
            Bloquear IP após 5 tentativas falhadas
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={bloquearIP}
                onChange={(e) => setBloquearIP(e.target.checked)}
                color={theme.palette.primary.main}
              />
            }
            label=""
          />
        </Box>
      </Box>

      <Box 
        mt="20px" 
        p="20px" 
        bgcolor={theme.palette.primary.main}
        borderRadius="8px"
      >
        <Typography variant="h6" fontWeight="bold" color={theme.palette.text.primary}>
          Configuração de Alertas
        </Typography>

      

      {/* Configurar Níveis de Severidade */}
      <Box display="flex" alignItems="center" mt="15px">
          <Typography color={theme.palette.text.primary} flex={1}>Configurar Níveis de Severidade:</Typography>
          <Typography color={theme.palette.text.primary} mr={2}>
            Exibir apenas Alertas Críticos
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={confSeveridade}
                onChange={(e) => setSeveridade(e.target.checked)}
                color={theme.palette.primary.main}
              />
            }
            label=""
          />
        </Box>

        {/* Ativar Notificações de Alertas */}
        <Box display="flex" alignItems="center" mt="15px">
          <Typography color={theme.palette.text.primary} flex={1}>Ativar Notificações de Alertas:</Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={ativarNotif}
                onChange={(e) => setAtivarNotif(e.target.checked)}
                color={theme.palette.primary.main}
              />
            }
            label=""
          />
        </Box>
        </Box>
    </Box>

    
  );
};

export default ConfsPage;