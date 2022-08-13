import React, { useState, useEffect } from 'react';
import { Group } from './data';
import Bar from './components/bar';
import Nav from './components/nav';

function App() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectGroup, setSelectGroup] = useState<string>('');

  useEffect(() => {
    if (import.meta.env.DEV) {
      setGroups([
        {
          name: 'foo',
          color: '#ffffff',
        },
        {
          name: 'foo',
          color: '#ffffe0',
        },
        {
          name: 'foo',
          color: '#ffffe0',
        },
        {
          name: 'foo',
          color: '#ffffe0',
        },
        {
          name: 'foo',
          color: '#ffffe0',
        },
        {
          name: 'foo',
          color: '#ffffe0',
        },
        {
          name: 'foo',
          color: '#ffffe0',
        },
        {
          name: 'foo',
          color: '#ffffe0',
        },
        {
          name: 'foo',
          color: '#ffffe0',
        },
        {
          name: 'foo',
          color: '#ffffe0',
        },
        {
          name: 'foo',
          color: '#ffffe0',
        },
        {
          name: 'foo',
          color: '#ffffe0',
        },
        {
          name: 'foo',
          color: '#ffffe0',
        },
        {
          name: 'foo',
          color: '#ffffe0',
        },
        {
          name: 'foo',
          color: '#ffffe0',
        },
        {
          name: 'foo',
          color: '#ffffe0',
        },
        {
          name: 'foo',
          color: '#ffffe0',
        },
        {
          name: 'foo',
          color: '#ffffe0',
        }
      ]);
      setSelectGroup('foo');
    } else {
      // TODO: get database data
    }
  }, []);

  return (
    <div className="App w-screen">
      <Bar />
      <Nav groups={groups} setGroup={setGroups} setSelectGroup={setSelectGroup} />
    </div>
  );
}

export default App;
