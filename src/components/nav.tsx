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

const rightMenuContext = ['Delete', 'Edit'];

const groupName = (name: string) => {
  if (name.length < 4) return name;
  else return name.substring(0, 4);
}

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
    <div className="bg-[#27272c] w-14 h-screen pt-8 flex flex-col overflow-hidden items-center">
      <div className="flex-grow overflow-auto pb-3 w-full">
        {groups.map((group, index) => {
          return (
            <div
              className="w-10 h-10 mt-3 mx-auto flex justify-center items-center rounded-full overflow-hidden select-none cursor-pointer group relative"
              style={{
                backgroundColor: group.color,
              }}
              key={group.name}
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
              {groupName(group.name)}
              <div className="fixed left-14 hidden bg-gray-900 text-white p-2 rounded-md z-10">{group.name}</div>
              <div className="fixed w-3 overflow-hidden hidden left-11 z-10">
                <div className="h-4 bg-gray-900 -rotate-45 transform origin-top-right"></div>
              </div>
            </div>
          );
        })}
      </div>
      <div
        className="absolute flex flex-col select-none cursor-pointer bg-zinc-600 text-xs text-white py-1 rounded-sm shadow-md"
        style={{
          display: rightMenu.hide ? 'none' : 'block',
          top: rightMenu.y,
          left: rightMenu.x
        }}>
        {rightMenuContext.map(context => (
          <div className="hover:bg-blue-600 p-1 px-3" key={context}>{context}</div>
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
