import { BrowserRouter, Routes, Route } from "react-router-dom";


import Login from "./components/login_page/Login";
import AntdLayout from "./components/login_page/AntdLayout";
import Subscription from "./components/login_page/Subscription"; // ✅ le bon composant React

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<AntdLayout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AntdLayout />} />
        <Route path="/inscription" element={<Subscription />} /> 

      </Routes>
    </BrowserRouter>
  );
};

export default App;
