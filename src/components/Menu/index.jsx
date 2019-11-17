import React from 'react';
import classNames from 'classnames';

import './menu.scss';


const Menu = ({items, isRemovable, onClick}) => {
    return (
        <ul onClick={onClick} className="list">
            {
                items.map((item) => (
                    <li className={classNames(item.className, {'active': item.active})} key={item.id}>
                        <i>
                            {item.icon ? (
                                <img src={item.icon} alt="Img list"/>
                            ) : (
                                <i className={`badge badge--${item.color}`}></i>
                            )}
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