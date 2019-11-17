import React from 'react';
import listSvg from './assets/img/list.svg';

import Menu from './components/Menu';

import './index.scss';
import AddButton from "./components/AddButton";

function App() {


    return (

        <div className="todo">
            <div className="todo__sidebar">
                <Menu
                    items={[
                        {
                            id: 1,
                            icon: listSvg,
                            name: 'All tasks',
                        }
                    ]}
                />

                <Menu
                    items={[
                        {
                            id: 2,
                            color: 'red',
                            name: 'Price',
                            active: true
                        },
                        {
                            id: 13,
                            color: 'blue',
                            name: 'Front-End'
                        },
                        {
                            id: 4,
                            color: 'green',
                            name: 'Back-End'
                        },
                        {
                            id: 5,
                            color: 'yellow',
                            name: 'Tasks'
                        }
                    ]}
                 isRemovable={true}
                />

                <AddButton/>
            </div>


        </div>

    );
}

export default App;
