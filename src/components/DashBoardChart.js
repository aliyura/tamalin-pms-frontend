import { useState } from "react";
import Chart from "react-apexcharts";

const DashboardChart = ({ chartData }) => {
  const inventoryChartSeries = [
    {
      name: "Inventory Analytics",
      data: Object.values(chartData),
    },
  ];

  const [inventoryChartOptions, setInventoryChartOptions] = useState({
    xaxis: {
      categories: ["Clients", "Contracts", "Vehicles", "Payments"],
    },
    chart: {
      id: "inventory-analytics",
      background: "#f6c769",
      offsetX: 0,
      offsetY: 0,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: false,
          customIcons: [],
        },
      },
    },
  });

  return (
    <Chart
      options={inventoryChartOptions}
      series={inventoryChartSeries}
      type="bar"
      width={100 + "%"}
      height={80 + "%"}
    />
  );
};

export default DashboardChart;
