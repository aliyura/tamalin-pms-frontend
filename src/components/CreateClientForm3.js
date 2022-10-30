import { useState, useContext } from 'react';
import instance from '../api';
import { ClientFormContext } from '../store/ClientFormContext';

const CreateClientForm3 = ({setPage}) => {

    const [identityImage, setIdentityImage] = useState();
    const [identityImageName, setIdentityImageName] = useState("Choose file...");

    const [passportPhotograph, setPassportPhotograph] = useState("");
    const [passportPhotographName, setPassportPhotographName] = useState("Choose file...");

    const [guarantorIdentityImage, setGuarantorIdentityImage] = useState();
    const [guarantorIdentityImageName, setGuarantorIdentityImageName] = useState("Choose file...");

    const [guarantorPassportPhotograph, setGuarantorPassportPhotograph] = useState();
    const [guarantorPassportPhotographName, setGuarantorPassportPhotographName] = useState("Choose file...");
    const token = sessionStorage.getItem("token");

    const { client, setClient } = useContext(ClientFormContext)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')


    const handleFileUpload = async (file, fileUrl) => {
        const formData = new FormData();
        formData.append('file', file)
        try {
            const response = await instance.post('/file/upload/', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            })
            setClient(prevState => ({
                ...prevState,
                [fileUrl]: response.data.data.url
            }))
            console.log(response.data.data)
            console.log("uploadeed successfully")       
        } catch (error) {
            console.log("faile")
            
        }
        } 
      
    const handleSubmission = async (e) => {
        try {
            handleFileUpload(passportPhotograph, "passportPhotographUrl")
            handleFileUpload(identityImage, "identityImageUrl")
            handleFileUpload(guarantorIdentityImage, "guarantorIdentityImageUrl")
            handleFileUpload(guarantorPassportPhotograph, "guarantorPassportPhotographUrl") 
        }
        catch(err) {
            console.log("failed to upload file", err)
        }
        }

    const CreateClient = async (e) => {
        e.preventDefault();

        setIsLoading(true);
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
                    "photograph":client.passportPhotographUrl,
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
                console.log(res);
                // navigate("/");
                setIsLoading(false);
                setPage(4)
            })
            .catch((err) => {
                const { message } = err.response.data;
                setError(message);
                setIsLoading(false);
                console.log(message)
            });
    };
   


    return (
        <div>
            <div className='p-6 m-4'>
                <h4 className='text-center'><strong>Register Client</strong></h4>
                <p className='text-center'>Fill all form field to go to next step</p>

                {/* progressbar */ }
                <div id="progressbar">
                    <div className="active" id="client"><strong>Client's Info <i className="fa fa-check"></i></strong></div>
                    <div className="active " id="guarantor"><strong>Guarantor's Info <i className="fa fa-check"></i></strong></div>
                    <div className="active" id="documents"><strong>Documents</strong></div>
                </div>
                <div className="register_form">
                    <form className="px-4 mx-4">
                        <fieldset>
                            <div className="row">
                                <div className="col-sm-12 mt-2">
                                    <div className="input-field ">
                                        <label className="label_field">Passport</label>
                                        <div className="custom-file">
                                            <input id="passportfile"
                                                type="file"
                                                onChange={ (e) => {
                                                    setPassportPhotograph(e.target.files[0])
                                                    setPassportPhotographName(e.target.files[0].name)
                                                } }
                                                className="custom-file-input"

                                            />
                                            <label htmlFor="passportfile" className="custom-file-label text-truncate">{ passportPhotographName }</label>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-sm-12 mt-2">
                                    <div className="input-field ">
                                        <label className="label_field">Identity</label>
                                        <div className="custom-file">
                                            <input id="identityfile" type="file"
                                                onChange={ (e) => {
                                                    setIdentityImage(e.target.files[0])
                                                    setIdentityImageName(e.target.files[0].name)
                                                } }
                                                required
                                                className="custom-file-input" />
                                            <label htmlFor="identityfile" className="custom-file-label text-truncate">{ identityImageName }</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-12 mt-2">
                                    <div className="input-field ">
                                        <label className="label_field">Guarantor's Passport</label>
                                        <div className="custom-file">
                                            <input id="logo" type="file"
                                                onChange={ (e) => {
                                                    setGuarantorPassportPhotograph(e.target.files[0])
                                                    setGuarantorPassportPhotographName(e.target.files[0].name)
                                                } }
                                                className="custom-file-input" />
                                            <label htmlFor='logo' className="custom-file-label text-truncate">{ guarantorPassportPhotographName }</label>
                                        </div>
                                    </div>
                                </div>
                            </div>




                            <div className="row">
                                <div className="col-sm-12 mt-2">
                                    <div className="input-field ">
                                        <label className="label_field">Identity</label>
                                        <div className="custom-file">
                                            <input id="logo" type="file"
                                                onChange={ (e) => {
                                                    setGuarantorIdentityImage(e.target.files[0])
                                                    setGuarantorIdentityImageName(e.target.files[0].name)
                                                } }
                                                className="custom-file-input" />
                                            <label htmlFor='logo' className="custom-file-label text-truncate">{ guarantorIdentityImageName }</label>
                                        </div>
                                    </div>
                                </div>
                            </div>



                        </fieldset>
                    </form>
                </div>
            </div>
            <div className='form-buttons row'>
                <div className="previous col-6">
                    <button className='btn btn-success' onClick={ (e) => {
                        e.preventDefault()
                        setPage(prev => prev - 1)
                    } }>prev</button>
                </div>


                <div className="previous col-6 text-right">
                    <button type='submit' className='btn btn-success' onClick={ CreateClient }>Submit</button>
                </div>

            </div>
        </div>
    );
}

export default CreateClientForm3;
