import React, { useState, useEffect } from 'react';
import FilterButton from "./Filterbtns"
import './Todo.css';

const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed
  };
const FILTER_NAMES = Object.keys(FILTER_MAP);
function Task({ task, index, completeTask }) {
    return (
        <div  className="task" style={{ textDecoration: task.completed ? "line-through" : "" }}>
            
            <input type="checkbox" onChange={() => completeTask(index)} checked={task.completed ? "checked" : "" } />
            {task.title}

        </div>
    );
}

function CreateTask({ addTask }) {
    const [value, setValue] = useState("");
   

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        addTask(value);
        setValue("");
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                className="input"
                value={value}
                placeholder="Add a new task"
                onChange={e => setValue(e.target.value)}
            />
        </form>
    );
}


function Todo() {
    const [tasks, setTasks] = useState([]);
    // Load TODOs from local storage on app startup
    
        useEffect(() => {
            const storedTasks = JSON.parse(localStorage.getItem('tasks'));
            if (storedTasks) {
                setTasks(storedTasks);
            }
            }, []);
        
          // Update local storage whenever TODOs change
            useEffect(() => {
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }, [tasks]);
        
    
    const [currentFilter, setCurrentFilter] = useState(FILTER_NAMES[0]);  
    const filtered = tasks.filter(FILTER_MAP[currentFilter]);
     
    const addTask = title => {
        const newTasks = [...tasks, { title, completed: false }];
        setTasks(newTasks);
    };

    const completeTask = index => {
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;
       setTasks(newTasks);
    };

    const taskItems = filtered.map((task,index) => {
        return (
          <Task
          task={task}
          index={index}
          completeTask={completeTask}
          key={index}
          />
        );
      });    
      

    return (
        <div className="todo-container">
            <FilterButton
            filterNames={FILTER_NAMES}
            onFilter={setCurrentFilter}
          />
            <div className="tasks">
                {taskItems}
            </div>
            <div className="create-task" >
                <CreateTask addTask={addTask} />
            </div>
        </div>
    );
}

export default Todo;