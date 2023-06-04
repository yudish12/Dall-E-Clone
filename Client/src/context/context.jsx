import { createContext, useContext, useReducer } from "react";
import { userReducer } from "./userReducer";
import { postReducer } from "./postReducer";

export const GlobalContext = createContext();

const userDefaultState = {
  user: {},
  loading: false,
  error: null,
};

const postsDefaultState = {
  posts: [],
  loading: false,
  searchQuery: "",
  error: null,
};

// eslint-disable-next-line react/prop-types
const AppContext = ({ children }) => {
  const [userState, userDispatch] = useReducer(userReducer, userDefaultState);
  const [postState, postDispatch] = useReducer(postReducer, postsDefaultState);

  return (
    <GlobalContext.Provider
      value={{ userState, userDispatch, postDispatch, postState }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export default AppContext;
