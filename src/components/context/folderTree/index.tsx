import React, { FC, useState } from 'react';
import File from './file';
import { AiOutlineDown, AiOutlineRight, AiOutlineFolder, AiOutlineFolderOpen } from "react-icons/ai";

export type FileType = 'folder'
  | 'file'
  | 'image';

export interface FolderTreeData {
  name: string;
  path: string;
  fileType: FileType;
  children: FolderTreeData[];
  onRemove?: (path: string) => boolean;
  onCreate?: (path: string) => boolean;
  onEdit?: (path: string) => boolean;
}

const FolderTree: FC<FolderTreeData> = ({ name, children, fileType, path }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="overflow-hidden pl-1 w-full">

      {fileType === 'folder' ? (
        <div
          draggable="true"
        >
          {/* Folder */}
          <div
            className="flex flex-row items-center cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="text-[#aaaaaa] text-sm">
              {isOpen ? <AiOutlineDown /> : <AiOutlineRight />}
            </div>
            <div className="pl-1 text-white">
              {isOpen ? <AiOutlineFolderOpen /> : <AiOutlineFolder />}
            </div>
            <div className="pl-1 text-white text-sm">{name}</div>
          </div>
          {/* Folder children */}
          <div
            className="transition-all transition-duration ml-1 pl-2 border-l-[1px] border-slate-500"
            style={{ height: isOpen ? 'auto' : '0' }}
          >
            {children.map(child => <FolderTree {...child} key={child.path} />)}
          </div>
        </div>
      ) : (
        <File name={name} type={fileType} path={path} />
      )}
    </div>
  );
};

export default FolderTree;
