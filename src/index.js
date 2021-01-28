import React, { useContext, useReducer } from 'react';
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

const App = () => {
  const initialState = useContext(TodosContext)
  const [state, dispatch] = useReducer(TodosReducer, initialState)

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <TodoList />
      <TodoForm />
    </TodosContext.Provider>
  )
}

export const UserContext = React.createContext();
const username = "Joe";

ReactDOM.render( // to use, uncomment the above App
  <UserContext.Provider value={username}>
    <App />
  </UserContext.Provider>
  ,document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}

