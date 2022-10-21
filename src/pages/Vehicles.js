import React from 'react';
import Table from '../components/Table';
import Button from '../components/Button';

import { Link } from 'react-router-dom'
import Search from '../components/Search';

const Vehicles = () => {
    return (
        <>
            <div className="row">
                <div className="col-12 recently registered">
                </div>
            </div>
            <div className="row mt-4"> 
                <div className="col-sm-12 col-md-2 col-lg-2 mt-4 pt-4 ">
                    <ul className='mt-4 pt-4'>
                        <li className='p-2'><Link to={''}>All Vehicle</Link></li>
                        <li className='p-2'><Link to={''}>Create Vehicle</Link></li>
                        <li className='p-2'><Link to={''}>All Vehicle Type</Link></li>
                    </ul>
                </div>
                <div className='col-sm-12 col-md-10 col-lg-10 table'>
                    <div className="d-flex  m-4">
                            <Search placeholder={'Search for Vehicles'}/>
                        <div className='col-6 d-flex justify-content-end m-2'><Button>Register a new client</Button></div>
                    </div>
                    <Table />
                </div>
            </div>
        </>
    );
}

export default Vehicles;
