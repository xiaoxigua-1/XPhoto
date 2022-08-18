import React, { FC, useState } from 'react';
import File from './file';
import { AiOutlineDown, AiOutlineRight, AiOutlineFolder, AiOutlineFolderOpen } from "react-icons/ai";

export type FileType = 'file' | 'folder';

export interface FolderTreeData {
  name: string;
  path: string;
  fileType: FileType;
  children: FolderTreeData[];
  onRemove?: (path: string) => boolean;
  onCreate?: (path: string) => boolean;
  onEdit?: (path: string) => boolean;
}

const FolderTree: FC<FolderTreeData> = ({ name, children, fileType }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="overflow-hidden pl-1 w-full">
      
      {fileType === 'folder' ? (
        <div
          className="flex flex-row items-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Folder */}
          <div className="text-[#aaaaaa] text-sm">
            {isOpen ? <AiOutlineRight /> : <AiOutlineDown />}
          </div>
          <div className="pl-1 text-white">
            {isOpen ? <AiOutlineFolder /> : <AiOutlineFolderOpen />}
          </div>
          <div className="pl-1 text-white">{name}</div>
        </div>
      ) : (
        <File name={name} type={fileType}/>
      )}
    </div>
  );
};

export default FolderTree;
