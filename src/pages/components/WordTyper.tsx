import React, { useState } from 'react';

interface WordTyperProps {
  inputValue: string;
  handleInputChange: (event: any) => void;
  handleEnterPress: (event: any) => void;
}

const WordTyper: React.FC<WordTyperProps> = ( {inputValue, handleInputChange, handleEnterPress } ) => {
  return (
    <div className="flex justify-center items-center my-4">
      <input
        className="h-12 w-80 rounded-xl bg-cyan-900 text-xl text-white font-semibold pl-4 border-2"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleEnterPress}
      />
    </div>
  );
};

export default WordTyper;