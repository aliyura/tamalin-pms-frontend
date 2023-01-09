import { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../api";
import { AllContext } from "../App";
import { ClientFormContext } from "../store/ClientFormContext";
import Toaster from "./Toaster";

const CreateContractForm = () => {
  const navigate = useNavigate();

 
  const {clients, setClients, vehicles, setVehicles} = useContext(AllContext)
  // const [clients, setClients] = useState(allClients);
  console.log("jjjj", clients)
  console.log("ttttt", vehicles)
  const [clientID, setClientId] = useState("");
  const [vehicleID, setVehicleId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState("");
  const [amount, setAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const clientRef = useRef();
  const vehicleRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const amountRef = useRef();
  const discountRef = useRef();
  const [createButtonActivated, setSignInButtonActivated] = useState(true);
  const [vehicleIdError, setVehicleIdError] = useState(false);
  const [clientIdError, setClientIdError] = useState(false);
  const [startDateError, setStartDateError] = useState(false);
  const [endDateError, setEndDateError] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const [discountError, setDiscountError] = useState(false);
  const [textFieldErrorText] = useState("This field can not be blank!");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token = sessionStorage.getItem("token");
    if (vehicleRef.current.value === "") setVehicleIdError(true);
    if (clientRef.current.value === "") setClientIdError(true);
    if (startDateRef.current.value === "") setStartDateError(true);
    if (endDateRef.current.value === "") setEndDateError(true);
    if (amountRef.current.value === "") setAmountError(true);
    if (discountRef.current.value === "") setDiscountError(true);
    else {
      await instance
        .post(
          `/contract`,
          {
            clientId: clientID,
            vehicleId: vehicleID,
            startDate: "2022-11-23",
            endDate: "2023-11-23",
            amount: 500000,
            discount: 1000,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          setIsAuthenticated(true);
          navigate("/");
          setIsLoading(false);
        })
        .catch((err) => {
          const { message } = err.response.data;
          console.log(err);
          setError(message);
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="col-11 col-sm-9 col-md-7 col-lg-6 p-0 mt-3 mb-2">
      <div className="card px-0 pt-4 pb-0 mt-3 mb-1">
        <div className="">
          <h4 className="text-center">
            <strong>New Contract</strong>
          </h4>
          {/* <p className='text-center'>Fill all form field to go to next step</p> */}

          <div className="register_form">
            <form className="px-4 mx-4">
              <fieldset>
                <div className="row">
                  <div className="col-md-12 col-sm-12 mt-2">
                    <div className="input-field ">
                      <label className="label_field text-danger">{error}</label>
                      <label className="label_field">Client</label>
                      <select
                        className="custom-select"
                        onChange={(e) => setClientId(e.target.value)}
                        name="identityType"
                        required
                      >
                        <option value="" ref={clientRef}>
                          Select a Client
                        </option>
                        {clients?.map((client) => (
                          <option key={client.id} value={client.cuid}>
                            {client.name}- {client.cuid}
                          </option>
                        ))}
                      </select>
                    </div>
                    <sup className="text-danger">
                      {clientIdError ? textFieldErrorText : ""}
                    </sup>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 col-sm-12 mt-2">
                    <div className="input-field ">
                      <label className="label_field">Vehicle ID</label>
                      <select
                        className="custom-select"
                        onChange={(e) => setVehicleId(e.target.value)}
                        name="identityType"
                        required
                      >
                        <option value="" ref={vehicleRef}>
                          Select a Vehicle
                        </option>
                        {vehicles?.map((vehicle) => (
                          <option key={vehicle.id} value={vehicle.vuid}>
                            {vehicle.vuid}
                          </option>
                        ))}
                      </select>
                    </div>
                    <sup className="text-danger">
                      {vehicleIdError ? textFieldErrorText : ""}
                    </sup>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 col-sm-6 mt-2">
                    <div className="input-field ">
                      <label className="label_field">Start Date</label>
                      <input
                        className="input"
                        type="date"
                        ref={startDateRef}
                        name="identityNumber"
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                      />
                    </div>
                    <sup className="text-danger">
                      {startDateError ? textFieldErrorText : ""}
                    </sup>
                  </div>

                  <div className="col-md-6 col-sm-6 mt-2">
                    <div className="input-field ">
                      <label className="label_field">End Date</label>
                      <input
                        className="input"
                        ref={endDateRef}
                        type="date"
                        name="identityNumber"
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                      />
                    </div>
                    <sup className="text-danger">
                      {endDateError ? textFieldErrorText : ""}
                    </sup>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 col-sm-12 mt-2">
                    <div className="input-field ">
                      <label className="label_field">Amount</label>
                      <input
                        className="input"
                        type="number"
                        name="identityNumber"
                        ref={amountRef}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                      />
                    </div>
                    <sup className="text-danger">
                      {amountError ? textFieldErrorText : ""}
                    </sup>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 col-sm-12 mt-2">
                    <div className="input-field ">
                      <label className="label_field">Discount</label>
                      <input
                        className="input"
                        type="number"
                        name="identityNumber"
                        ref={discountRef}
                        onChange={(e) => setDiscount(e.target.value)}
                        required
                      />
                    </div>
                    <sup className="text-danger">
                      {discountError ? textFieldErrorText : ""}
                    </sup>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>

          <div className="form-buttons row">
            <div className="previous col-6"></div>

            <div className="previous col-6 text-right">
              <button className="btn btn-success" onClick={onSubmit}>
                Create a Contract
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateContractForm;
