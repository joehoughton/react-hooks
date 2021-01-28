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
                            onDoubleClick={() => dispatch({ type: "TOGGLE_TODO", payload: todo })}
                            style={ todo.complete ? { textDecoration: "line-through" } : {}}>
                            {todo.text}
                        </span>
                        <button
                            onClick={() => dispatch({ type: "SET_CURRENT_TODO", payload: todo })}>
                            Edit
                        </button>
                        <button
                            onClick={() => dispatch({ type: "REMOVE_TODO", payload: todo })}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}