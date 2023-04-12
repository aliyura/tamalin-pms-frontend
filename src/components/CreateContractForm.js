import { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../api";
import { AllContext } from "../App";
import { ClientFormContext } from "../store/ClientFormContext";
import Toaster from "./Toaster";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "./Spinner";

const CreateContractForm = () => {
  const { clients, setClients, vehicles, setVehicles } = useContext(AllContext)
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

  const onSubmit = async () => {
    setIsLoading(true);
    const token = sessionStorage.getItem("token");
    if (vehicleRef.current.value.length < 1) setVehicleIdError(true);
    else if (clientRef.current.value.length < 1) setClientIdError(true);
    else if (startDateRef.current.value.length < 1) setStartDateError(true);
    else if (endDateRef.current.value.length < 1) setEndDateError(true);
    else if (amountRef.current.value.length < 1) setAmountError(true);
    else {

      const request = {
        clientId: clientID,
        vehicleId: vehicleID,
        startDate: clientRef.current.value,
        endDate: endDateRef.current.value,
        amount: Number(amountRef.current.value),
        discount: Number(discountRef.current.value),
      };

      await instance
        .post(
          `/contract`,
          request,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          toast.success("Request Successful")
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch((err) => {
          console.log(err)
          const data = err.response.data;
          toast.error(data.message)
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="login_section">
      <ToastContainer />
      <div className="logo_login">
        <div className="center">
          <h1 className="heading">Create Contract</h1>
        </div>
      </div>
      <div className="register_form">
        <div className="px-4 mx-4">
          <fieldset>
            <div className="row">
              <div className="col-md-12 col-sm-12 mt-2">
                <div className="input-field ">
                  <label className="label_field text-danger">{error}</label>
                  <label className="label_field">Client</label>
                  <select
                    className="custom-select"
                    ref={clientRef}
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
                    ref={vehicleRef}
                    onChange={(e) => setVehicleId(e.target.value)}
                    name="identityType"
                    required
                  >
                    <option value="" ref={vehicleRef}>
                      Select a Vehicle
                    </option>
                    {vehicles?.map((vehicle) => (
                      <option key={vehicle.id} value={vehicle.vuid}>
                        {vehicle.vuid}- {vehicle.model}
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
        </div>
      </div>

      <div className="form-buttons row">
        <div className="previous col-6"></div>

        <div className="previous col-6 text-right">
          <button className="btn btn-success" onClick={onSubmit}>
            {isLoading ? <Spinner /> : "Create a Contract"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContractForm;
