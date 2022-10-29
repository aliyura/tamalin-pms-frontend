import {useContext} from 'react';
import { ClientFormContext } from '../store/ClientFormContext';



const CreateClientForm2 = ({ handleChange }) => {
    
    const {client} = useContext(ClientFormContext)
    return (
        <div className='p-6 m-4'>
            <h4 className='text-center'><strong>Register Client</strong></h4>
            <p className='text-center'>Fill all form field to go to next step</p>

            {/* progressbar */ }
            <div id="progressbar">
                <div className="active" id="client"><strong>Client's Info <i className="fa fa-check"></i></strong></div>
                <div className="active" id="guarantor"><strong>Guarantor's Info</strong></div>
                <div id="documents"><strong>Documents</strong></div>
                <div id="confirm"><strong>Confirm</strong></div>
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
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 col-sm-12 mt-2">
                                <div className="input-field ">
                                    <label className="label_field">Gaurantor's Identity Type</label>
                                    <input
                                        className="input"
                                        type="text"
                                        name="guarantorIdentityType"
                                        placeholder="NIN"
                                        value={ client.guarantorIdentityType }
                                        onChange={ (e) => handleChange(e) }
                                    />
                                </div>
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
                            </div>
                        </div>




                    </fieldset>
                </form>
            </div>
        </div>

    );
}

export default CreateClientForm2;
