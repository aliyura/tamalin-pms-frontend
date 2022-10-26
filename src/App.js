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
import CreateAdmin from "./pages/CreateAdmin";
import Layout from "./Layout";
import CreateAgent from "./pages/CreateAgent";
import CreateClient from "./pages/CreateClient";
import ResetPassword from "./pages/resetPassword";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("isAuthenticated")
  );

  return (
    <LoginContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/createadmin" element={<CreateAdmin />} />
          <Route path="/createagent" element={ <CreateAgent /> } />
           <Route path="/registerclient" element={<CreateClient />} />
        </Route>
      </Routes>
    </LoginContext.Provider>
  );
}

export default App;
