import React from "react";

interface myProps{
  modalName: string;
  modalInput: string;
  inputRef: React.RefObject<HTMLInputElement>;
  inputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
const ModalContent:React.FC<myProps> = ({modalName, inputHandler, inputRef, modalInput, handleKeyDown}) => {
  return (
    <>
      <h2 className="text-xl font-medium mb-4">{modalName}</h2>
      <input
        ref={inputRef}
        className="border-2 rounded-md px-2 py-1 w-full"
        value={modalInput}
        onChange={inputHandler}
        onKeyDown={handleKeyDown}
        type="text"
      />
    </>
  );
};

export default ModalContent;
