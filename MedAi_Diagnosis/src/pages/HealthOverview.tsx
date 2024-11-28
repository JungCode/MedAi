import React, { useState, useRef, useEffect } from "react";
import Header from "../components/HealthOverview/Header";
import StatusCharts from "../components/HealthOverview/StatusCharts";
import ActivityChart from "../components/HealthOverview/ActivityChart";
import BMI from "../components/HealthOverview/BMI";
import MedicalHistory from "../components/HealthOverview/MedicalHistory";
import Modal from "../components/Modal";
import ModalContent from "../components/ModalContent";

const HealthOverview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalName, setmodalName] = useState("");
  const [modalTitle, setmodalTitle] = useState("");
  const [modalInput, setModalInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const openModal = (titleModal: string, unit: string) => {
    if (unit == "") setmodalName(titleModal);
    else setmodalName(titleModal + ` (${unit})`);
    setmodalTitle(titleModal);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isModalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isModalOpen]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModalInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log(modalTitle);
      if(modalTitle != "Medical History") {
        localStorage.setItem(modalTitle, modalInput);
      }else{
        console.log(123);
        const savedItems = localStorage.getItem("Medical History");
        const items = savedItems ? JSON.parse(savedItems) : [];
        items.push(modalInput);
        localStorage.setItem("Medical History", JSON.stringify(items));
      }
      const event = new Event("storageChange");
      window.dispatchEvent(event);
      setModalInput("");
      closeModal();
    }
  };

  return (
    <div className=" flex h-screen justify-end bg-blue-50 ml-16 w-full">
      <div className="h-full block w-full pt-8 px-7">
        <Header />
        <StatusCharts onClick={openModal} />
        <ActivityChart />
      </div>
      <div className="h-full bg-zinc-800 w-3/4 rounded-l-3xl pt-9 pl-7 pb-3 fade-in">
        <BMI onClick={openModal} />
        <MedicalHistory onClick={openModal} />
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalContent
          inputHandler={inputHandler}
          inputRef={inputRef}
          handleKeyDown={handleKeyDown}
          modalName={modalName}
          modalInput={modalInput}
        />
      </Modal>
    </div>
  );
};

export default HealthOverview;
