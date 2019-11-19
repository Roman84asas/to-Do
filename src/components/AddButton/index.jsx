import React, {useState} from 'react';
import addPng from "../../assets/img/add.png";
import cancelPng from "../../assets/img/cancel.png";
import Menu from "../Menu";
import Badge from "../Badge";


import './AddButton.scss';


const AddButton = ({colors}) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [getColor, setColor]            = useState(colors[0].id);

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
                       onClick={() => setVisiblePopup(false)}
                       src       ={cancelPng}
                       alt       ="Close popup"
                       className ="add-list__popup-close-btn"
                   />

                   <input
                       type        ="text"
                       placeholder ="Add name list"
                       className   ="field"
                   />

                   <div className="add-list__popup-colors">
                       <ul>
                           {colors.map((color) => (
                               <li key={color.id}>
                                   <Badge
                                       onClick={() => setColor(color.id)}
                                       color     ={color.name}
                                       className ={getColor === color.id && 'active'}
                                   />
                               </li>
                           ))}
                       </ul>
                   </div>

                   <button className="button">Add list..</button>
               </div>)
           }
       </div>
    );
};

export default AddButton;