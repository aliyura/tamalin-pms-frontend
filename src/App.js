import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

import { Routes, Route } from "react-router-dom";
import Clients from "./pages/Clients";
import Contracts from "./pages/Contracts";
import Vehicles from "./pages/Vehicles";
import Payments from "./pages/Payments";
import Reports from "./pages/Reports";
import Login from "./pages/Login";

function App() {
  return (
    <div className="inner_container flex flex-column">
      <Sidebar />
      <div id="content">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
