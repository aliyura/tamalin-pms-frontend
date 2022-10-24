import { useEffect, useRef, useState } from "react";
import "../static/css/bootstrap.min.css";
import "../static/css/responsive.css";
import "../static/css/style.css";
import "../static/css/color_2.css";
import "../static/css/bootstrap-select.css";
import "../static/css/perfect-scrollbar.css";
import "../static/css/custom.css";
import "../static/css/users.css";
import instance from "../api";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../store/loginContext";

const Login = (props) => {
  const [phoneText, setPhoneText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const phoneRef = useRef();
  const passwordRef = useRef();
  const [signInButtonActivated, setSignInButtonActivated] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { setIsAuthenticated } = useLoginContext();
  const navigate = useNavigate();

  // useEffect(() => {
  //   props.login(true);
  // }, []);

  const LoginUser = async (e) => {
    e.preventDefault();

    await instance
      .post(`auth/login`, {
        username: phoneText,
        password: passwordText,
      })
      .then((res) => {
        console.log(res.data);
        setIsAuthenticated(true);
        sessionStorage.setItem("token", res.data.data.access_token);
        const token = sessionStorage.getItem("token");
        sessionStorage.setItem("isAuthenticated", "true");
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
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
    <div className="full_container">
      <div className="container">
        <div className="center verticle_center full_height">
          <div className="login_section">
            <div className="logo_login">
              <div className="center">
                <h1 className="heading">Login</h1>
                {/* <img width="210" src="assets/images/logo/logo.png" alt="#" /> */}
              </div>
            </div>
            <div className="login_form">
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
                  <div className="field">
                    <label className="label_field hidden">hidden label</label>
                    <label className="form-check-label">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        placeholder="Remember Me"
                      />
                    </label>
                    <a className="forgot" href="#">
                      Forgotten Password?
                    </a>
                  </div>
                  <div className="field margin_0">
                    <label className="label_field hidden">hidden label</label>

                    {signInButtonActivated ? (
                      <button className="main_bt" onClick={LoginUser}>
                        Sign In
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
