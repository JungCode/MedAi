import React, { useEffect, useState } from "react";
import StatusChart from "./StatusChart";

interface StatusChartsProps {
  onClick: (titleModal: string, unit: string) => void;
}

const StatusCharts: React.FC<StatusChartsProps> = ({ onClick }) => {
  const [bloodSugar, setBloodSugar] = useState<number | null>(null);
  const [heartRate, setHeartRate] = useState<number | null>(null);
  const [bloodPressure, setBloodPressure] = useState<number | null>(null);

  const updateValue = () => {
    const storedBloodSugar = localStorage.getItem("Blood Sugar");
    const storedHeartRate = localStorage.getItem("Heart Rate");
    const storedBloodPressure = localStorage.getItem("Blood Pressure");
    if (storedBloodSugar) {
      setBloodSugar(Number(storedBloodSugar));
    }
    if (storedBloodSugar) {
      setHeartRate(Number(storedHeartRate));
    }
    if (storedBloodSugar) {
      setBloodPressure(Number(storedBloodPressure));
    }
  };

  useEffect(() => {
    // Initial load
    updateValue();

    // Listen for custom storage changes
    const handleStorageChange = () => {
      updateValue();
    };

    window.addEventListener("storageChange", handleStorageChange);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("storageChange", handleStorageChange);
    };
  }, []);

  return (
    <div className="grid grid-cols-3 my-6 gap-10">
      <StatusChart onClick={onClick} state="Normal" number={bloodSugar}>
        Blood Sugar
      </StatusChart>
      <StatusChart onClick={onClick} state="Normal" number={heartRate}>
        Heart Rate
      </StatusChart>
      <StatusChart onClick={onClick} state="Normal" number={bloodPressure}>
        Blood Pressure
      </StatusChart>
    </div>
  );
};

export default StatusCharts;
