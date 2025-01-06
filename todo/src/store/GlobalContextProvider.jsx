import { createContext, useReducer } from "react";
import reducer from "./reducer";

const initialState = {
  openAddTask: false,
};

export const GlobalStoreContext = createContext();

const GlobalStoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStoreContext.Provider value={{ store, dispatch }}>
      {children}
    </GlobalStoreContext.Provider>
  );
};

export default GlobalStoreProvider;
