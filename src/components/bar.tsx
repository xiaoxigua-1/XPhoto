import React, { FC } from 'react';
import { appWindow } from '@tauri-apps/api/window';

const Bar: FC = () => {
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
        onClick={async() => {
          await appWindow.isMaximized() ? appWindow.unmaximize() : appWindow.maximize();
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
  );
}

export default Bar;
