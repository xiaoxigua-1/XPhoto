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

function FolderTree({ name, children, fileType, path, onRemove, onCreate, onEdit }: FolderTreeData) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  return (
    <div
      className="overflow-hidden w-full"
    >
      {fileType === 'folder' ? (
        <div
          draggable="true"
          onDragOver={(e) => {
            if (e.dataTransfer.getData('text/plain') !== `${path}/${name}/`) {
              setIsDragOver(true);
            }
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={() => setIsDragOver(false)}
        >
          {/* Folder */}
          <div
            className="flex flex-row items-center cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            style={{ backgroundColor: isDragOver ? "#3333ff22" : "transparent" }}
          >
            <div className="text-[#aaaaaa] text-sm">
              {isOpen ? <AiOutlineDown /> : <AiOutlineRight />}
            </div>
            <div className="pl-1 text-white">
              {isOpen ? <AiOutlineFolderOpen /> : <AiOutlineFolder />}
            </div>
            <div className="pl-1 text-white text-sm">{name}</div>
          </div>

        </div>
      ) : (
        <File name={name} type={fileType} path={path} />
      )}

      {/* Folder children */}
      {fileType === 'folder' ? (
        <div
          className="pl-2 border-l-[1px] border-slate-500"
          style={{ height: isOpen ? 'auto' : '0', backgroundColor: isDragOver ? '#3333ff22' : 'transparent' }}
        >
          {children.map(
            child => <FolderTree
              {...child}
              key={`${child.path}/${child.name}`}
              onCreate={onCreate}
              onEdit={onEdit}
              onRemove={onRemove}
            />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default FolderTree;
