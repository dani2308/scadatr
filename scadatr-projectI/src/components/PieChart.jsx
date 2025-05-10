import { ResponsivePie } from "@nivo/pie";
import { Box, Typography } from "@mui/material";

const PieChart = ({ data }) => {
  // Garante que temos sempre todas as categorias, mesmo que sejam 0
  const normalizedData = {
    High: data?.High ?? 0,
    Medium: data?.Medium ?? 0,
    Low: data?.Low ?? 0,
  };

  const total = Object.values(normalizedData).reduce(
    (sum, count) => sum + count,
    0
  );

  const severityOrder = { High: 0, Medium: 1, Low: 2 };

  const formattedData = Object.entries(normalizedData)
    .sort(([a], [b]) => severityOrder[a] - severityOrder[b])
    .map(([severity, count]) => ({
      id: severity,
      label: severity,
      value: count,
      color:
        severity === "High"
          ? "#FF4C4C"
          : severity === "Medium"
          ? "#FFC300"
          : "#B0BEC5",
    }));

  if (total === 0) {
    return (
      <Box
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        p="20px"
      >
        <Typography variant="h5" color="textSecondary">
          Sem dados suficientes para o gráfico de severidade
        </Typography>
      </Box>
    );
  }

  return (
    <ResponsivePie
      data={formattedData}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={1}
      cornerRadius={5}
      activeOuterRadiusOffset={8}
      colors={{ datum: "data.color" }}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
      tooltip={({ datum }) => (
        <div
          style={{
            background: "white",
            padding: "6px 9px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <strong>{datum.label}</strong>: {datum.value} (
          {((datum.value / total) * 100).toFixed(1)}%)
        </div>
      )}
    />
  );
};

export default PieChart;
