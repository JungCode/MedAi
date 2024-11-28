import React from "react";

interface UserTextProps {
  children: React.ReactNode;
}

const UserText: React.FC<UserTextProps> = ({ children }) => {
  return (
    <div className="w-full flex justify-end mt-8 ">
      <p className="bg-blue-500 text-white text-lg rounded-3xl py-2 px-4 inline-block max-w-md fade-in">
        {children}
      </p>
    </div>
  );
};

export default UserText;
