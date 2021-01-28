import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import TodosContext from "../context";
import { v4 as uuidv4, v4 } from 'uuid';

export default function TodoForm() {
    const [todo, setTodo] = useState("");
    const { state: {todos, currentTodo = {}}, dispatch } = useContext(TodosContext); // default empty object incase value not set

    useEffect(() => {
        if (currentTodo.text) {
            setTodo(currentTodo.text)
        }
        else
        {
            setTodo(""); // clear out form in edit mode on deletion
        }
    }, [currentTodo.id])

    const handleSubmit = async event => {
        event.preventDefault();

        if (currentTodo.text) {
            if (isValid(todos, todo)) {
                const response = await axios.patch(`https://react-hooks-api-topaz.vercel.app/todos/${currentTodo.id}`, {
                    text: todo
                });
                dispatch({ type: "UPDATE_TODO", payload: response.data });
            }
        } else {
            if (isValid(todos, todo)) {
                const response = await axios.post(`https://react-hooks-api-topaz.vercel.app/todos`, {
                    id: uuidv4(),
                    text: todo,
                    complete: false
                });
                dispatch({ type: "ADD_TODO", payload: response.data });
            }
        }
        setTodo("");
    }

    return (
        <form onSubmit={handleSubmit} className="flex justify-center">
            Add:<input
                type="text"
                onChange={event => setTodo(event.target.value)}
                value={todo}
            />
        </form>
    )
}

function isValid(todos, todo) {
    let isValid = true;

    if (todo === "") { // validate against empty todo
        isValid = false;
    }

    if (todos.findIndex(t => t.text === todo) > -1) // validate against adding duplicates
    {
        isValid = false;
    }

    return isValid;
}