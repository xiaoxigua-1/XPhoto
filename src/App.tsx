import React, { useState, useEffect } from 'react';
import { Group, Settings } from './data';
import Bar from './components/bar';
import Nav from './components/nav';
import Setting from './components/settings';
import { invoke } from '@tauri-apps/api/tauri';

function App() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectGroup, setSelectGroup] = useState<number>(0);
  const [settings, setSettings] = useState<Settings>();
  const [openSetting, setOpenSetting] = useState(false);

  useEffect(() => {
    if (import.meta.env.DEV) {
      setGroups([
        {
          name: 'foo',
          color: '#ffffff',
        },
        {
          name: 'fooasdasdasdasd',
          color: '#ffffe0',
        }
      ]);
      setSettings({
        theme: 'default',
      });
      setSelectGroup(0);
    } else {
      // TODO: get database data
    }

    invoke('plugin:window|close_splashscreen')
  }, []);

  return (
    <div className="App w-screen">
      <Bar />
      <Nav groups={groups} setGroup={setGroups} setSelectGroup={setSelectGroup} setOpenSetting={setOpenSetting} />
      {openSetting ? <Setting /> : null}
    </div>
  );
}

export default App;
