// ../Avatar.jsx
import React from "react";

const Avatar = ({ char }) => {
  return (
    <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold bg-purple-600 text-white border-4 border-purple-400  shadow-lg">
      {char}
    </div>
  );
};

export default Avatar;
