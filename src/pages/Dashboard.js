import React from 'react';
import StatsCard from '../components/StatsCard';

const Dashboard = () => {
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
                <StatsCard title={"Vehicles"} total={345} icon={'automobile'} />
                <StatsCard title={"Clients"} total={345} icon={'users'} />
                <StatsCard title={"Contracts"} total={345} icon={'file'} />
                <StatsCard title={"Payments"} total={345} icon={'money'} />
                </div>
        </div>


    );
}

export default Dashboard;
