import React, { useState, useEffect } from 'react';
import { Group, Settings } from './data';
import Bar from './components/bar';
import Nav from './components/nav';
import Context from './components/context';
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
          folders: [],
        },
        {
          name: 'fooasdasdasdasd',
          color: '#ffffe0',
          folders: [],
        }
      ]);
      setSettings({
        theme: 'default',
      });
      setSelectGroup(0);
    } else {
      // TODO: get database data
      (async() => {
        let config = await invoke('plugin:photo|get_config');
        console.log(config);
      })();
    }

    invoke('plugin:window|close_splashscreen');
    (async () => {
      console.log(await invoke('plugin:photo|get_groups'));
    })();
  }, []);

  return (
    <div className="App w-screen flex">
      <Bar />
      <Nav groups={groups} setGroup={setGroups} setSelectGroup={setSelectGroup} setOpenSetting={setOpenSetting} />
      <Context
        openSetting={openSetting}
        setOpenSetting={setOpenSetting}
        selectGroup={selectGroup}
        settings={settings}
        groups={groups}
      />
    </div>
  );
}

export default App;
