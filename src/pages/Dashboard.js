import React, {useEffect, useState} from 'react';
import DashboardCalender from '../components/DashboardCalender';
import StatsCard from '../components/StatsCard';
import instance from '../api';

const Dashboard = () => {

    const [summary, setSummary] = useState([])

    const getSummary = async () => {
        const token = sessionStorage.getItem("token");
        await instance
          .get(`report/summary`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            setSummary(res.data.data)   
          })
          .catch((err) => {
            const { message } = err.response.data;
            throw new Error(message); 
            console.log(err)  
          });
      };

      useEffect(()=>{
        getSummary()
      }, [])

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
            {/* Entities Card */}
                <div className="row column1">
                    <StatsCard title={"Vehicles"} total={summary.vehicles} icon={'automobile'} />
                    <StatsCard title={"Clients"} total={summary.clients} icon={'users'} />
                    <StatsCard title={"Contracts"} total={summary.contracts} icon={'file'} />
                    <StatsCard title={"Payments"} total={summary.payments} icon={'money'} />
            </div>
            {/* Calender */ }
            <DashboardCalender />
            
        </div>


    );
}

export default Dashboard;
