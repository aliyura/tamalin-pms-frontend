import React from 'react';
import Button from '../components/Button';
import Table from '../components/Table';

const Clients = () => {
    return (
        <>
            <div className="row">
                <div className="col-12 recently registered">
                </div>
            </div>
            <div className="row"> 
                <div className="col-sm-12 col-md-4 col-lg-4 bg-success">
                    Client
                </div>
                <div className='col-sm-12 col-md-8 col-lg-8 table'>
                    <div className="d-flex  mt-4">
                        <h5 className='col-6 text-secondary'>Clients</h5>
                        <div className='col-6 d-flex justify-content-end m-2'><Button>Register a new client</Button></div>
                    </div>
                    <Table />
                </div>
            </div>
        </>
    );
}

export default Clients;
