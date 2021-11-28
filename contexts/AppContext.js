import { createContext, useReducer } from "react";

//reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action };
    case "LOGOUT":
      return { ...state, user: null };

    default:
      return state;
  }
};

const initialState = {
  user: null,
};

//craete context
const Context = createContext({});

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };
