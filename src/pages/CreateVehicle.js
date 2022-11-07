import { useRef, useState } from "react";
import instance from "../api";
import { useNavigate } from "react-router-dom";
import "../static/css/users.css";
import Spinner from "../components/Spinner";

const CreateVehicle = () => {
  const [modelText, setModelText] = useState("");
  const [plateNumberText, setPlateNumberText] = useState("");
  const [identityNumberText, setidentityNumberText] = useState("");
  const [imeiText, setImeiText] = useState("");
  const [simText, setSimText] = useState("");
  const modelRef = useRef();
  const plateNumberRef = useRef();
  const identityNumberRef = useRef();
  const imeiRef = useRef();
  const simRef = useRef();
  const [createButtonActivated, setSignInButtonActivated] = useState(false);
  const [plateNumberError, setPlateNumberError] = useState(false);
  const [identityNumberError, setIdentityNumberError] = useState(false);
  const [error, setError] = useState("");
  // const { setisAuthenticated } = useLoginContext();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const Registervehicle = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token = sessionStorage.getItem("token");
    await instance
      .post(
        `/vehicle`,
        {
          model:
            modelRef.current.value === "" ? "Empty" : modelRef.current.value,
          plateNumber: plateNumberRef.current.value,
          identityNumber: identityNumberRef.current.value,
          trackerIMEI:
            imeiRef.current.value === "" ? "Empty" : imeiRef.current.value,
          trackerSIM:
            simRef.current.value === "" ? "Empty" : simRef.current.value,
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
        navigate("/");
        setIsLoading(false);
      })
      .catch((err) => {
        // const { message } = err.response.data;
        console.log(err);
        // setError(message);
        setIsLoading(false);
      });
  };

  const ModelHandler = () => {
    setModelText(modelRef.current.value);
  };

  const PlateNumberHandler = () => {
    setPlateNumberText(plateNumberRef.current.value);
    if (plateNumberText === "") {
      setPlateNumberError(true);
      setSignInButtonActivated(false);
    } else {
      setPlateNumberError(false);
      setSignInButtonActivated(identityNumberError ? false : true);
    }
  };

  const identityNumberHandler = () => {
    setidentityNumberText(identityNumberRef.current.value);
    if (identityNumberText === "") {
      setIdentityNumberError(true);
      setSignInButtonActivated(false);
    } else {
      setIdentityNumberError(false);
      setSignInButtonActivated(plateNumberError ? false : true);
    }
  };

  const ImeiHandler = () => {
    setImeiText(imeiRef.current.value);
  };

  const SimHandler = () => {
    setSimText(simRef.current.value);
  };

  return (
    <div className="full_container">
      <div className="container">
        <div className="center verticle_center full_height">
          <div className="login_section">
            <div className="logo_login">
              <div className="center">
                <h1 className="heading">Create Vehicle</h1>
              </div>
            </div>
            <div className="register_form">
              <p className="err-color">{error}</p>
              <form onSubmit={Registervehicle} className="px-4 mx-4">
                <fieldset>
                  <div className="input-field ">
                    <label className="label_field">Model</label>
                    <input
                      className="input"
                      type="text"
                      ref={modelRef}
                      name="name"
                      placeholder="ex. Chrysler"
                      onBlur={ModelHandler}
                      onChange={ModelHandler}
                    />
                  </div>
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
                    <label className="label_field">Identity Number</label>
                    <input
                      className="input"
                      type="text"
                      ref={identityNumberRef}
                      name="id-number"
                      // placeholder="Password"
                      onBlur={identityNumberHandler}
                      onChange={identityNumberHandler}
                    />
                    <p className="err-color">
                      {identityNumberError ? "Identity Number empty" : ""}
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
                          onClick={Registervehicle}
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

export default CreateVehicle;
