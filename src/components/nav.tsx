import React, { FC, useState, useEffect } from 'react';
import { Group } from '../data';
import { AiOutlineSetting } from "react-icons/ai";

interface Nav {
  groups: Group[];
  setGroup: React.Dispatch<React.SetStateAction<Group[]>>;
  setSelectGroup: React.Dispatch<React.SetStateAction<number>>;
  setOpenSetting: React.Dispatch<React.SetStateAction<boolean>>;
}

interface RightMenu {
  x: number;
  y: number;
  hide: boolean;
  index: number;
}

const rightMenuContext = ['Delete', 'Edit']

const Nav: FC<Nav> = ({ groups, setGroup, setSelectGroup, setOpenSetting }) => {
  const [rightMenu, setRightMenu] = useState<RightMenu>({
    x: 0,
    y: 0,
    hide: true,
    index: 0,
  });

  useEffect(() => {
    document.addEventListener('click', () => setRightMenu({
      x: 0,
      y: 0,
      hide: true,
      index: 0,
    }));
  }, []);

  return (
    <div className="bg-27272c w-14 h-screen pt-8 flex flex-col overflow-hidden items-center">
      <div className="flex-grow overflow-auto pb-3 w-full">
        {groups.map((group, index) => {
          return (
            <div
              className="w-10 h-10 mt-3 mx-auto flex justify-center items-center rounded-full select-none overflow-hidden cursor-pointer"
              style={{backgroundColor: group.color}}
              onClick={() => setSelectGroup(index)}
              onContextMenu={(e) => {
                // menu
                setRightMenu({
                  x: e.clientX,
                  y: e.clientY,
                  hide: false,
                  index: index,
                });
                e.preventDefault();
              }}
            >
              {group.name}
            </div>
          )
        })}
      </div>
      <div
        className="absolute flex flex-col select-none cursor-pointer bg-zinc-600 text-xs text-white"
        style={{
          display: rightMenu.hide ? 'none' : 'block',
          top: rightMenu.y,
          left: rightMenu.x
        }}>
        {rightMenuContext.map(context => (
          <div className="hover:bg-blue-600 p-1 px-4">{context}</div>
        ))}
      </div>
      <div className="cursor-pointer my-3"
        onClick={() => setOpenSetting(true)}
      >
        <AiOutlineSetting color={'#ffffff'} size={36}/>
      </div>
    </div>
  );
};

export default Nav;
