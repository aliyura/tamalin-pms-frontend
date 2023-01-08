import React, { Fragment, useRef, useState } from "react";
import instance from "../api";
import "../static/css/users.css";
import "../static/css/list.css";
import Spinner from "../components/Spinner";

const EditClient = ({clientName, clientPhone, clientId, Open, Close, getAllClients}) => {
  const [error, setError] = useState(false);
  const [createButtonActivated, setSignInButtonActivated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(clientName);
  const [phoneNumber, setPhoneNumber] = useState(clientPhone);
  const [nameError, setNameError] = useState(false);

  const NameHandler = (e) => {
    // e.target.value = plate;
    if (name === "") {
      setNameError(true);
      setSignInButtonActivated(false);
    } else {
      setNameError(false);
      setSignInButtonActivated(true);
    }
  };


  const UpdateClient = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token = sessionStorage.getItem("token");
    await instance
      .put(
        `/client/${clientId}`,
        {
          name: name,
          phoneNumber: phoneNumber
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        getAllClients()
        setIsLoading(false);
        Close();
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="form-modal">
        <div className="form-overlay" onClick={Close}>
          {Close}
        </div>
        <div className="form-modal-content">
          <div className="full_container">
            <div className="container">
              <div className="center verticle_center full_height">
                <div className="login_section">
                  <div className="logo_login">
                    <div className="center">
                      <h1 className="heading">Updated Client</h1>
                    </div>
                  </div>
                  <div className="register_form">
                    <p className="err-color">{error}</p>
                    <form className="px-4 mx-4">
                      <fieldset>
                        <div className="input-field ">
                          <label className="label_field">Name</label>
                          <label className="label_field text-success">{``}</label>
                          <input
                            className="input"
                            type="text"
                            value={name}
                            // onBlur={PlateNumberHandler}
                            onChange={(e)=>setName(e.target.value)}
                          />
                          <p className="err-color">
                            {nameError ? "Invalid Name" : ""}
                          </p>
                        </div>
                        <div className="input-field ">
                          <label className="label_field">Phone Number</label>
                          <label className="label_field text-success">{``}</label>
                          <input
                            className="input"
                            type="tel"
                            value={phoneNumber}
                            onChange={(e)=>setPhoneNumber(e.target.value)}
                            
                          />
                        </div>
                       
                        <div className="input-field margin_0 btn-section">
                          <label className="label_field hidden">
                            hidden label
                          </label>
                          <div className="btn-sec">
                            <button
                              className="btn-danger cancel-btn"
                              onClick={Close}
                            >
                              Cancel
                            </button>
                            <div className="button">
                              <button
                                className="main_bt"
                                onClick={UpdateClient}
                                disabled={isLoading}
                                style={{
                                  backgroundColor: isLoading ? "#e6e6e6" : null,
                                }}
                              >
                                {isLoading ? <Spinner /> : "Update Vehicle"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditClient;
