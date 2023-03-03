import { useState, useContext, useRef } from 'react';
import { ClientFormContext } from '../store/ClientFormContext';
import Spinner from './Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import instance from '../api';

const CreateClientForm4 = ({ setCreatedClient, setPage}) => {


    const { client, setClient } = useContext(ClientFormContext)
    const [isLoading, setIsLoading] = useState(false)
    const [imagesURL, setImagesURL] = useState([])
    const [error, setError] = useState(false)
    const [uploaded, setUploaded] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const submitRef = useRef()


    const createClient = async (e) => {
        e.preventDefault();
        console.log(client)
        const token = sessionStorage.getItem("token");
        await instance
            .post(
                `/client`,
                {

                    "name": client.name,
                    "phoneNumber": client.phone,
                    "identity": client.identityImageUrl,
                    "identityType": client.identityType,
                    "identityNumber": client.identityNumber,
                    "photograph": client.passportPhotographUrl,
                    "guarantorDetail": {
                        "name": client.guarantorName,
                        "phoneNumber": client.guarantorPhone,
                        "identity": client.guarantorIdentityImageUrl,
                        "identityNumber": client.guarantorIdentityNumber,
                        "identityType": client.guarantorIdentityType,
                        "photograph": client.guarantorPassportPhotographUrl,
                        "relationship": client.guarantorRelationship,
                        "address": client.guararantorAddress
                    }
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                console.log(res.data.data);
                // setPage(5)
                setCreatedClient(res.data.data)
                setClient("")
                setIsLoading(false);
            })
            .catch((err) => {
                setError(true);
                setIsLoading(false);
                toast(err.response.data.message)
            });
    };


    return (
        <div>
            <div className="col-11 col-12 p-0 mt-3 mb-2">
                <div className="card px-0 pt-4 pb-0 mt-3 mb-3">
                    <div className='p-6 m-4'>
                        <h4 className='text-center'><strong>Register Client</strong></h4>
                        <p className='text-center'>Please confirm all inputs</p>

                        <div className="row">

                            <div className='col-md-6'>
                                <div className="active" id="client"><strong>Client's Info <i className="fa fa-check"></i></strong></div>
                                <ul>
                                    <li><p><strong>Name: </strong>{ client.guarantorName }</p></li>
                                    <li><p><strong>Phone: </strong>{ client.guarantorPhone }</p></li>
                                    <li><p><strong>Identity Type: </strong>{ client.identityType }</p></li>
                                    <li><p><strong>Identity Number: </strong>{ client.identityNumber }</p></li>
                                </ul>
                            </div>

                            <div className='col-md-6'>
                                <div className="active" id="client"><strong>Guarantor's Info <i className="fa fa-check"></i></strong></div>
                                <ul>
                                    <li><p><strong>Name: </strong>{ client.name }</p></li>
                                    <li><p><strong>Phone: </strong>{ client.guarantorPhone }</p></li>
                                    <li><p><strong>Identity Type: </strong>{ client.guarantorIdentityType }</p></li>
                                    <li><p><strong>Identity Number: </strong>{ client.guarantorIdentityNumber }</p></li>
                                    <li><p><strong>Relationship: </strong>{ client.guarantorRelationship }</p></li>
                                    <li><p><strong>Address: </strong>{ client.guarantorAddress }</p></li>
                                </ul>



                            </div>
                                                        
                            {/* <div className='col-md-4'>
                                <div className="active" id="client"><strong>Client's Info <i className="fa fa-check"></i></strong></div>
                                <ul>
                                    <li><p><strong>Name: </strong>{ client.name }</p></li>
                                    <li><p><strong>Phone: </strong>{ client.phoneNumber }</p></li>
                                    <li><p><strong>Identity Type: </strong>{ client.identityType }</p></li>
                                    <li><p><strong>Identity Number: </strong>{ client.identityNumber }</p></li>
                                </ul>
                            </div> */}


                        </div>
                        <div className="row">
                            <div className="col-6">
                                <button className='btn  btn-lg btn-success' onClick={ (e) => {
                                    e.preventDefault()
                                    setPage(3)
                                } }>Prev</button>
                            </div>
                            <div className="text-right col-6">
                                <button className='btn  btn-lg btn-success' onClick={ createClient }>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateClientForm4;
