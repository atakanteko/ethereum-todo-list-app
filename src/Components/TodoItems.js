import React from 'react';
import { useContext, useState } from "react";
import {Context} from "../Context";

const TodoItems = ({ todoTasks, createTask, toggleCompleted }) => {

    const { state } = useContext(Context);
    const [task, setTask] = useState('');
    const getProperText = (count) => {
        if (count === 0) {
            return 'No tasks were added';
        } else if (count === '1') {
            return `${count} item`
        } else {
            return `${count} items`
        }
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        createTask(task)
        setTask('')
    }

    const handleCompleted = (id) => {
        toggleCompleted(id)
    }

    return (
        <div>
            <div className='bg-[#181824] px-8 py-8 text-white flex flex-col'>
                {
                    todoTasks.length > 0 ?
                    <>
                        <form onSubmit={handleSubmit}>
                            <div className='rounded-md overflow-hidden flex flex-row items-center bg-[#25273C]'>
                                <input type="text"
                                       onChange={(e) =>  setTask(e.target.value)}
                                       className='w-full h-fit appearance-none text-xl text-white pl-4 bg-transparent border-none focus:outline-none'/>
                                <button onSubmit={()=>handleSubmit} className='bg-[#DE6EA6] h-fit overflow-hidden py-3 px-3'>
                                    <img src={require('../Assets/Images/Icons/submit-arrow.svg').default} width={24} height={24} alt='card-image'/>
                                </button>
                            </div>
                        </form>
                        <div className='mt-4 bg-[#25273C]'>
                            <ul>
                                {
                                    todoTasks.map((todo, index) => {
                                        return (
                                            <li key={index} className='pl-2 py-2 border-b-2 border-[#4840405E] flex flex-row items-center'>
                                                <input type="checkbox"
                                                       name={todo.id}
                                                       defaultChecked={todo.completed}
                                                       onClick={() => handleCompleted(todo.id)}
                                                       className="w-6 h-6 mr-2"/>
                                                <span className={`${todo.completed ? 'line-through' : ''}`}>{todo.content}</span>
                                            </li>
                                        )
                                    })
                                }
                                <li className='pl-2 py-2 border-2 border-[#DE6EA6] text-sm'>{getProperText(state.todoCount)}</li>
                            </ul>
                        </div>
                    </>
                    :<div role="status" className='self-center'>
                        <svg aria-hidden="true"
                            className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"/>
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                }
                
                
            </div>
        </div>
    );
};

export default TodoItems;
