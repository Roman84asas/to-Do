import React from 'react';
import axios from 'axios';

import classNames from 'classnames';
import Badge from "../Badge";
import removePng from "../../assets/img/remove.png";

import './menu.scss';

const Menu = ({items, isRemovable, onClick, onRemove}) => {

    const removeList = (item) => {
        if (window.confirm('Do You really want to remove the list?')) {
            axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
                onRemove(item.id);
            });
        }
    };

    return (
        <ul onClick={onClick} className="list" >
            {items.map((item) => (
                <li className={classNames(item.className, {'active': item.active})} key={item.id}>
                    <i>
                        {item.icon ? (
                            <img src={item.icon} alt="Img list"/>
                        ) : (
                            <Badge color={item.color.name}/>
                        )}
                    </i>

                    <span>
                        {item.name}
                    </span>

                    {isRemovable &&
                    <img
                        onClick    ={() => removeList(item)}
                        className  ="list__remove-icon"
                        src        ={removePng} alt="Remove icon"
                    />}
                </li>
            ))}
        </ul>
    )
};

export default Menu;