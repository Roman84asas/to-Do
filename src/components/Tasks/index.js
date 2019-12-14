import React from 'react';
import editSvg from "../../assets/img/edit.svg"

import './Tasks.scss';

const Tasks = () => {

    return(
        <div className="tasks">
            <h2 className="tasks__title">
                Price
                <img src={editSvg} alt="Edit"/>
            </h2>
        </div>
    )
};

export default  Tasks;