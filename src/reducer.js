import { v4 as uuidv4 } from 'uuid';

export default function reducer(state, action) {
    switch (action.type) {
        case "SET_CURRENT_TODO":
            return {
                ...state,
                currentTodo: action.payload
            };
        case "TOGGLE_TODO":
            const toggledTodos = state.todos.map(t => t.id === action.payload.id ? {...action.payload, complete: !action.payload.complete} : t);

            return {
                ...state, todos: toggledTodos
            };
        case "UPDATE_TODO":
            if (isValid(state, action) === false)
                return state;

            const updatedTodo = {...state.currentTodo, text: action.payload };
            const updatedTodoIndex = state.todos.findIndex(t => t.id === state.currentTodo.id);
            const updatedTodos = [
                ...state.todos.slice(0, updatedTodoIndex), updatedTodo, ...state.todos.slice(updatedTodoIndex + 1)
            ];

            return {
                ...state, currentTodo: {}, todos: updatedTodos
            };
        case "REMOVE_TODO":
            const filteredTodos = state.todos.filter(t => t.id !== action.payload.id);
            const isRemovedTodo = state.currentTodo?.id === action.payload.id ? {} : state.currentTodo; // clear out currentTodo, deleted in edit mode

            return {
                ...state, currentTodo: isRemovedTodo, todos: filteredTodos
            };
        case "ADD_TODO":
            if (isValid(state, action) === false)
                return state;

            const newTodo = {
                id: uuidv4(),
                text: action.payload,
                complete: false
            };
            const addedTodos = [...state.todos, newTodo];

            return {
                ...state, todos: addedTodos
            };
        default:
            return state;
    }

    function isValid(state, action) {
        let isValid = true;

        if (!action.payload) { // validate against empty todo
            isValid = false;
        }

        if (state.todos.findIndex(t => t.text === action.payload) > -1) // validate against adding duplicates
        {
            isValid = false;
        }

        return isValid;
    }
}