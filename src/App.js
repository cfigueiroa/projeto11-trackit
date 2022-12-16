import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Signup from "./pages/Signup";
import Habits from "./pages/Habits";
import Today from "./pages/Today";
import History from "./pages/History";
import { MyProvider } from "./components/Context";


export default function App() {
  return (
    <div className="App">
      <MyProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Signup />} />
          <Route path="/habitos" element={<Habits />} />
          <Route path="/hoje" element={<Today />} />
          <Route path="/historico" element={<History />} />
        </Routes>
      </BrowserRouter>
      </MyProvider>
    </div>
  );
}
