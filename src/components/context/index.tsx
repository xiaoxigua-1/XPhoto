import React, { FC, useState, useEffect } from 'react';
import Setting from '../settings';
import FolderTree, { FolderTreeData } from './folderTree';
import { Group, Settings } from '../../data';
import testData from './test_data.json';

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
  const [folderTreeMove, setFolderTreeMove] = useState<FileTree>({
    width: 130,
    move: false,
  });
  const [folderTree, setFolderTree] = useState<FolderTreeData>();

  useEffect(() => {
    if (import.meta.env.DEV) {
      setFolderTree(testData.folders as FolderTreeData);
    } else {
      // TODO: get database
    }
  }, []);

  return (
    <div 
      className="relative w-full h-screen pt-8 flex select-none"
      id="folders"
      onMouseMove={(event) => {
        if (folderTreeMove.move) {
          let width = Math.min(400, Math.max(130, event.clientX - 50));
          setFolderTreeMove({
            width: width,
            move: true,
          });
        }
      }}
      onMouseUp={() => {
        setFolderTreeMove({
          move: false,
          width: folderTreeMove.width,
        });
      }}
    >
      <div className="h-full relative bg-[#2f2f33]" style={{ width: folderTreeMove.width }}>
        <div className="text-xs p-3 text-white">Folders</div>
        <FolderTree {...folderTree!!} />
        <div
          className="absolute right-0 w-1 h-full cursor-ew-resize top-0"
          onMouseDown={() => setFolderTreeMove({
            move: true,
            width: folderTreeMove.width
          })}
        />
      </div>
      <div>

      </div>
    </div>
  );
};

export default Context;
