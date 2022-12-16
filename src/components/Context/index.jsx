import { createContext } from "react";
import { useState } from "react";

export const MyContext = createContext();

export function MyProvider(props) {
  const [user, setUser] = useState("batata");
  return (
    <MyContext.Provider value={{ user, setUser }}>
      {props.children}
    </MyContext.Provider>
  );
}
