// import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Clients from "./pages/Clients";
import Contracts from "./pages/Contracts";
import Vehicles from "./pages/Vehicles";
import Payments from "./pages/Payments";
import Reports from "./pages/Reports";
import Login from "./pages/login";
import { LoginContext } from "./store/loginContext";
import CreateUser from "./pages/CreateUser";
import Layout from "./Layout";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem("isAuthenticated"));

  return (
        <LoginContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />} >
            <Route path="/" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/contracts" element={<Contracts />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/createuser" element={<CreateUser />} />
          </Route>
      </Routes>
        </LoginContext.Provider>
  );
}

export default App;
