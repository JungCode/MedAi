import React from "react";

interface myProps {
  children: React.ReactNode;
  helperText?: string;
  onSuggestionClick: (text: string) => void;
}
const Suggestion: React.FC<myProps> = ({
  children,
  helperText,
  onSuggestionClick,
}) => {
  return (
    <div
      onClick={() =>
        onSuggestionClick((children || "") + " " + (helperText || ""))
      }
      className="border-2 rounded-xl p-3 bg-white cursor-pointer hover:bg-gray-200 transition-all duration-300"
    >
      <p>{children}</p>
      <p className="italic text-gray-600 text-sm">{helperText}</p>
    </div>
  );
};

export default Suggestion;
