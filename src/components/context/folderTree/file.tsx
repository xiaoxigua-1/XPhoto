import React, { FC } from 'react';
import { AiFillFileText, AiFillFileImage } from "react-icons/ai";

interface File {
  name: string;
  type: string;
  path: string;
}

const File: FC<File> = ({ name, type, path }) => {
  return (
    <div
      className="flex items-center cursor-pointer"
      draggable="true"
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', path);
      }}
    >
      <div className="text-white">
        {type === 'image' ? <AiFillFileImage /> :<AiFillFileText />}
      </div>
      <div className="text-white text-sm p-1">{name}</div>
    </div>
  );
};

export default File;
