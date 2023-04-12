import { useContext, useState } from 'react';
import { ClientFormContext } from '../store/ClientFormContext';



const CreateClientForm2 = ({ handleChange, setPage }) => {

    const { client } = useContext(ClientFormContext)
    const [textFieldErrorText] = useState("This field can not be blank!")
    const [error, setError] = useState(false)

    const onNext = e => {
        e.preventDefault()

        if (client.guarantorName.length < 1 || client.guarantorPhone.length < 11 || client.guarantorIdentityType === "" || client.guarantorIdentityNumber.length < 1 || client.guarantorAddress.length < 1 || client.guarantorRelationship.length < 1) {
            setError(true)
        }
        else {
            setError(false)
            setPage(prev => prev + 1)
        }
    }


    return (
        <div className="full_container mx-0">
            <div className="container mx-0">
                <div className="left full_height my-4 mx-0">
                    <div className="login_section">
                        <div className="logo_login">


                            <div className="center"><h1 className='heading'>Register Client</h1></div>

                        </div>

                        {/* progressbar */}
                        <p className='text-center'>Fill all form fields to go to next step</p>
                        <div id="progressbar" className="px-4 mx-4">
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
                                                    value={client.guarantorName}
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </div>
                                            <sup className='text-danger'>{(error & client.guarantorName.length < 1) ? textFieldErrorText : ""}</sup>
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
                                                    value={client.guarantorPhone}
                                                    onChange={(e) => handleChange(e)}
                                                    minLength="11"
                                                    maxLength="11"
                                                />
                                            </div>
                                            <sup className='text-danger'>{(error & client.guarantorPhone.length < 11) ? textFieldErrorText : ""}</sup>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 col-sm-12 mt-2">
                                            <div className="input-field ">
                                                <label className="label_field">Gaurantor's Identity Type</label>
                                                <select class="custom-select" onChange={(e) => handleChange(e)} name="guarantorIdentityType">
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
                                            <sup className='text-danger'>{(error & client.guarantorIdentityType.length < 1) ? textFieldErrorText : ""}</sup>
                                        </div>
                                        <div className="col-md-6 col-sm-12 mt-2">
                                            <div className="input-field ">
                                                <label className="label_field">Guarantor's Identity Number</label>
                                                <input
                                                    className="input"
                                                    type="number"
                                                    name="guarantorIdentityNumber"
                                                    value={client.guarantorIdentityNumber}
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </div>
                                            <sup className='text-danger'>{(error & client.guarantorIdentityNumber < 1) ? "Incorrect or empty field" : ""}</sup>
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
                                                    value={client.guarantorAddress}
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </div>
                                            <sup className='text-danger'>{(error & client.guarantorAddress.length < 1) ? textFieldErrorText : ""}</sup>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12 col-sm-12 mt-2">
                                            <div className="input-field ">
                                                <label className="label_field">Relationship</label>
                                                <select
                                                    className="input"
                                                    name="guarantorRelationship"
                                                    value={client.guarantorRelationship}
                                                    onChange={(e) => handleChange(e)}
                                                >
                                                <option>Father</option>
                                                <option>Sister</option>
                                                <option>Brother</option>
                                                <option>Mother</option>
                                                <option>Spouse</option>
                                                <option>Other</option>
                                            </select>
                                        </div>

                                        <sup className='text-danger'>{(error & client.guarantorRelationship.length < 1) ? textFieldErrorText : ""}</sup>
                                    </div>
                                </div>




                            </fieldset>
                        </form>
                    </div>
                    <div className='form-buttons row'>
                        <div className="previous col-6">
                            <button className='btn btn-success' onClick={(e) => {
                                e.preventDefault()
                                setPage(prev => prev - 1)
                            }}>prev</button>
                        </div>


                        <div className="previous col-6 text-right">
                            <button className='btn btn-success' onClick={onNext}>next</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        </div >


    );
}

export default CreateClientForm2;
