import React from 'react';
import axios from 'axios';


import AddTaskForm from './AddTaskForm';


import editSvg from "../../assets/img/edit.svg";

import './Tasks.scss';
import Task from "./Task";

const Tasks = ({
                   list,
                   onEditTitle,
                   onAddTask,
                   onRemoveTask,
                   onEditTask,
                   onCompleteTask,
                   withoutEmpty}) => {

    const editTitle = () => {
        const newTitle = window.prompt('Name task', list.name);

        if (newTitle) {
            onEditTitle(list.id, newTitle);
            axios
                .patch('http://localhost:3001/lists/' + list.id, {
                    name: newTitle
                })
                .catch(() => {
                    alert('Impossibly updated list');}
                );
        }
    };

    return(
        <div className="tasks">
            <h2 style={{color: list.color.hex}} className="tasks__title">
                {list.name}
                <img onClick={() => {editTitle()}} src={editSvg} alt="Edit"/>
            </h2>

            <div className="tasks__items">
                {!withoutEmpty && list.tasks && !list.tasks.length && <h2>Tasks not found!</h2>}

                {list.tasks && list.tasks.map((task, index) => (
                   <Task key       ={index}
                         list      ={list}
                         onEdit    ={onEditTask}
                         onRemove  ={onRemoveTask}
                         onComplete={onCompleteTask}
                         {...task}
                    />
                ))}

                <AddTaskForm
                    list      ={list}
                    onAddTask ={onAddTask}
                />
            </div>
        </div>
    )
};

export default  Tasks;