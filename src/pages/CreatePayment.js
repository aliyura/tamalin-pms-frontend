import React, { Fragment, useRef, useState } from "react";
import instance from "../api";
import "../static/css/users.css";
import "../static/css/list.css";
import Spinner from "../components/Spinner";

const CreatePayment = ({contractId, close, getAllClients }) => {
  const [error, setError] = useState(false);
  const [createButtonActivated, setSignInButtonActivated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState();

  // const [contractId, setContractId] = useState();
  const [paymentRef, setPaymentRef] = useState();
  const [amount, setAmount] = useState(0);
  const [narration, setNarration] = useState('');

  function generatePaymentReference() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    const hour = currentDate.getHours();
    const minute = currentDate.getMinutes();
    const second = currentDate.getSeconds();
  
    const randomNumber = Math.floor(Math.random() * 1000000);
  
    return `pay${year}${month}${day}${hour}${minute}${second}${randomNumber}`;
  }

  // const NameHandler = (e) => {
  //   // e.target.value = plate;
  //   if (name === "") {
  //     setNameError(true);
  //     setSignInButtonActivated(false);
  //   } else {
  //     setNameError(false);
  //     setSignInButtonActivated(true);
  //   }
  // };


  const createPayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token = sessionStorage.getItem("token");
    await instance
      .put(
        `/payment/`,
        {
         contractId:contractId,
         paymentRef:paymentRef,
         amount:amount,
         narration
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
        close();
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="form-modal">
        <div className="form-overlay" onClick={close}>
          {close}
        </div>
        <div className="form-modal-content">
          <div className="full_container">
            <div className="container">
              <div className="center verticle_center full_height">
                <div className="login_section">
                  <div className="logo_login">
                    <div className="center">
                      <h1 className="heading">Payment</h1>
                    </div>
                  </div>
                  <div className="register_form">
                    <p className="err-color">{error}</p>
                    <form className="px-4 mx-4">
                      <fieldset>
                        <div className="input-field ">
                          <label className="label_field">Amount</label>
                          <label className="label_field text-success">{``}</label>
                          <input
                            className="input"
                            type="number"
                            value={amount}
                            // onBlur={PlateNumberHandler}
                            onChange={(e)=>setAmount(e.target.value)}
                          />
                          <p className="err-color">
                            {nameError ? "Invalid Name" : ""}
                          </p>
                        </div>
                        <div className="input-field ">
                          <label className="label_field">narration</label>
                          <label className="label_field text-success">{``}</label>
                          <textarea
                            className="input"
                            cols={12} 
                            rows={12}
                            value={phoneNumber}
                            onChange={(e)=>setPhoneNumber(e.target.value)}
                          ></textarea>  
                          
                        </div>
                       
                        <div className="input-field margin_0 btn-section">
                          <label className="label_field hidden">
                            hidden label
                          </label>
                          <div className="btn-sec">
                            <button
                              className="btn-danger cancel-btn"
                              onClick={close}
                            >
                              Cancel
                            </button>
                            <div className="button">
                              <button
                                className="main_bt"
                                onClick={createPayment}
                                disabled={isLoading}
                                style={{
                                  backgroundColor: isLoading ? "#e6e6e6" : null,
                                }}
                              >
                                {isLoading ? <Spinner /> : "Create Payment"}
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

export default CreatePayment;
