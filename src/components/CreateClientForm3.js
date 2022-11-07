import { useState, useContext, useEffect, useRef } from 'react';
import instance from '../api';
import { ClientFormContext } from '../store/ClientFormContext';
import Spinner from './Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreateClientForm3 = ({ setPage, setCreatedClient }) => {

    const [identityImageName, setIdentityImageName] = useState("Choose file...");
    const [passportPhotographName, setPassportPhotographName] = useState("Choose file...");
    const [guarantorIdentityImageName, setGuarantorIdentityImageName] = useState("Choose file...");
    const [guarantorPassportPhotographName, setGuarantorPassportPhotographName] = useState("Choose file...");
    const token = sessionStorage.getItem("token");

    const { client, setClient } = useContext(ClientFormContext)
    const [isLoading, setIsLoading] = useState(false)
    const [imagesURL, setImagesURL] = useState([])
    const [error, setError] = useState(false)
    const [uploaded, setUploaded] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const submitRef = useRef()
    const identityRef = useRef()
    const passportRef = useRef()
    const guarantorPassportRef = useRef()
    const guarantorIdentityImageRef = useRef()



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
            setUploaded(true)
            console.log("uploaded successfully")
        } catch (error) {
            console.log(error)
            setUploaded(false)

        }
    }

    const handleFilesSubmission = async (e) => {

        e.preventDefault()
        setIsLoading(true);
        if (passportRef.current.files[0] === undefined || identityRef.current.files[0] === undefined || guarantorIdentityImageRef.current.files[0] === undefined || guarantorPassportRef.current.files[0] === undefined) {
            setError(true)
            setErrorMessage("Please select an image file")
            console.log(identityRef.current.files[0])
            setIsLoading(false)
        }
        else {
            try {
                await handleFileUpload(passportRef.current.files[0], "passportPhotographUrl")
                await handleFileUpload(identityRef.current.files[0], "identityImageUrl")
                await handleFileUpload(guarantorIdentityImageRef.current.files[0], "guarantorIdentityImageUrl")
                await handleFileUpload(guarantorPassportRef.current.files[0], "guarantorPassportPhotographUrl")
                setPage(prev => prev + 1)
            }
            catch (err) {
                console.log("failed to upload file", err)
            }
        }
    }




    return (
        <div className="col-11 col-sm-9 col-md-7 col-lg-6 p-0 mt-3 mb-2">
            <div className="card px-0 pt-4 pb-0 mt-3 mb-3">
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
                                                        ref={ passportRef }
                                                        type="file"
                                                        onChange={ (e) => {
                                                            setPassportPhotographName(e.target.files[0].name)
                                                        } }
                                                        accept="image/*"
                                                        required
                                                        className="custom-file-input"

                                                    />
                                                    <label htmlFor="passportfile" className="custom-file-label text-truncate">{ passportPhotographName }</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <sup className='text-danger'>{ passportRef.current?.files[0] === undefined ? errorMessage : "" }</sup>


                                    <div className="row">
                                        <div className="col-sm-12 mt-2">
                                            <div className="input-field ">
                                                <label className="label_field">Identity</label>
                                                <div className="custom-file">
                                                    <input id="identityfile" type="file"
                                                        ref={ identityRef }
                                                        onChange={ (e) => {
                                                            setIdentityImageName(e.target.files[0].name)
                                                        } }
                                                        accept="image/*"
                                                        required
                                                        className="custom-file-input" />
                                                    <label htmlFor="identityfile" className="custom-file-label text-truncate">{ identityImageName }</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <sup className='text-danger'>{ identityRef.current?.files[0] === undefined ? errorMessage : "" }</sup>

                                    <div className="row">
                                        <div className="col-sm-12 mt-2">
                                            <div className="input-field ">
                                                <label className="label_field">Guarantor's Passport</label>
                                                <div className="custom-file">
                                                    <input id="logo" type="file"
                                                        ref={ guarantorPassportRef }
                                                        accept="image/*"
                                                        required
                                                        onChange={ (e) => {
                                                            setGuarantorPassportPhotographName(e.target.files[0].name)
                                                        } }
                                                        className="custom-file-input" />
                                                    <label htmlFor='logo' className="custom-file-label text-truncate">{ guarantorPassportPhotographName }</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <sup className='text-danger'>{ guarantorPassportRef.current?.files[0] === undefined ? errorMessage : "" }</sup>



                                    <div className="row">
                                        <div className="col-sm-12 mt-2">
                                            <div className="input-field ">
                                                <label className="label_field">Identity</label>
                                                <div className="custom-file">
                                                    <input id="logo" type="file"
                                                        ref={ guarantorIdentityImageRef }
                                                        onChange={ (e) => {
                                                            setGuarantorIdentityImageName(e.target.files[0].name)
                                                        } }
                                                        accept="image/*"
                                                        className="custom-file-input" />
                                                    <label htmlFor='logo' className="custom-file-label text-truncate">{ guarantorIdentityImageName }</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <sup className='text-danger'>{ guarantorIdentityImageRef.current?.files[0] === undefined ? errorMessage : "" }</sup>


                                </fieldset>
                                <div className='form-buttons row'>
                                    <div className="previous col-6">
                                        <div className='btn btn-success' onClick={ (e) => {
                                            e.preventDefault()
                                            setPage(prev => prev - 1)
                                        } }>prev</div>
                                    </div>


                                    <div className="previous col-6 text-right">
                                        <button ref={ submitRef } type='submit' className='btn btn-success' onClick={ handleFilesSubmission } disabled={ isLoading }>{ isLoading ? <Spinner /> : "Submit" }</button>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                   
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
}

export default CreateClientForm3;
