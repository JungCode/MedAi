import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ActivityChart = () => {
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Aerobics",
        data: [11, 21, 4, 6, 15, 7, 13, 16, 2, 7, 15, 12],
        backgroundColor: "rgba(236,72,153,1)",
        borderWidth: 1,
        barThickness: 6,
      },
      {
        label: "Yoga",
        data: [33, 12, 10, 19, 32, 27, 32, 50, 60, 70, 11, 23],
        backgroundColor: "rgba(14,165,233,1)",
        borderWidth: 1,
        barThickness: 6,
      },
      {
        label: "Medication",
        data: [22, 32, 10, 20, 75, 34, 53, 50, 60, 70, 21, 7],
        backgroundColor: "rgba(249,115,22,1)",
        borderWidth: 1,
        barThickness: 4,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Activity Growth",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        grid: {
          display: false,
        },
        min: 0, // Minimum value for y-axis
        max: 100, // Maximum value for y-axis
        ticks: {
          stepSize: 10, // Step size between ticks
          callback: function (tickValue: string | number) {
            return tickValue + "%"; // Add "%" sign behind the tick values
          },
        },
      },
    },
  };
  return (
    <div className="bg-white rounded-xl p-5 flex items-center justify-center h-64 md:h-80 lg:h-96 xl:h-[50vh]">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ActivityChart;
