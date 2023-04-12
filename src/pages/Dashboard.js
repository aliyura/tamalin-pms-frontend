import React, { useEffect, useState } from "react";
import StatsCard from "../components/StatsCard";
import instance from "../api";
import DashboardChart from "../components/DashBoardChart";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [summary, setSummary] = useState([]);

  const getSummary = async () => {
    const token = sessionStorage.getItem("token");
    await instance
      .get(`report/summary`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setSummary(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
         console.log(err)
        const data  = err.response.data;
        toast.error(data.message)
        console.log(err);
      });
  };

  useEffect(() => {
    getSummary();
  }, []);

  return (
    <div className="midde_cont">
      <div className="container-fluid">
        <div className="row column_title">
          <div className="col-md-12">
            <div className="page_title">
              <h2>Dashboard</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="row column1">
        <StatsCard
          title={"Vehicles"}
          link={"vehicles"}
          total={summary.vehicles}
          icon={"automobile"}
        />
        <StatsCard 
          title={"Clients"}
          link={"clients"}
          total={summary.clients}
          icon={"users"} />
        <StatsCard
          title={"Contracts"}
          link={"contracts"}
          total={summary.contracts}
          icon={"file"}
        />
        <StatsCard
          title={"Payments"}
          link={"payments"}
          total={summary.payments}
          icon={"money"} />
      </div>
      <DashboardChart chartData={summary} />
    </div>
  );
};

export default Dashboard;
