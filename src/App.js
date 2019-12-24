import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from './components/Menu';
import AddButton from "./components/AddButton";
import Tasks from "./components/Tasks";
import listSvg from './assets/img/list.svg'





import './index.scss';


function App() {


const [lists, setLists] = useState(
    db.lists.map(item => {
        item.color = db.colors.filter(color => color.id === item.colorId)[0].name;
        return item;
    }
));

const[colors, setColors] = useState(null);

useEffect(() => {
    axios.get('http://localhost:3001/lists?_expand=colors').then(({data}) => {
        setLists(data);
    });
    axios.get('http://localhost:3001/colors').then(({data}) => {
        setColors(data);
    });
}, []);


const onAddList = (obj) => {
    const newList = [
        ...lists,
        obj
    ];
    setLists(newList);
};

    return (

        <div className="todo">
            <div className="todo__sidebar">
                <Menu
                    items={[
                        {
                            id: 100,
                            icon: listSvg,
                            name: 'All tasks',
                        }
                    ]}
                />

                <Menu
                    items={lists}
                    isRemovable={true}
                    onRemove={(item) => {}}
                />

                <AddButton
                    onAdd={onAddList}
                    colors={colors}
                />
            </div>

            <div className="todo__tasks">
                <Tasks

                />
            </div>

        </div>

    );
}

export default App;
