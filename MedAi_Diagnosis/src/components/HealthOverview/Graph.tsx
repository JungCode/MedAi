import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ChartData } from "chart.js";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
interface myProps {
  name: React.ReactNode;
}
const Graph: React.FC<myProps> = ({ name }) => {
  let data: ChartData<"line", number[], string>;
  if (name === "Blood Sugar") {
    data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Monotone",
          data: [28, 48, 40, 19, 86, 27, 90],
          borderColor: "rgba(249, 115, 22, 1)",
          fill: false,
          tension: 0.4,
          cubicInterpolationMode: "monotone", // Monotone interpolation mode
        },
      ],
    };
  } else if (name === "Heart Rate") {
    data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Default",
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: "rgba(236, 72, 153, 1)",
          fill: false,
          tension: 0.4, // Default interpolation mode
        },
      ],
    };
  } else {
    data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Linear",
          data: [18, 48, 77, 9, 100, 27, 40],
          borderColor: "rgba(14, 165, 233, 1)",
          fill: false,
          tension: 0, // Linear interpolation mode
        },
      ],
    };
  }

  const options = {
    plugins: {
      title: {
        display: false, // Hide the title
      },
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        enabled: false, // Disable tooltips
      },
    },
    responsive: true,
    maintainAspectRatio: true, // Maintain aspect ratio
    scales: {
      x: {
        display: false, // Hide the x-axis
      },
      y: {
        display: false, // Hide the y-axis
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default Graph;
