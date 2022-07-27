import { useReducer, createContext } from "react";
import { common } from "./reducers/common";


// initial state
const initialState = {
    connectionStatus:false,
    todoItems: [],
};

// create context
const Context = createContext({});


// combine reducer function
const combineReducers = (...reducers) => (state, action) => {
    for (const element of reducers) state = element(state, action);
    return state;
};

// context provider
const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(combineReducers(common), initialState); // pass more reducers combineReducers(user, blogs, products)
    const value = { state, dispatch };

    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };
