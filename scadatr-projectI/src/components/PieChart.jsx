import { ResponsivePie } from "@nivo/pie";

const PieChart = ({ data }) => {
  const total = Object.values(data).reduce((sum, count) => sum + count, 0);
  if (!data || total === 0) {
    return <div>Sem dados suficientes para o gráfico de severidade.</div>;
  }

  // Formatar o objeto {data} para o formato de pie chart
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
