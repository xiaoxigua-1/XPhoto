import React, { FC } from 'react';
import Setting from '../settings';
import { Group, Settings } from '../../data';

interface Context {
  openSetting: boolean;
  setOpenSetting: React.Dispatch<React.SetStateAction<boolean>>;
  selectGroup: number;
  settings?: Settings;
  groups: Group[];
}

const Context: FC<Context> = ({}) => {
  return (
    <div className="relative w-full h-screen pt-8">
      
    </div>
  );
};

export default Context;
