import React from 'react';
import listSvg from './assets/img/list.svg';

import Index from './components/Menu/index';

import './index.scss';

function App() {
  return (
    <div className="todo">
      <div className="todo__sidebar">
        <Index items={[
          {
            id: 1,
            icon: listSvg,
            name: 'All tasks'
          }
        ]} />

        <Index items={[
          {
            id: 1,
            color: 'red',
            name: 'Price'
          }
        ]} />

          <Index items={[
              {
                  id: 1,
                  color: 'yellow',
                  name: 'Front-End'
              }
          ]} />

          <Index items={[
              {
                  id: 1,
                  color: 'green',
                  name: 'Back-End'
              }
          ]} />

        <div className="todo__tasks">asdfdsgdfgh</div>
      </div>      
    </div>
  );
}

export default App;
