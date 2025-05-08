import { ResponsivePie } from "@nivo/pie";
import { Box, Typography } from "@mui/material";

const PieChart = ({ data }) => {
  const total = Object.values(data).reduce((sum, count) => sum + count, 0);
  const isValid = data && total > 0;

  if (!isValid) {
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

  const formattedData = Object.entries(data).map(([severity, count]) => ({
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
    />
  );
};

export default PieChart;
