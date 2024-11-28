import React, { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";
import logo from "../../assets/logo.png";

interface myProps {
  children: React.ReactNode;
  hasAnimated?: boolean;
}

const ChatText: React.FC<myProps> = ({ children, hasAnimated }) => {

  return (
    <div className="py-2 w-full px-4 flex gap-3 justify-start mt-8">
      <div className="h-full">
        <div className="w-6 h-6 rounded-full">
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div className="max-w-full">
        <div className="text-lg w-full break-words whitespace-pre-wrap">
          {hasAnimated ? (
            <Typewriter
              options={{
                autoStart: true,
                loop: false,
                delay: 10,
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString(children as string)
                  .callFunction(() => {
                  })
                  .start();
              }}
            />
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatText;