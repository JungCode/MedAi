import React from "react";

interface myProps {
  BMI: number | null;
  bmiMessage: { message: string; bgColor: string } ;
  divRef: React.RefObject<HTMLDivElement>;
  divWidth: number | null;
}

const BMIStatus: React.FC<myProps> = ({BMI, bmiMessage, divRef, divWidth}) => {
  return (
    <div className="w-full min-w-80 bg-neutral-700 rounded-xl px-4 py-3">
      <p className="text-white">Body Mass Index (BMI)</p>
      <div className="grid grid-cols-2 mt-4">
        <p className="text-white text-xl">{BMI}</p>
        <div className="flex items-center justify-center">
          <p
            className={`text-xs rounded-lg px-2 py-1 ${
              typeof bmiMessage === "object" ? bmiMessage.bgColor : ""
            }`}
          >
            {typeof bmiMessage === "object" ? bmiMessage.message : ""}
          </p>
        </div>
      </div>
      <div className="mt-8 ">
        <div className="w-full mb-1" ref={divRef}>
          <div
            className="w-2 h-2 border bg-orange-600 rounded-full transform"
            style={{
              transform: `translateX(${
                BMI && divWidth ? Math.round((BMI / 50) * divWidth) : 0
              }px)`,
            }}
          ></div>
        </div>
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full h-4 rounded-xl"></div>
        <div className="grid grid-cols-5 mt-1">
          <p className="text-white text-xs text-center">15</p>
          <p className="text-white text-xs text-center">18.5</p>
          <p className="text-white text-xs text-center">25</p>
          <p className="text-white text-xs text-center">30</p>
          <p className="text-white text-xs text-center">40</p>
        </div>
      </div>
    </div>
  );
};

export default BMIStatus;
