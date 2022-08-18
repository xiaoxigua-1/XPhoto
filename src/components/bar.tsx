import React, { FC } from 'react';
import { appWindow } from '@tauri-apps/api/window';

const Bar: FC = () => {
  return (
    <div data-tauri-drag-region className="h-8 bg-[#353438] select-none flex justify-content justify-end z-10 fixed top-0 left-0 right-0">
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
        onClick={async() => {
          await appWindow.isMaximized() ? appWindow.unmaximize() : appWindow.maximize();
        }}
      >
        <img
          src="/public/mdi_window-maximize.svg"
          alt="maximize"
        />
      </div>
      <div className="titlebar-button hover:bg-red-500"
        onClick={() => {
          appWindow.close();
        }}
      >
        <img src="/public/mdi_close.svg" alt="close" />
      </div>
    </div>
  );
}

export default Bar;
