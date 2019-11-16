import React from 'react';

import './menu.scss';


const Menu = ({items}) => {
    return (
        <ul className="todo__list">
            {
                items.map((item) => (
                    <li className="active" key={item.id}>
                        <i>
                            {item.icon ? <img src={item.icon} alt="mage from list tasks"/> : <i className={`badge badge--${item.color}`}></i>}
                        </i>

                        <span>
                            {item.name}
                        </span>
                    </li>
                ))
            }
        </ul>
    )
};

export default Menu;