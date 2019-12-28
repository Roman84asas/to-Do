import React, { useState } from 'react';
import axios from 'axios';

import addPng from "../../assets/img/add.png";


const AddTaskForm = ({ list, onAddTask }) => {
    const [visibleForm, setVisibleForm] = useState(false);
    const [inputValue, setInputValue]   = useState('');
    const [isLoading, setIsLoading]     = useState(false);

    const toggleForm = () => {
        setVisibleForm(!visibleForm);
        setInputValue('');
    };

    const  addTask = () => {
        const  obj = {
            listId:    list.id,
            text:      inputValue,
            completed: false
        };

        setIsLoading(true);

        axios
            .post('http://localhost:3001/tasks', obj)
            .then(({ data }) => {
                onAddTask(list.id, data);
                toggleForm();
            })
            .catch(() => {
                alert('Error add task..');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div className="tasks__form">
            {!visibleForm ? (
                <div className="tasks__form-new" onClick={toggleForm}>
                    <img
                        src={addPng}
                        alt="Add"
                    />

                    <span>New task</span>
                </div>
            ) : (
                <div className="tasks__form-add">
                    <input
                        type        ="text"
                        placeholder ="Text new task..."
                        className   ="field"
                        value       ={inputValue}
                        onChange    ={e => setInputValue(e.target.value)}
                    />

                    <button
                        disabled={isLoading}
                        onClick   ={addTask}
                        className ="button">
                        {isLoading ? 'Adding task...' : 'Add task..'}
                    </button>

                    <button
                        onClick   ={toggleForm}
                        className ="button button--grey">
                        Cancel
                    </button>
                </div>
            )}
        </div>
    )
};

export default AddTaskForm;