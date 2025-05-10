import { Box, Typography } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";

const BarChart = ({ data }) => {
  const isValidObject =
    data && typeof data === "object" && Object.keys(data).length > 0;

  if (!isValidObject) {
    return (
      <Box
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        p="20px"
      >
        <Typography variant="h5" color="#fff">
          Sem dados suficientes para o gráfico de ataques
        </Typography>
      </Box>
    );
  }

  const chartData = Object.entries(data)
    .sort(([a], [b]) => new Date(a) - new Date(b))
    .map(([date, count]) => ({ date, Ataques: count }));

  return (
    <ResponsiveBar
      data={chartData}
      keys={["Ataques"]}
      indexBy="date"
      margin={{ top: 50, right: 30, bottom: 60, left: 60 }}
      padding={0.3}
      colors={(bar) => {
        const y = bar.data["Ataques"];
        if (y > 10) return "#ff4d4f"; // vermelho para muitos ataques
        if (y > 5) return "#ffc107"; // amarelo para ataques médios
        return "#4caf50"; // verde para poucos ataques
      }}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      valueScale={{ type: "linear", max: 50 }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -45,
        legend: "Dia",
        legendPosition: "middle",
        legendOffset: 50,
        tickValues: "every 1 day",
        format: (value) => value,
        tickTextColor: "#fff",
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Nº de Ataques",
        legendPosition: "middle",
        legendOffset: -50,
        tickTextColor: "#fff",
      }}
      theme={{
        axis: {
          ticks: {
            text: {
              fill: "#fff",
              fontSize: 12,
            },
          },
          legend: {
            text: {
              fill: "#fff",
              fontSize: 14,
            },
          },
        },
        legends: {
          text: {
            fill: "#fff",
          },
        },
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor="#fff"
      animate={true}
      role="application"
      ariaLabel="Gráfico de barras de ataques por dia"
    />
  );
};

export default BarChart;
