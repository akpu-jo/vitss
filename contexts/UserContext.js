import { createContext, useContext, useState } from "react";
import { isAuth } from "../services/auth";

const UserContext = createContext();

const lsUser = isAuth() 

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(lsUser);
  const [searchResult, setSearchResult] = useState([])

  return (
    <UserContext.Provider value={{ user, setUser, searchResult, setSearchResult }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
