import React, {useState} from 'react';
import addPng from "../../assets/img/add.png";
import Menu from "../Menu";

import './AddButton.scss';


const AddButton = () => {
    const [visiblePopup, setVisiblePopup] = useState(false);

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
                   <input type="text" placeholder="Add name list" className="field"/>
               </div>)
           }
       </div>
    );
};

export default AddButton;