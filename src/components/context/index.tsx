import React, { FC, useState, useEffect } from 'react';
import Setting from '../settings';
import { Group, Settings } from '../../data';

interface Context {
  openSetting: boolean;
  setOpenSetting: React.Dispatch<React.SetStateAction<boolean>>;
  selectGroup: number;
  settings?: Settings;
  groups: Group[];
}

interface FileTree {
  width: number;
  move: boolean;
}

const Context: FC<Context> = ({ }) => {
  const [fileTree, setFileTree] = useState<FileTree>({
    width: 130,
    move: false,
  });

  return (
    <div className="relative w-full h-screen pt-8 flex"
      onMouseMove={(event) => {
        if (fileTree.move) {
          let width = event.clientX - 50;
          width = Math.max(130, width);
          width = Math.min(400, width);
          setFileTree({
            width: width,
            move: true,
          });
        }
      }}
      onMouseUp={() => {
        setFileTree({
          move: false,
          width: fileTree.width,
        });
      }}
    >
      <div className="h-full relative" style={{ width: fileTree.width }}>
        <div
          className="absolute right-0 w-1 h-full bg-black cursor-ew-resize"
          onMouseDown={() => {
            let cloneFileTree = {...fileTree};
            cloneFileTree.move = true;
            setFileTree(cloneFileTree);
            console.log(cloneFileTree);
          }}
        />
      </div>
      <div>

      </div>
    </div>
  );
};

export default Context;
