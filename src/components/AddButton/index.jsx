import React, {useState} from 'react';
import addPng from "../../assets/img/add.png";
import cancelPng from "../../assets/img/cancel.png";
import Menu from "../Menu";
import Badge from "../Badge";


import './AddButton.scss';


const AddButton = ({colors, onAdd}) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [inputValue, setInputValue]     = useState('');
    const [getColor, setColor]            = useState(colors[0].id);

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
        const color = colors.filter(color => color.id === getColor)[0].name;
        onAdd({id: Math.random(), name: inputValue, color: color});
        onClose();
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
                       onClick  ={addList}
                       className="button">
                       Add list..
                   </button>
               </div>)
           }
       </div>
    );
};

export default AddButton;