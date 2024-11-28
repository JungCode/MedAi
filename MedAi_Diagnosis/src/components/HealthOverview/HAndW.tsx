import React from "react";

interface myProps {
  text: string;
  number: number | null;
  onClick: (titleModal: string, unit : string) => void;

}
const HAndW: React.FC<myProps> = ({ text, number, onClick }) => {
  let unit;
  let bgColor;
  if(text == "Height"){
    unit = "cm";
    bgColor = "bg-orange-200 hover:bg-orange-400";
  }else{
    unit = "kg";
    bgColor = "bg-sky-200 hover:bg-sky-400";
  }
  return (
    <div onClick={()=> onClick(text, unit)}
      className={`flex items-center justify-end text-gray-700 hover:text-black cursor-pointer ${bgColor} rounded-xl p-4 min-w-44 h-20 transition-all duration-300`}
    >
      <div className="flex flex-col items-end w-full">
        <div className="relative h-4 w-24 flex items-center ">
          <div className="absolute inset-0 flex justify-between w-full">
            <span className="w-[1px] h-full bg-gray-400"></span>
            <span className="w-[1px] h-full bg-gray-500"></span>
            <span className="w-[1px] h-full bg-gray-500"></span>
            <span className="w-[1px] h-full bg-gray-600"></span>
            <span className="w-[1px] h-full bg-gray-700"></span>
            <span className="w-[1px] h-full bg-gray-600"></span>
            <span className="w-[1px] h-full bg-gray-600"></span>
            <span className="w-[1px] h-full bg-gray-500"></span>
            <span className="w-[1px] h-full bg-gray-400"></span>
          </div>
          <div className="absolute left-1/2 top-0 transform -translate-x-1/2 h-7 w-[2px] bg-red-500"></div>
        </div>
        <div className="w-full grid grid-cols-2 pr-3">
          <div className="text-lg  mt-2 inline-block mr-10">{text}</div>
          <div className="text-lg text-gray-800 mt-2 flex justify-end">
            {number} {unit}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HAndW;
