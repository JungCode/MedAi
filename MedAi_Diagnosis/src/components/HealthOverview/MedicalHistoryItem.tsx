import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface myProps {
  children: React.ReactNode;
}
const MedicalHistoryItem:React.FC<myProps> = ({children}) => {
  const deleteItemHandler = () => {
    const savedItems = localStorage.getItem("Medical History");
    const items = savedItems ? JSON.parse(savedItems) : [];
    const newItems = items.filter((item: string) => item !== children);
    localStorage.setItem("Medical History", JSON.stringify(newItems));
    const event = new Event("storageChange");
    window.dispatchEvent(event);
  }
  return (
    <div onClick={deleteItemHandler} className="flex items-center transition-all duration-300  cursor-pointer hover:bg-neutral-900 hover:text-white text-neutral-300 bg-neutral-700 rounded-xl px-3 py-1 ">
      <FontAwesomeIcon className="inline-block  mr-2 text-xs" icon={faX} />
      <p className="inline-block text-lg">{children}</p>
    </div>
  );
};

export default MedicalHistoryItem;
