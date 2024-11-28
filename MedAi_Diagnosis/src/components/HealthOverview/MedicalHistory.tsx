import { faPenToSquare, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import MedicalHistoryItem from "./MedicalHistoryItem";

interface myProps {
  onClick: (titleModal: string, unit: string) => void;
}
const MedicalHistory: React.FC<myProps> = ({ onClick }) => {
  const [items, setItems] = useState([] as string[]);

  const updateValue = () => {
    const storedItems = localStorage.getItem("Medical History");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
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
    <div className="mt-6">
      <div className="relative">
        <p className="text-white text-lg">Medical History</p>
        <div
          onClick={() => onClick("Medical History", "")}
          className="absolute top-0 left-36 px-2 py-1 rounded-full text-gray-400 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer "
        >
          <FontAwesomeIcon icon={faPenToSquare} className="text-xl " />
        </div>
      </div>
      <div className="flex gap-3 flex-wrap pt-4">
        {items.map((item: string, index: number) => (
          <MedicalHistoryItem key={index}>{item}</MedicalHistoryItem>
        ))}
      </div>
    </div>
  );
};

export default MedicalHistory;
