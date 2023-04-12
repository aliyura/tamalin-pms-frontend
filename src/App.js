import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Contracts from "./pages/Contracts";
import CreateContract from "./pages/CreateContract";
import Vehicles from "./pages/Vehicles";
import Payments from "./pages/Payments";
import Reports from "./pages/ComingSoon";
import Login from "./pages/login";
import { LoginContext } from "./store/loginContext";
import CreateAdmin from "./pages/CreateAdmin";
import Layout from "./Layout";
import CreateAgent from "./pages/CreateAgent";
import CreateClient from "./pages/CreateClient";
import ResetPassword from "./pages/resetPassword";
import ClientFormProvider from "./store/ClientFormContext";
import AllClients from "./pages/AllClients";
import AllAdmins from "./pages/AllAdmins";
import AllAgents from "./pages/AllAgents";
import CreateVehicle from "./pages/CreateVehicle";
import CreateVehicleType from "./pages/CreateVehicleType";
import VehicleTypes from "./pages/VehicleTypes";
import Client from "./pages/Client";
import { createContext } from "react";
import CreatePayment from "./pages/CreatePayment";

export const AllContext = createContext()

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("isAuthenticated")
  );

  const [clients, setClients] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [contracts, setContracts] = useState([]);

  return (
    <AllContext.Provider value={{
      clients, vehicles,
      contracts, setContracts,
      setClients, setVehicles
    }}>
      <LoginContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <ClientFormProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              {/* <Route path="/clients" element={<Clients />} /> */}
              <Route path="/contracts" element={<Contracts />} />
              <Route path="/newcontract" element={<CreateContract />} />
              <Route path="/vehicles" element={<Vehicles />} />
              <Route path="/vehicletypes" element={<VehicleTypes />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/createpayment" element={<CreatePayment />} />
              <Route path="/*" element={<Reports />} /> {/*Pages not implemented yet */}
              <Route path="/clients" element={<AllClients />} />
              <Route path="/client" element={<Client />} />
              <Route path="/admins" element={<AllAdmins />} />
              <Route path="/agents" element={<AllAgents />} />
              <Route path="/createadmin" element={<CreateAdmin />} />
              <Route path="/createagent" element={<CreateAgent />} />
              <Route path="/registerclient" element={<CreateClient />} />
              <Route path="/createvehicle" element={<CreateVehicle />} />
              <Route path="/createvehicletype" element={<CreateVehicleType />} />
            </Route>
          </Routes>
        </ClientFormProvider>
      </LoginContext.Provider>
    </AllContext.Provider>
  );
}

export default App;
