import "./App.css";
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

function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [isLoginPage, setLoginPage] = useState(false);

  return (
    <div className="inner_container flex flex-column">
      {isLoginPage ? <p></p> : <Sidebar />}
      <div id="content">
        {isLoginPage ? <p></p> : <Header isAuthenticated={isAuthenticated} />}
        <LoginContext.Provider
          value={{ isAuthenticated, setisAuthenticated, isLoginOn: isLoginPage, setLoginPage }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/contracts" element={<Contracts />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/login" element={<Login login={setLoginPage} />} />
            <Route path="/createuser" element={<CreateUser />} />
          </Routes>
        </LoginContext.Provider>
      </div>
    </div>
  );
}

export default App;
