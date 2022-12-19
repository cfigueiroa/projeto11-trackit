import { createContext, useContext, useState } from "react";
import useStickyState from "../../hooks/useStickyState";
import api from "../../services/api";

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [user, setUser] = useStickyState("", "token");
  const [percentage, setPercentage] = useState(0);

  function getPercentage() {
    const promise = api.getTodayHabits(user.token);
    promise.then((res) => {
    const tempHabit = res.data;
    const total = tempHabit.length;
    const done = tempHabit.filter((h) => h.done).length;
    const percent = Number(((done / total) * 100).toFixed(0));
    setPercentage(isNaN(percent) ? 0 : percent);
  });
  promise.catch((err) => {
    console.log(err);
  });
}

  return (
    <MyContext.Provider value={{ user, setUser, percentage, getPercentage }}>
      {children}
    </MyContext.Provider>
  );
};

export default function useMyContext() {
  return useContext(MyContext);
}
