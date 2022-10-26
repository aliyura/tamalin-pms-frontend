import { useRef, useState } from "react";
import instance from "../api";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../store/loginContext";
import "../static/css/users.css";
import Spinner from "../components/Spinner";

const ResetPassword = () => {
  const [phoneText, setPhoneText] = useState("");
  const [newPasswordText, setPasswordText] = useState("");
  const [currentPasswordText, setCurrentPasswordText] = useState("");
  const phoneRef = useRef();
  const newPasswordRef = useRef();
  const currentPasswordRef = useRef();
  const [signInButtonActivated, setSignInButtonActivated] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [newPasswordError, setPasswordError] = useState(false);
  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuthenticated } = useLoginContext();

  const navigate = useNavigate();

  const Reset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let token;
    await instance
      .post(`auth/login`, {
        username: phoneText,
        password: currentPasswordText,
      })
      .then((res) => {
        console.log(res.data);
        setIsAuthenticated(true);
        sessionStorage.setItem("token", res.data.data.access_token);
        token = sessionStorage.getItem("token");
        sessionStorage.setItem("isAuthenticated", "true");
        setIsLoading(false);
        setError("");
      });

    await instance
      .post(
        `user/password-reset`,
        {
          username: phoneText,
          newPassword: newPasswordText,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setIsAuthenticated(true);
        sessionStorage.setItem("token", res.data.data.access_token);
        sessionStorage.setItem("isAuthenticated", "true");
        navigate("/login");
        setIsLoading(false);
        setError("");
      })
      .catch((err) => {
        const { message } = err.response.data;
        console.log(err);
        console.log(message);
        setError(message);
        setIsLoading(false);
      });
  };

  const PhoneHandler = () => {
    setPhoneText(phoneRef.current.value);
    if (phoneText === "") {
      setPhoneError(true);
      setSignInButtonActivated(false);
    } else {
      setPhoneError(false);
      setSignInButtonActivated(
        newPasswordError && currentPasswordError ? false : true
      );
    }
  };

  const CurrentPasswordHandler = () => {
    setCurrentPasswordText(currentPasswordRef.current.value);
    if (currentPasswordText === "") {
      setCurrentPasswordError(true);
      setSignInButtonActivated(false);
    } else {
      setCurrentPasswordError(false);
      setSignInButtonActivated(phoneError && newPasswordError ? false : true);
    }
  };

  const NewPasswordHandler = () => {
    setPasswordText(newPasswordRef.current.value);
    if (newPasswordText === "") {
      setPasswordError(true);
      setSignInButtonActivated(false);
    } else {
      setPasswordError(false);
      setSignInButtonActivated(
        phoneError && currentPasswordError ? false : true
      );
    }
  };

  return (
    <div className="container">
      <div className="full_container">
        <div className="center verticle_center full_height">
          <div className="login_section">
            <div className="logo_login">
              <div className="center">
                <h1 className="heading">Reset Password</h1>
              </div>
            </div>
            <div className="login_form">
              <p className="err-color">{error}</p>
              <form onSubmit={Reset}>
                <fieldset>
                  <div className="field">
                    <label className="label_field">Phone Number</label>
                    <input
                      type="tel"
                      ref={phoneRef}
                      name="tel"
                      placeholder="Phone number"
                      onBlur={PhoneHandler}
                      onChange={PhoneHandler}
                    />
                    <p className="err-color">
                      {phoneError ? "Invalid Phone Number" : ""}
                    </p>
                  </div>
                  <div className="field">
                    <label className="label_field label">Current Password</label>
                    <input
                      type="password"
                      ref={currentPasswordRef}
                      name="current password"
                      placeholder="Current Password"
                      onBlur={CurrentPasswordHandler} 
                      onChange={CurrentPasswordHandler}
                    />
                    <p className="err-color">
                      {currentPasswordError ? "Current Password empty" : ""}
                    </p>
                  </div>
                  <div className="field">
                    <label className="label_field">New Password</label>
                    <input
                      type="texts"
                      ref={newPasswordRef}
                      name="password"
                      placeholder="Password"
                      onBlur={NewPasswordHandler}
                      onChange={NewPasswordHandler}
                    />
                    <p className="err-color">
                      {newPasswordError ? "Password empty" : ""}
                    </p>
                  </div>
                  <div className="field">
                    <label className="label_field hidden">hidden label</label>
                  </div>
                  <div className="field margin_0">
                    <label className="label_field hidden">hidden label</label>
                    {signInButtonActivated ? (
                      <button
                        className="main_bt"
                        disabled={isLoading}
                        style={{
                          backgroundColor: isLoading ? "#e6e6e6" : null,
                        }}
                        onClick={Reset}
                      >
                        {isLoading ? <Spinner /> : "Reset"}
                      </button>
                    ) : (
                      <p></p>
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

export default ResetPassword;
