import React, { FC } from 'react';
import { Group } from '../data';
import { AiOutlineSetting } from "react-icons/ai";

interface Nav {
  groups: Group[];
  setGroup: React.Dispatch<React.SetStateAction<Group[]>>;
  setSelectGroup: React.Dispatch<React.SetStateAction<number>>;
  setOpenSetting: React.Dispatch<React.SetStateAction<boolean>>;
}

const Nav: FC<Nav> = ({ groups, setGroup, setSelectGroup, setOpenSetting }) => {
  return (
    <div className="bg-27272c w-14 h-screen pt-8 flex flex-col overflow-hidden items-center">
      <div className="flex-grow overflow-auto pb-3 w-full">
        {groups.map((group) => {
          return (
            <div className="w-10 h-10 mt-3 mx-auto flex justify-center items-center rounded-full select-none overflow-hidden cursor-pointer" style={{backgroundColor: group.color}}>
              {group.name}
            </div>
          )
        })}
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
