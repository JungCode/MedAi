import React, { useEffect, useRef, useState } from "react";
import HAndW from "./HAndW";
import BMIStatus from "./BMIStatus";
interface myProps {
  onClick: (titleModal: string, unit: string) => void;
}
const BMI: React.FC<myProps> = ({ onClick }) => {
  const [height, setHeight] = useState<number | null>(null);
  const [weight, setWeight] = useState<number | null>(null);
  const [BMI, setBMI] = useState<number | null>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [divWidth, setDivWidth] = useState<number | null>(null);
  const updateValue = () => {
    const storedHeight = localStorage.getItem("Height");
    const storedWeight = localStorage.getItem("Weight");
    if (storedHeight) {
      setHeight(Number(storedHeight));
    }
    if (storedWeight) {
      setWeight(Number(storedWeight));
    }
    setBMI(
      Math.round(
        (Number(storedWeight) / (Number(storedHeight) / 100) ** 2) * 10
      ) / 10
    );
  };

  const getBmiMessage = () => {
    if (BMI === null) return { message: "", bgColor: "" };

    if (BMI < 18.5) {
      return { message: "Underweight", bgColor: "bg-yellow-200" };
    } else if (BMI >= 18.5 && BMI < 24.9) {
      return { message: "You're Healthy", bgColor: "bg-green-200" };
    } else if (BMI >= 25 && BMI < 29.9) {
      return { message: "Overweight", bgColor: "bg-orange-200" };
    } else {
      return { message: "Obese", bgColor: "bg-red-200" };
    }
  };

  const bmiMessage = getBmiMessage();
  useEffect(() => {
    // Initial load
    updateValue();
    if (divRef.current) {
      setDivWidth(divRef.current.getBoundingClientRect().width);
    }
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
    <>
      <h1 className="text-white text-lg">BMI Calculator</h1>
      <div className="flex gap-3 mt-6 pb-8 mr-5 border-b border-zinc-700">
        <div className="w-1/3 flex flex-col gap-4">
          <HAndW onClick={onClick} text="Height" number={height} />
          <HAndW onClick={onClick} text="Weight" number={weight} />
        </div>
        <BMIStatus BMI={BMI} bmiMessage={bmiMessage} divRef={divRef} divWidth={divWidth} />
      </div>
    </>
  );
};

export default BMI;
