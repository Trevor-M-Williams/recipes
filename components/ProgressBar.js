import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div className="h-2 w-full rounded-full bg-gray-200 mb-4">
      <div
        style={{ width: `${progress}%` }}
        className="h-full rounded-full bg-blue-500 transition-all duration-500 ease-in-out"
      />
    </div>
  );
};

export default ProgressBar;
