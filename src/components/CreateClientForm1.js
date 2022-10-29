import {useContext} from 'react';
import { ClientFormContext } from '../store/ClientFormContext';

const CreateClientForm1 = ({handleChange}) => {

    const { client, setClient } = useContext(ClientFormContext)
    


    return (

        <div className='p-6 m-4'>
            <h4 className='text-center'><strong>Register Client</strong></h4>
            <p className='text-center'>Fill all form field to go to next step</p>

            {/* progressbar */}
            <div id="progressbar">
                <div className="active" id="client"><strong>Client's Info <i className="fa fa-check"></i></strong></div>
                <div id="guarantor"><strong>Guarantor's Info</strong></div>
                <div id="documents"><strong>Documents</strong></div>
                <div id="confirm"><strong>Confirm</strong></div>
            </div>
            <div className="register_form">
                {JSON.stringify(client)}jj
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
                                        onChange={(e)=> handleChange(e)}
                                    />
                                </div>
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
                                        onChange={ (e) => handleChange(e) }
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12 col-sm-12 mt-2">
                                <div className="input-field ">
                                    <label className="label_field">Identity Type</label>
                                    <input
                                        className="input"
                                        type="text"
                                        name="identityType"
                                        placeholder="NIN"
                                        value={ client.identityType }
                                        onChange={ (e) => handleChange(e) }
                                    />
                                </div>
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
                            </div>
                        </div>



                    </fieldset>
                </form>
            </div>
        </div>


    );
}

export default CreateClientForm1;
