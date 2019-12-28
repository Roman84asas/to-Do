import React, {useState, useEffect} from 'react';
import axios from 'axios';
import addPng from "../../assets/img/add.png";
import cancelPng from "../../assets/img/cancel.png";
import Menu from "../Menu";
import Badge from "../Badge";


import './AddButton.scss';


const AddButton = ({colors, onAdd}) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [inputValue, setInputValue]     = useState('');
    const [getColor, setColor]            = useState(3);
    const [isLoading, setIsLoading]       = useState(false);

    useEffect(() => {
        if (Array.isArray(colors)) {
            setColor(colors[0].id);
        }
    }, [colors]);


    const onClose = () => {
        setVisiblePopup(false);
        setInputValue("");
        setColor(colors[0].id);
    };

    const addList = () => {
        if(!inputValue) {
            alert('Enter list`s name');
            return;
        }

        setIsLoading(true);

        axios
            .post('http://localhost:3001/lists', {
                name: inputValue,
                colorId: getColor
            })
            .then(({data}) => {
                const color   = colors.filter(color => color.id === getColor)[0].name;
                const listObj = {...data, color: {name:color}};
                onAdd(listObj);
                onClose();
            })
            .catch(() => {
                alert('Error add list..');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
       <div className="add-list">
           <Menu
               items={[
                   {
                       id: 3,
                       icon: addPng,
                       name: 'Add new list',
                       className: 'list__add-button'
                   }
               ]}
               onClick={() =>{
                   setVisiblePopup(!visiblePopup);
               }}
           />
           {visiblePopup &&
               ( <div className="add-list__popup">
                   <img
                       onClick   ={onClose}
                       src       ={cancelPng}
                       alt       ="Close popup"
                       className ="add-list__popup-close-btn"
                   />

                   <input
                       value       ={inputValue}
                       type        ="text"
                       placeholder ="Add name list"
                       className   ="field"
                       onChange    ={e => setInputValue(e.target.value)}
                   />

                   <div className="add-list__popup-colors">
                       <ul>
                           {colors.map((color) => (
                               <li key={color.id}>
                                   <Badge
                                       onClick   ={() => setColor(color.id)}
                                       color     ={color.name}
                                       className ={getColor === color.id && 'active'}
                                   />
                               </li>
                           ))}
                       </ul>
                   </div>

                   <button
                       onClick   ={addList}
                       className ="button">
                       {isLoading ? 'Adding...' : 'Add list..'}
                   </button>
               </div>)
           }
       </div>
    );
};

export default AddButton;