import {
  faDroplet,
  faFireFlameSimple,
  faHeartPulse,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Graph from "./Graph";

interface myProps {
  children?: React.ReactNode;
  number?: number | null;
  state: string;
  onClick: (titleModal: string, unit : string) => void;
}

const StatusChart: React.FC<myProps> = ({
  children,
  number,
  state,
  onClick,
}) => {
  const text = children as string;
  let unit :string;
  let bgColor : string;
  let textColor : string;
  if(children == "Blood Sugar"){
    unit = "mg/dL";
    bgColor = "bg-orange-200";
    textColor = "text-orange-500";
  }else if(children == "Heart Rate"){
    unit = "bpm";
    bgColor = "bg-pink-200";
    textColor = "text-pink-500";
  }else{
    unit = "/72 mmhg";
    bgColor = "bg-sky-200";
    textColor = "text-sky-500";
  }
  return (
    <div className="flex flex-col bg-white p-3 pl-5 rounded-xl gap-3 ">
      <div className="flex items-center gap-3 relative">
        <div className={`${bgColor} py-2 px-3 rounded-lg`}>
          <FontAwesomeIcon
            className={`${textColor} text-xl`}
            icon={
              children == "Blood Sugar"
                ? faFireFlameSimple
                : children == "Heart Rate"
                ? faHeartPulse
                : faDroplet
            }
          />
        </div>
        <p className="text-sm">{children}</p>
        <div
          onClick={() => onClick(text, unit)}
          className="absolute right-0 px-2 py-1 rounded-full text-zinc-600 hover:bg-slate-200 hover:text-black transition-all duration-300 cursor-pointer "
        >
          <FontAwesomeIcon icon={faPenToSquare} className="text-xl " />
        </div>
      </div>
      <div className="">
        <div className="flex items-center">
          <h2 className="text-xl mr-1">{number}</h2>
          <p className="text-sm text-gray-400">{unit}</p>
        </div>
        <div className={`${bgColor} inline-block px-1 rounded-md`}>
          <p className="text-xs">{state}</p>
        </div>
      </div>
      <div>
        <Graph name={children} />
      </div>
    </div>
  );
};

export default StatusChart;
