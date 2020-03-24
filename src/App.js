import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Route, useHistory} from "react-router-dom";

import Menu from './components/Menu';
import AddButton from "./components/AddButton";
import Tasks from "./components/Tasks";
import listSvg from './assets/img/list.svg'

import './index.scss';

function App() {
const[lists, setLists]           = useState(null);
const[colors, setColors]         = useState(null);
const[itemActive, setItemActive] = useState(null);

let history = useHistory();

useEffect(() => {
    axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks')
        .then(({ data }) => {
            setLists(data);
        });
    axios.get('http://localhost:3001/colors').then(({data}) => {
        setColors(data);
    });
}, []);


const onAddList = (obj) => {
    const newList = [
        ...lists,
        obj
    ];
    setLists(newList);
};

const onAddTask = (listId, taskObj) => {
    const newList = lists.map(item => {
        if (item.id === listId) {
            item.tasks = [...item.tasks, taskObj];
        }
        return item;
    });
    setLists(newList);
};

const onEditTask = (listId, taskObj) => {
    const newTaskText = window.prompt('Текст задачи', taskObj.text);

    if (!newTaskText) {
        return;
    }
    const newList = lists.map(list => {
        if (list.id === listId) {
            list.tasks = list.tasks.map(task => {
                if (task.id === taskObj.id) {
                    task.text = newTaskText;
                }
                return task;
            });
        }
        return list;
    });
    setLists(newList);
    axios
        .patch('http://localhost:3001/tasks/' + taskObj.id, {
            text: newTaskText
        })
        .catch(() => {
            alert('Failed updated task');
        });
};

const onRemoveTask = (listId, taskId) => {
    if (window.confirm('Do You want delete this task really?')) {
        const newList = lists.map(item => {
            if (item.id === listId) {
                item.tasks = item.tasks.filter(task => task.id !== taskId);
            }
            return item;
        });
        setLists(newList);
        axios.delete('http://localhost:3001/tasks/' + taskId).catch(() => {
            alert('Don`t ');
        });
    }
};

const onCompleteTask = (listId, taskId, completed) => {
    const newList = lists.map(list => {
        if (list.id === listId) {
            list.tasks = list.tasks.map(task => {
                if (task.id === taskId) {
                    task.completed = completed;
                }
                return task;
            });
        }
        return list;
    });
    setLists(newList);
    axios
        .patch('http://localhost:3001/tasks/' + taskId, {
            completed
        })
        .catch(() => {
            alert('Failed delete this task');
        });
};

const onEditListTitle = (id, title) => {
    const newList = lists.map(item => {
        if (item.id === id) {
            item.name = title;
        }
        return item;
    });
    setLists(newList);
};

useEffect(() => {
    const listId = history.location.pathname.split('lists/')[1];
    if (lists) {
        const list = lists.find(list => list.id === Number(listId));
        setItemActive(list);
    }
}, [lists, history.location.pathname]);

    return (

        <div className="todo">
            <div className="todo__sidebar">
                <Menu
                    onClickItem={list => {
                        history.push("/");
                    }}
                    items={[
                        {
                            active: history.location.pathname === '/',
                            icon: listSvg,
                            name: 'All tasks',
                        }
                    ]}
                />

                {lists ? (
                    <Menu
                        items    = {lists}
                        onRemove = {id => {
                            const newLists = lists.filter(item => item.id !== id);
                            setLists(newLists);
                        }}
                        onClickItem={list => {
                            history.push(`/lists/${list.id}`);
                        }}
                        itemActive={itemActive}
                        isRemovable
                    />
                ) : (
                    'Loading...'
                )}
                <AddButton onAdd  = {onAddList}
                           colors = {colors}
                />
            </div>

            <div className="todo__tasks">
                <Route exact path="/">
                    {lists &&
                        lists.map(list =>
                            (<Tasks
                                key           ={list.id}
                                list          ={list}
                                onAddTask     ={onAddTask}
                                onEditTitle   ={onEditListTitle}
                                onRemoveTask  ={onRemoveTask}
                                onEditTask    ={onEditTask}
                                onCompleteTask={onCompleteTask}
                                withoutEmpty
                            />)
                        )
                    }
                </Route>
                <Route path="/lists/:id">
                    {lists && itemActive && (
                        <Tasks
                            list          ={itemActive}
                            onAddTask     ={onAddTask}
                            onEditTitle   ={onEditListTitle}
                            onRemoveTask  ={onRemoveTask}
                            onEditTask    ={onEditTask}
                            onCompleteTask={onCompleteTask}
                        />
                    )}
                </Route>
            </div>
        </div>
    );
}

export default App;
