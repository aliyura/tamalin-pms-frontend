import React, { Fragment, useRef, useState } from "react";
import instance from "../api";
import "../static/css/users.css";
import "../static/css/list.css";
import Spinner from "../components/Spinner";

const EditVehicle = (props) => {
  const { plate, imei, sim, vuid } = props;
  const [error, setError] = useState(false);
  const [createButtonActivated, setSignInButtonActivated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [plateNumberError, setPlateNumberError] = useState(false);
  const [plateNumberText, setPlateNumberText] = useState("");
  const plateNumberRef = useRef();
  const imeiRef = useRef();
  const simRef = useRef();

  const PlateNumberHandler = (e) => {
    // e.target.value = plate;
    setPlateNumberText(plateNumberRef.current.value);
    if (plateNumberText === "") {
      setPlateNumberError(true);
      setSignInButtonActivated(false);
    } else {
      setPlateNumberError(false);
      setSignInButtonActivated(true);
    }
  };

  const ImeiHandler = (e) => {
    // imeiRef.current.value = e.target.value;
  };

  const SimHandler = (e) => {
    // simRef.current.value = e.target.value;
  };
  const UpdateVehicle = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token = sessionStorage.getItem("token");
    await instance
      .put(
        `/vehicle/${vuid}`,
        {
          plateNumber:
            (plateNumberRef.current.value !== plate &&
              plateNumberRef.current.value !== "" &&
              plateNumberRef.current.value) ||
            plate,
          trackerIMEI:
            (imeiRef.current.value !== imei &&
              imeiRef.current.value !== "" &&
              imeiRef.current.value) ||
            imei,
          trackerSIM:
            (simRef.current.value !== sim &&
              simRef.current.value !== "" &&
              simRef.current.value) ||
            sim,
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
        setIsLoading(false);
        props.Close();
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="form-modal">
        <div className="form-overlay" onClick={props.Close}>
          {props.Close}
        </div>
        <div className="form-modal-content">
          <div className="full_container">
            <div className="container">
              <div className="center verticle_center full_height">
                <div className="login_section">
                  <div className="logo_login">
                    <div className="center">
                      <h1 className="heading">Updated Vehicle</h1>
                    </div>
                  </div>
                  <div className="register_form">
                    <p className="err-color">{error}</p>
                    <form className="px-4 mx-4">
                      <fieldset>
                        <div className="input-field ">
                          <label className="label_field">Plate Number</label>
                          <label className="label_field text-success">{`Current Plate Number is "${plate}"`}</label>
                          <input
                            className="input"
                            type="text"
                            name="Plate"
                            ref={plateNumberRef}
                            placeholder="ex. 08000000000"
                            onBlur={PlateNumberHandler}
                            onChange={PlateNumberHandler}
                          />
                          <p className="err-color">
                            {plateNumberError ? "Invalid Plate Number" : ""}
                          </p>
                        </div>
                        <div className="input-field ">
                          <label className="label_field">IMEI Number</label>
                          <label className="label_field text-success">{`Current IMEI Number is "${imei}"`}</label>
                          <input
                            className="input"
                            type="text"
                            ref={imeiRef}
                            onChange={ImeiHandler}
                            name="nin"
                            placeholder="61250945671"
                          />
                        </div>
                        <div className="input-field ">
                          <label className="label_field">SIM Number</label>
                          <label className="label_field text-success">{`Current SIM Number is "${sim}"`}</label>
                          <input
                            className="input"
                            type="text"
                            ref={simRef}
                            onChange={SimHandler}
                            name="SIM"
                            placeholder="61250945671"
                          />
                        </div>
                        <div className="input-field margin_0 btn-section">
                          <label className="label_field hidden">
                            hidden label
                          </label>
                          <div className="btn-sec">
                            <button
                              className="btn-danger cancel-btn"
                              onClick={props.Close}
                            >
                              Cancel
                            </button>
                            <div className="button">
                              <button
                                className="main_bt"
                                onClick={UpdateVehicle}
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

export default EditVehicle;
