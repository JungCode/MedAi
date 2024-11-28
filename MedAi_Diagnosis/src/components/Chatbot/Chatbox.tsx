import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";
import Suggestion from "./Suggestion";

interface myProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSuggestionClick: (text: string) => void;
  onClick: (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => void;
  noMessage?: boolean;
}

const Chatbox: React.FC<myProps> = ({
  value,
  onChange,
  onClick,
  onSuggestionClick,
  noMessage,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      if (textareaRef.current.scrollHeight > 384) {
        // 384px corresponds to h-96
        textareaRef.current.style.height = "24rem"; // 24rem corresponds to h-96
        textareaRef.current.style.overflowY = "auto"; // Enable vertical scroll if max height is reached
      } else {
        textareaRef.current.style.overflowY = "hidden"; // Hide vertical scroll if below max height
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onClick(e as unknown as React.FormEvent<HTMLFormElement>);
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"; // Reset the height
      }
    }
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    onClick(e);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset the height
    }
  };

  return (
    <div className="fixed transform left-1/2 -translate-x-1/2 bottom-0 w-1/2 px-4 z-50">
      <div className="grid grid-cols-2 gap-3 mb-2">
        {noMessage && (
          <>
            <Suggestion
              onSuggestionClick={onSuggestionClick}
              helperText={"of my status"}
            >
              Evaluate health
            </Suggestion>
            <Suggestion
              onSuggestionClick={onSuggestionClick}
              helperText={"of my status"}
            >
              Evaluate health
            </Suggestion>
          </>
        )}
      </div>
      <div className="bg-sky-50 pb-4">
        <form onSubmit={handleSubmit}>
          <textarea
            ref={textareaRef}
            name=""
            id=""
            value={value}
            onChange={onChange}
            placeholder="Send a message..."
            className="bg-white border-2 resize-none rounded-lg w-full min-h-20 p-2"
            onInput={handleInput}
            onKeyDown={handleKeyDown}
          ></textarea>
          <button className="absolute right-6 bottom-5" type="submit">
            <FontAwesomeIcon
              icon={faCircleArrowUp}
              className="text-2xl text-blue-600 hover:text-blue-800"
            />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbox;
