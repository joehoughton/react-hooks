import React, { useContext, useEffect, useReducer, useState } from 'react';
import ReactDOM from 'react-dom';
//import App from './AppClass';
//import App from './AppFunction';
//import App from './Login';
//import App from './Register';
//import App from './News';
//import App from './Counter';
import TodosContext from './context'
import TodosReducer from './reducer'
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'
import axios from 'axios';

const useAPI = endpoint => { // hooks manage their own state
  const [data, setData] = useState([]);

  useEffect(() => { // called when app loaded
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(endpoint);
    setData(response.data);
  }

  return data;
}

const App = () => {
  const initialState = useContext(TodosContext)
  const [state, dispatch] = useReducer(TodosReducer, initialState)
  const savedTodos = useAPI("https://react-hooks-api-topaz.vercel.app/todos"); // custom hooks are prefixed with use

  useEffect(() => {
    dispatch({ type: "GET_TODOS", payload: savedTodos });
  }, [savedTodos]);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <TodoList />
      <TodoForm />
    </TodosContext.Provider>
  )
}

export const UserContext = React.createContext();
const username = "Joe";

ReactDOM.render(
  <UserContext.Provider value={username}>
    <App />
  </UserContext.Provider>
  ,document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}

