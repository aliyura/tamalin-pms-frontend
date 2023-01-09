import { useRef, useState } from "react";
import instance from "../api";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../store/loginContext";
import "../static/css/users.css";
import Spinner from "../components/Spinner";
import tamalinlogo from '../static/images/logo/tamalinlogo.jpg'

const Login = () => {
  const [phoneText, setPhoneText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const phoneRef = useRef();
  const passwordRef = useRef();
  const [signInButtonActivated, setSignInButtonActivated] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuthenticated } = useLoginContext();

  const navigate = useNavigate();

  const LoginUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await instance
      .post(`auth/login`, {
        username: phoneText,
        password: passwordText,
      })
      .then((res) => {
        console.log(res.data);
        setIsAuthenticated(true);
        sessionStorage.setItem("token", res.data.data.access_token);
        sessionStorage.setItem("isAuthenticated", "true");
        navigate("/");
        setIsLoading(false);
        setError("");
      })
      .catch((err) => {
        const { message } = err.response.data;
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
      setSignInButtonActivated(passwordError ? false : true);
    }
  };

  const PasswordHandler = () => {
    setPasswordText(passwordRef.current.value);
    if (passwordText === "") {
      setPasswordError(true);
      setSignInButtonActivated(false);
    } else {
      setPasswordError(false);
      setSignInButtonActivated(phoneError ? false : true);
    }
  };

  return (
    <div className="container">
      <div className="full_container">
        <div className="center verticle_center full_height">
          <div className="login_section">
            <div className="logo_login">
              <div className="center">
                <h1 className="heading">Login</h1>
                <img width="100" src={tamalinlogo} alt="#" />
              </div>
            </div>
            <div className="login_form">
              <p className="err-color">{error}</p>
              <form onSubmit={LoginUser}>
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
                    <label className="label_field">Password</label>
                    <input
                      type="password"
                      ref={passwordRef}
                      name="password"
                      placeholder="Password"
                      onBlur={PasswordHandler}
                      onChange={PasswordHandler}
                    />
                    <p className="err-color">
                      {passwordError ? "Password empty" : ""}
                    </p>
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
                        onClick={LoginUser}
                      >
                        {isLoading ? <Spinner /> : "Sign In"}
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

export default Login;

// Login page doesn't show error message - DONE
// Disable Login Button when clicked - DONE
