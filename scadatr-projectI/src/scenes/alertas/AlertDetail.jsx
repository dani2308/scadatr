import {
  Box,
  Typography,
  IconButton,
  Checkbox,
  FormControlLabel,
  TextField,
  Button,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { tokens } from "../../theme";

const mockAlert = {
  id: "1",
  tipo: "Ataque DDoS",
  origem: "192.168.0.5",
  descricao:
    "Uma tentativa de ataque de SQL Injection foi detetado no endpoint /login. \n O atacante tentou enviar um payload malicioso para aceder a dados sensíveis. \n Detalhes do Payload: ‘ OR ‘1’=’1’ -- \n Recomenda-se bloquar o IP e rever os logs do endpoint afetado!",
  comentarios: [
    { id: 1, autor: "rogerio@scadatr.com", texto: "Análise em curso." },
    {
      id: 2,
      autor: "silva@scadatr.com",
      texto: "Tráfego proveniente da porta 80.",
    },
  ],
};

const AlertDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [alerta, setAlerta] = useState(null);
  const [resolvido, setResolvido] = useState(false);
  const [bloquear, setBloquear] = useState(false);
  const [novoComentario, setNovoComentario] = useState("");

  useEffect(() => {
    setAlerta(mockAlert);
  }, [id]);

  const handleComentarioSubmit = () => {
    if (novoComentario.trim()) {
      setAlerta((prev) => ({
        ...prev,
        comentarios: [
          ...prev.comentarios,
          { id: Date.now(), autor: "tu", texto: novoComentario },
        ],
      }));
      setNovoComentario("");
    }
  };

  if (!alerta) return <Typography>A Carregar...</Typography>;

  return (
    <Box m="20px">
      <IconButton onClick={() => navigate("/alertas")}>
        <ArrowBackIcon sx={{ color: colors.grey[100] }} />
      </IconButton>

      <Typography variant="h3" color="fff" fontWeight="bold" mb={2}>
        {alerta.tipo}
      </Typography>

      <Box
        p={3}
        backgroundColor={colors.primary[800]}
        borderRadius="10px"
        mb={4}
      >
        <Typography variant="h4" color="fff" gutterBottom>
          Detalhes do Alerta
        </Typography>
        <Typography color="fff">Tipo: {alerta.tipo}</Typography>
        <Typography color="fff">Origem: {alerta.origem}</Typography>
        <Typography color="fff">Descrição: {alerta.descricao}</Typography>
        <Box mt={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={resolvido}
                onChange={(e) => setResolvido(e.target.checked)}
                sx={{ color: colors.grey[100] }}
              />
            }
            label="Resolvido"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={bloquear}
                onChange={(e) => setBloquear(e.target.checked)}
                sx={{ color: colors.grey[100] }}
              />
            }
            label="Bloquear IP"
          />
        </Box>
      </Box>

      <Box>
        <Typography variant="h4" color="fff" gutterBottom>
          Comentários
        </Typography>
        {alerta.comentarios.map((c) => (
          <Box
            key={c.id}
            p={1}
            mb={1}
            bgcolor={colors.primary[700]}
            borderRadius="8px"
          >
            <Typography color="fff" fontWeight="bold">
              {c.autor}
            </Typography>
            <Typography color="fff">{c.texto}</Typography>
          </Box>
        ))}

        <Box mt={2} display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Comentar..."
            multiline
            rows={3}
            value={novoComentario}
            onChange={(e) => setNovoComentario(e.target.value)}
            sx={{
              "& .MuiInputBase-root": {
                color: colors.grey[100],
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: colors.primary[600],
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: colors.primary[400],
              },
              "& .MuiInputLabel-root": {
                color: colors.grey[300],
              },
            }}
          />
          <Button
            onClick={handleComentarioSubmit}
            variant="contained"
            color="primary"
          >
            Adicionar Comentário
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AlertDetail;
