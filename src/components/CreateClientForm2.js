import {useContext, useState} from 'react';
import { ClientFormContext } from '../store/ClientFormContext';



const CreateClientForm2 = ({ handleChange, setPage }) => {
    
    const { client } = useContext(ClientFormContext)
    const [textFieldErrorText] = useState("This field can not be blank!")
    const [error, setError] = useState(false)

    const onNext = e => {
        e.preventDefault()

        if (client.guarantorName.length < 1 || client.guarantorPhone.length < 11 || client.guarantorIdentityType==="" || client.guarantorIdentityNumber.length < 1 || client.guarantorAddress.length < 1 || client.guarantorRelationship.length < 1) {
            setError(true)
        }
        else {
            setError(false)
            setPage(prev => prev + 1)
        }
    }


    return (
        <div className="col-11 col-sm-9 col-md-7 col-lg-6 p-0 mt-3 mb-2">
            <div className="card px-0 pt-4 pb-0 mt-3 mb-3">
        <div className='p-6 m-4'>
            <h4 className='text-center'><strong>Register Client</strong></h4>
            <p className='text-center'>Fill all form field to go to next step</p>

            {/* progressbar */ }
            <div id="progressbar">
                <div className="active" id="client"><strong>Client's Info <i className="fa fa-check"></i></strong></div>
                <div className="active" id="guarantor"><strong>Guarantor's Info</strong></div>
                <div id="documents"><strong>Documents</strong></div>
            </div>
            <div className="register_form">
                <form className="px-4 mx-4">
                    <fieldset>
                        <div className="row">
                            <div className="col-md-12 col-sm-12 mt-2">
                                <div className="input-field ">
                                    <label className="label_field">Guarantor's Full Name</label>
                                    <input
                                        className="input"
                                        type="text"
                                        name="guarantorName"
                                        value={ client.guarantorName }
                                        onChange={ (e) => handleChange(e) }
                                    />
                                </div>
                                <sup className='text-danger'>{ (error & client.guarantorName.length < 1) ? textFieldErrorText : "" }</sup>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 col-sm-12 mt-2">
                                <div className="input-field ">
                                    <label className="label_field">Guarantor's Phone</label>
                                    <input
                                        className="input"
                                        type="tel"
                                        name="guarantorPhone"
                                        value={ client.guarantorPhone }
                                        onChange={ (e) => handleChange(e) }
                                        minLength="11"
                                        maxLength="11"
                                    />
                                </div>
                                <sup className='text-danger'>{ (error & client.guarantorPhone.length < 11) ? textFieldErrorText : "" }</sup>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 col-sm-12 mt-2">
                                <div className="input-field ">
                                    <label className="label_field">Gaurantor's Identity Type</label>
                                    <select class="custom-select" onChange={ (e) => handleChange(e) } name="guarantorIdentityType">
                                        <option selected value={""}>Identification Type</option>
                                        <option value="NIN">NIN</option>
                                        <option value="PVC">PVC</option>
                                        <option value="INTERNATIONAL PASSPORT">INTERNATIONAL PASSPORT</option>
                                    </select>


                                    {/* <input
                                        className="input"
                                        type="text"
                                        name="guarantorIdentityType"
                                        placeholder="NIN"
                                        value={ client.guarantorIdentityType }
                                        onChange={ (e) => handleChange(e) }
                                    /> */}
                                </div>
                                <sup className='text-danger'>{ (error & client.guarantorIdentityType.length < 1) ? textFieldErrorText : "" }</sup>
                            </div>
                                <div className="col-md-6 col-sm-12 mt-2">
                                    <div className="input-field ">
                                        <label className="label_field">Guarantor's Identity Number</label>
                                        <input
                                            className="input"
                                            type="number"
                                            name="guarantorIdentityNumber"
                                            value={ client.guarantorIdentityNumber }
                                            onChange={ (e) => handleChange(e) }
                                        />
                                </div>
                                <sup className='text-danger'>{ (error & client.guarantorIdentityNumber < 1) ? "Incorrect or empty field": "" }</sup>
                                </div>
                            
                        </div>

                        <div className="row">
                            <div className="col-md-12 col-sm-12 mt-2">
                                <div className="input-field ">
                                    <label className="label_field">Guarantor Address</label>
                                    <input
                                        className="input"
                                        type="text"
                                        name="guarantorAddress"
                                        value={ client.guarantorAddress}
                                        onChange={ (e) => handleChange(e) }
                                    />
                                </div>
                                <sup className='text-danger'>{ (error & client.guarantorAddress.length < 1) ? textFieldErrorText : "" }</sup>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12 col-sm-12 mt-2">
                                <div className="input-field ">
                                    <label className="label_field">Relationship</label>
                                    <input
                                        className="input"
                                        type="text"
                                        name="guarantorRelationship"
                                        value={ client.guarantorRelationship }
                                        onChange={ (e) => handleChange(e) }
                                    />
                                </div>
                                <sup className='text-danger'>{ (error & client.guarantorRelationship.length < 1) ? textFieldErrorText : "" }</sup>
                            </div>
                        </div>




                    </fieldset>
                </form>
            </div>
            <div className='form-buttons row'>
                <div className="previous col-6">
                    <button className='btn btn-success' onClick={ (e) => {
                        e.preventDefault()
                        setPage(prev => prev - 1)
                    } }>prev</button>
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

export default CreateClientForm2;
