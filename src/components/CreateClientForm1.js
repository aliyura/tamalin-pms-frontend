import { useContext, useState } from "react";
import { ClientFormContext } from "../store/ClientFormContext";
import Toaster from "./Toaster";

const CreateClientForm1 = ({ handleChange, setPage }) => {
  const { client } = useContext(ClientFormContext);
  const [textFieldErrorText] = useState("This field can not be blank!");
  const [error, setError] = useState(false);

  const onNext = (e) => {
    e.preventDefault();

    if (
      client.name.length < 1 ||
      client.phone.length < 11 ||
      client.identityType === "" ||
      client.identityNumber.length < 1
    ) {
      setError(true);
    } else {
      setPage((prev) => prev + 1);
      console.log(client.identityType);
    }
  };

  return (
    <div className="full_container">
      <div className="container mx-0">
        <div className="left  full_height my-4 mx-0">
          <div className="login_section">
            <div className="logo_login">
              <div className="center">
                <h1 className="heading">Register Client</h1>
              </div>
            </div>

            {/* progressbar */}
            <p className="text-center">
              Fill all form fields to go to next step
            </p>
            <div id="progressbar" className="px-4 mx-4">
              <div className="active" id="client">
                <strong>Client's Info</strong>
              </div>
              <div id="guarantor">
                <strong>Guarantor's Info</strong>
              </div>
              <div id="documents">
                <strong>Documents</strong>
              </div>
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
                          onChange={(e) => handleChange(e)}
                          required
                        />
                      </div>
                      <sup className="text-danger">
                        {error & (client.name.length < 1)
                          ? textFieldErrorText
                          : ""}
                      </sup>
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
                          value={client.phone}
                          onChange={(e) => handleChange(e)}
                          maxLength="11"
                        />
                      </div>
                      <sup className="text-danger">
                        {error & (JSON.stringify(client.phone).length < 11)
                          ? textFieldErrorText
                          : ""}
                      </sup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 col-sm-12 mt-2">
                      <div className="input-field ">
                        <label className="label_field">Identity Type</label>

                        <select
                          class="custom-select"
                          onChange={(e) => handleChange(e)}
                          name="identityType"
                        >
                          <option value="">Identification Type</option>
                          <option value="NIN">NIN</option>
                          <option value="PVC">PVC</option>
                          <option value="INTERNATIONAL PASSPORT">
                            INTERNATIONAL PASSPORT
                          </option>
                        </select>
                      </div>
                      <sup className="text-danger">
                        {error & (client.identityType.length < 1)
                          ? textFieldErrorText
                          : ""}
                      </sup>
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
                          value={client.identityNumber}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <sup className="text-danger">
                        {error & (client.identityNumber.length < 1)
                          ? textFieldErrorText
                          : ""}
                      </sup>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>

            <div className="form-buttons row">
              <div className="previous col-6">
                {/* <button className='btn btn-success' onClick={ (e) => {
                        e.preventDefault()
                        setPage(prev => prev - 1)
                    } }>prev</button> */}
              </div>

              <div className="previous col-6 text-right">
                <button className="btn btn-success" onClick={onNext}>
                  next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateClientForm1;
