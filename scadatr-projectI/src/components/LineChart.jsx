import { Box, Typography } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";

const LineChart = ({ data }) => {
  const isValidArray = Array.isArray(data) && data.length > 0;

  if (!isValidArray) {
    return (
      <Box
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        p="20px"
      >
        <Typography variant="h5" color="textSecondary">
          Sem dados suficientes para o gráfico de ataques
        </Typography>
      </Box>
    );
  }

  const chartData = [
    {
      id: "Ataques",
      color: "hsl(210, 70%, 50%)",
      data: data.map((item) => ({
        x: item.date,
        y: item.count,
      })),
    },
  ];

  return (
    <ResponsiveLine
      data={chartData}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: 0,
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Dia",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Nº de Ataques",
        legendOffset: -50,
        legendPosition: "middle",
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
    />
  );
};

export default LineChart;
