import axios from 'axios';
import React, { useContext, useReducer } from 'react';
import TodosContext from '../context';

export default function TodoList() {
    const { state, dispatch } = useContext(TodosContext);
    const title = state.todos.length > 0 ? `${state.todos.length} Todos` : "Nothing to do!";

    return (
        <div>
            <ul>
                <h1>{title}</h1>
                {state.todos.map(todo => (
                    <li key={todo.id}>
                        <span
                            onDoubleClick={async () =>{
                                const response = await axios.patch(`https://react-hooks-api-topaz.vercel.app/todos/${todo.id}`, {
                                    complete: !todo.complete,
                                });
                                dispatch({ type: "TOGGLE_TODO", payload: response.data })
                            }}
                            style={ todo.complete ? { textDecoration: "line-through", cursor: "pointer" } : { cursor: "pointer" } }
                            title="Double click...">
                            {todo.text}
                        </span>
                        <button
                            onClick={() => dispatch({ type: "SET_CURRENT_TODO", payload: todo })}>
                            Edit
                        </button>
                        <button
                            onClick={async () => {
                                axios.delete(`https://react-hooks-api-topaz.vercel.app/todos/${todo.id}`)
                                dispatch({ type: "REMOVE_TODO", payload: todo })
                            }}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}