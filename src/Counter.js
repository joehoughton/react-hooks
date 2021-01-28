import React, { useContext, useReducer } from 'react'; // replace redux with reducer
import { UserContext } from './index'; // pass data from parent to child without props drilling

const initialState = {
    count: 0
}

function reducer(state, action) {
    switch(action.type) {
        case "increment":
            return {
                count: state.count + 1
            }
        case "decrement":
            return {
                count: state.count - 1
            }
        case "reset":
            return initialState;
        default:
            return initialState;
    }
}

export default function Counter() {
    const name = useContext(UserContext);
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <>
            <div>
                <UserContext.Consumer>
                {value => <p>Hello, {value}</p>}
                </UserContext.Consumer>
                <p>Hello, {name}</p>
            </div>

            <div>
                Count: {state.count}
                <button onClick={() => dispatch({type: "increment"})}>Increment</button>
                <button onClick={() => dispatch({type: "decrement"})}>Decrement</button>
                <button onClick={() => dispatch({type: "reset"})}>Reset</button>
            </div>
        </>
    );
}