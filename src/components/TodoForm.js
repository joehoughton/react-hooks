import React, { useContext, useEffect, useState } from 'react'
import TodosContext from "../context";

export default function TodoForm() {
    const [todo, setTodo] = useState("");
    const { state: {currentTodo = {}}, dispatch } = useContext(TodosContext); // default empty object incase value not set

    useEffect(() => {
        if (currentTodo.text) {
            setTodo(currentTodo.text)
        }
        else
        {
            setTodo(""); // clear out form in edit mode on deletion
        }
    }, [currentTodo.id])

    const handleSubmit = event => {
        event.preventDefault();

        if (currentTodo.text) {
            dispatch({ type: "UPDATE_TODO", payload: todo });
        } else {
            dispatch({ type: "ADD_TODO", payload: todo });
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