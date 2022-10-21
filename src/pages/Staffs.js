import React from 'react';
import Table from '../components/Table';
import Button from '../components/Button';

import { Link } from 'react-router-dom'
import Search from '../components/Search';

const Vehicles = () => {
    return (
        <>
            <div className="row mt-4"> 
                <div className='col-sm-12 col-md-10 col-lg-10 table'>
                    <div className="d-flex  m-4">
                            <Search placeholder={'Search for Vehicles'}/>
                        <div className='col-6 d-flex justify-content-end m-2'><Button>Create new Staff</Button></div>
                    </div>
                    <Table />
                </div>
            </div>
        </>
    );
}

export default Vehicles;
