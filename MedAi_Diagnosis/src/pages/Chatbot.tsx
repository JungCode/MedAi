import React, { useEffect, useRef, useState } from "react";
import Chatbox from "../components/Chatbot/Chatbox";
import UserText from "../components/Chatbot/UserText";
import ChatText from "../components/Chatbot/ChatText";
import { getDoctorAdvice, prepareData } from "../api";

interface Message {
  message: string;
  sender: string;
}

const Chatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [conversation, setConversation] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };

  const handleInputClick = (text: string) => {
    setUserInput(text);
    handleSubmit(text);
  };

  const handleSubmit = async (
    message:
      | string
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    let userMessage = "";
    if (typeof message === "string") {
      userMessage = message;
    } else {
      message.preventDefault();
      userMessage = userInput;
    }

    if (userMessage.trim()) {
      const newConversation = [
        ...conversation,
        { message: userMessage, sender: "user" },
      ];
      setConversation(newConversation);
      setUserInput("");

      // Call API
      try {
        await getDoctorAdvice(userMessage, setConversation);
      } catch (error) {
        setConversation((prevConversation) => [
          ...prevConversation,
          { message: "An error occurred while getting advice.", sender: "AI" },
        ]);
      }
    }
  };

  useEffect(() => {

    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);
  useEffect(() => {
    const height = localStorage.getItem("Height");
    const weight = localStorage.getItem("Weight");
    const bloodPressure = localStorage.getItem("Blood Pressure");
    const heartRate = localStorage.getItem("Heart Rate");
    const bloodSugar = localStorage.getItem("Blood Sugar");

    const medicalHistory = localStorage.getItem("MedicalHistory");
    const medicalHistoryArray = medicalHistory
      ? JSON.parse(medicalHistory)
      : [];
    const medicalHistoryString = medicalHistoryArray.join(", ");
    prepareData(
      `For context, my height is ${height} cm, weight is ${weight} kg, and I have a ${medicalHistoryString} medical history. My current blood pressure is ${bloodPressure} mmHg, heart rate is ${heartRate} bpm, and blood sugar is ${bloodSugar} mg/dL.`
    );
  }, []);

  return (
    <div className="flex justify-center bg-blue-50 w-screen">
      <div className="flex-row min-h-screen relative w-2/5 ">
        <Chatbox
          value={userInput}
          onChange={handleInputChange}
          onClick={handleSubmit}
          onSuggestionClick={handleInputClick}
          noMessage={conversation.length === 0}
        />
        <div className="flex-col pt-16 pb-48 ">
          {!conversation.length && (
            <ChatText hasAnimated={true}>
              Hi there! I'm your personal health assistant. How can I help you?
            </ChatText>
          )}
          {conversation.map((message, index) =>
            message.sender === "AI" ? (
              <ChatText key={index}>{message.message}</ChatText>
            ) : (
              <UserText key={index}>{message.message}</UserText>
            )
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
