import { createContext } from "react";
import { useState } from "react";

export const UserContext = createContext(null);

export default function Context({ children }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
