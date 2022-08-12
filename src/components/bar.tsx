import React, { FC, useState } from 'react';
import { appWindow } from '@tauri-apps/api/window';

const Bar: FC = () => {
  const [isWindowMax, setIsWindowMax] = useState(true);

  return (
    <div data-tauri-drag-region className="h-8 bg-toolbar select-none flex justify-content justify-end">
      <div className="titlebar-button"
        onClick={() => {
          appWindow.minimize();
        }}
      >
        <img
          src="/public/mdi_window-minimize.svg"
          alt="minimize"
        />
      </div>
      <div className="titlebar-button"
        onClick={() => {
          isWindowMax ? appWindow.unmaximize() : appWindow.maximize();

          setIsWindowMax(!isWindowMax);
        }}
      >
        <img
          src="/public/mdi_window-maximize.svg"
          alt="maximize"
        />
      </div>
      <div className="titlebar-button"
        onClick={() => {
          appWindow.close();
        }}
      >
        <img src="/public/mdi_close.svg" alt="close" />
      </div>
    </div>
  )
}

export default Bar;
