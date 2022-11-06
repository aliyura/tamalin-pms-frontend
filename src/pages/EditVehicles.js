import { useRef, useState } from "react";
import instance from "../api";
import "../static/css/users.css";
import "../static/css/editvehicles.css";
import Spinner from "../components/Spinner";

const EditVehicle = (props) => {
  const [plateNumberText, setPlateNumberText] = useState("");
  const [imeiText, setImeiText] = useState("");
  const [simText, setSimText] = useState("");
  const plateNumberRef = useRef();
  const imeiRef = useRef();
  const simRef = useRef();
  const [createButtonActivated, setSignInButtonActivated] = useState(false);
  const [plateNumberError, setPlateNumberError] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const PlateNumberHandler = () => {
    setPlateNumberText(plateNumberRef.current.value);
    if (plateNumberText === "") {
      setPlateNumberError(true);
      setSignInButtonActivated(false);
    } else {
      setPlateNumberError(false);
      //   setSignInButtonActivated(identityNumberError ? false : true);
    }
  };

  const ImeiHandler = () => {
    setImeiText(imeiRef.current.value);
  };

  const SimHandler = () => {
    setSimText(simRef.current.value);
  };

  return (
    <div className="full_container modal">
      <div className="container">
        <div className="center verticle_center full_height">
          <div className="login_section">
            <div className="logo_login">
              <div className="center">
                <h1 className="heading">Edit Vehicle</h1>
              </div>
            </div>
            <div className="register_form">
              <p className="err-color">{error}</p>
              <form className="px-4 mx-4">
                <fieldset>
                  <div className="input-field ">
                    <label className="label_field">Plate Number</label>
                    <input
                      className="input"
                      type="number"
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
                    <input
                      className="input"
                      type="text"
                      ref={imeiRef}
                      name="nin"
                      placeholder="61250945671"
                      onBlur={ImeiHandler}
                      onChange={ImeiHandler}
                    />
                  </div>
                  <div className="input-field ">
                    <label className="label_field">SIM Number</label>
                    <input
                      className="input"
                      type="text"
                      ref={simRef}
                      name="nin"
                      placeholder="61250945671"
                      onBlur={SimHandler}
                      onChange={SimHandler}
                    />
                  </div>
                  <div className="input-field margin_0 btn-section">
                    <label className="label_field hidden">hidden label</label>
                    {createButtonActivated ? (
                      <div className="button">
                        <button
                          className="main_bt"
                          onClick={async (e) => {
                            e.preventDefault();
                            props.setIsOpen(true);
                            const token = sessionStorage.getItem("token");

                            await instance
                              .put(
                                `vehicle/${props.vuid}`,
                                {
                                  plateNumber: plateNumberRef.current.value,
                                  trackerIMEI:
                                    imeiRef.current.value === ""
                                      ? "Empty"
                                      : imeiRef.current.value,
                                  trackerSIM:
                                    simRef.current.value === ""
                                      ? "Empty"
                                      : simRef.current.value,
                                },
                                {
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                  },
                                }
                              )
                              .then((res) => {
                                console.log(res);
                                props.setIsOpen(false);
                                setIsLoading(false);
                              })
                              .catch((err) => {
                                console.log(err);
                                props.setIsOpen(true);
                                setIsLoading(false);
                              });
                          }}
                          disabled={isLoading}
                          style={{
                            backgroundColor: isLoading ? "#e6e6e6" : null,
                          }}
                        >
                          {isLoading ? <Spinner /> : "Create Vehicle"}
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditVehicle;
