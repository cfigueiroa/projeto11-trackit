import { createContext, useContext } from "react";
import useStickyState from "../../hooks/useStickyState";

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [user, setUser] = useStickyState('', 'token');
  return (
    <MyContext.Provider value={{ user, setUser }}>
      {children}
    </MyContext.Provider>
  );
};

export default function useMyContext(){
  return useContext(MyContext);
} 
