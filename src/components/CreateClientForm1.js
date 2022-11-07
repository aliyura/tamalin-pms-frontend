import {useContext, useState} from 'react';
import { ClientFormContext } from '../store/ClientFormContext';
import Toaster from './Toaster';

const CreateClientForm1 = ({handleChange, setPage}) => {

    const { client } = useContext(ClientFormContext)
    const [textFieldErrorText] = useState("This field can not be blank!")
    const [error, setError] = useState(false)

    const onNext = e => {
        e.preventDefault()
        
        if (client.name.length < 1 || client.phone.length < 11 || client.identityType ==="" || client.identityNumber.length < 1){
            setError(true)
        }
        else {
            setPage(prev => prev + 1)
            console.log(client.identityType)
        }
        }
    


    return (
        <div className="col-11 col-sm-9 col-md-7 col-lg-6 p-0 mt-3 mb-2">
            <div className="card px-0 pt-4 pb-0 mt-3 mb-3">
        <div className='p-6 m-4'>
            <h4 className='text-center'><strong>Register Client</strong></h4>
            <p className='text-center'>Fill all form field to go to next step</p>

            {/* progressbar */}
            <div id="progressbar">
                <div className="active" id="client"><strong>Client's Info</strong></div>
                <div id="guarantor"><strong>Guarantor's Info</strong></div>
                <div id="documents"><strong>Documents</strong></div>

            </div>
            <div className="register_form">
                <form className="px-4 mx-4">
                    <fieldset>
                        <div className="row">
                            <div className="col-md-12 col-sm-12 mt-2">
                                <div className="input-field ">
                                    <label className="label_field">Full Name</label>
                                    <input
                                        className="input"
                                        type="text"
                                        name="name"
                                        value={client.name}
                                        onChange={ (e) => handleChange(e) }
                                        required
                                    />
                                </div>
                                <sup className='text-danger'>{(error & client.name.length < 1) ? textFieldErrorText : "" }</sup>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 col-sm-12 mt-2">
                                <div className="input-field ">
                                    <label className="label_field">Phone</label>
                                    <input
                                        className="input"
                                        type="tel"
                                        name="phone"
                                        value={ client.phone }
                                        onChange={(e)=>handleChange(e)}
                                        maxLength="11"
                                    />
                                </div>
                                <sup className='text-danger'>{ (error & JSON.stringify(client.phone).length < 11) ? textFieldErrorText : "" }</sup>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12 col-sm-12 mt-2">
                                <div className="input-field ">
                                    <label className="label_field">Identity Type</label>

                                    <select class="custom-select" onChange={ (e) => handleChange(e) } name="identityType">
                                        <option value="">Identification Type</option>
                                        <option value="NIN">NIN</option>
                                        <option value="PVC">PVC</option>
                                        <option value="INTERNATIONAL PASSPORT">INTERNATIONAL PASSPORT</option>
                                    </select>
                                </div>
                                <sup className='text-danger'>{ (error & client.identityType.length < 1) ? textFieldErrorText : "" }</sup>
                            </div>
                        </div>




                        <div className="row">
                            <div className="col-md-12 col-sm-12 mt-2">
                                <div className="input-field ">
                                    <label className="label_field">Identity Number</label>
                                    <input
                                        className="input"
                                        type="identityNumber"
                                        name="identityNumber"
                                        value={ client.identityNumber }
                                        onChange={ (e) => handleChange(e) }
                                    />
                                </div>
                                <sup className='text-danger'>{ (error & client.identityNumber.length < 1) ? textFieldErrorText : "" }</sup>
                            </div>
                        </div>



                    </fieldset>
                </form>
            </div>

            <div className='form-buttons row'>
                  <div className="previous col-6">
                    {/* <button className='btn btn-success' onClick={ (e) => {
                        e.preventDefault()
                        setPage(prev => prev - 1)
                    } }>prev</button> */}
                </div> 


               <div className="previous col-6 text-right">
                    <button className='btn btn-success' onClick={ onNext }>next</button>
                </div>
                    </div>
                    </div>
            </div>
        </div>


    );
}

export default CreateClientForm1;
