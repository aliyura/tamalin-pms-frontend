import {useState} from 'react';

const CreateClientForm3 = () => {

    const [identityImageName, setIdentityImageName] = useState("Choose file...");
    const [passportPhotographName, setPassportPhotographName] = useState("Choose file...");
    const [guarantorIdentityImageName, setGuarantorIdentityImageName] = useState("Choose file...");
    const [guarantorPassportPhotographName, setGuarantorPassportPhotographName] = useState("Choose file...");

    return (
        <div>
            <div className='p-6 m-4'>
                <h4 className='text-center'><strong>Register Client</strong></h4>
                <p className='text-center'>Fill all form field to go to next step</p>

                {/* progressbar */ }
                <div id="progressbar">
                    <div className="active" id="client"><strong>Client's Info <i className="fa fa-check"></i></strong></div>
                    <div className="active" id="guarantor"><strong>Guarantor's Info <i className="fa fa-check"></i></strong></div>
                    <div className="active" id="documents"><strong>Documents</strong></div>
                    <div id="confirm"><strong>Confirm</strong></div>
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
                                            <input id="identityfile" type="file" className="custom-file-input" />
                                            <label htmlFor="identityfile" className="custom-file-label text-truncate">{ identityImageName }</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-12 mt-2">
                                    <div className="input-field ">
                                        <label className="label_field">Passport</label>
                                        <div className="custom-file">
                                            <input id="logo" type="file" className="custom-file-input" />
                                            <label for="logo" className="custom-file-label text-truncate">{ passportPhotographName }</label>
                                        </div>
                                    </div>
                                </div>
                            </div>




                            <div className="row">
                                <div className="col-sm-12 mt-2">
                                    <div className="input-field ">
                                        <label className="label_field">Identity</label>
                                        <div className="custom-file">
                                            <input id="logo" type="file" className="custom-file-input" />
                                            <label for="logo" className="custom-file-label text-truncate">{ guarantorIdentityImageName }</label>
                                        </div>
                                    </div>
                                </div>
                            </div>



                        </fieldset>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default CreateClientForm3;
