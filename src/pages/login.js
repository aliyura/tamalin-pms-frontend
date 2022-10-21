import { useEffect, useRef, useState } from "react";
import "../static/css/bootstrap.min.css";
import "../static/css/responsive.css";
import "../static/css/style.css";
import "../static/css/color_2.css";
import "../static/css/bootstrap-select.css";
import "../static/css/perfect-scrollbar.css";
import "../static/css/custom.css";
import instance from "../api";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../store/loginContext";

const Login = () => {
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const [signInButtonActivated, setSignInButtonActivated] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { setisAuthenticated } = useLoginContext();
  const navigate = useNavigate();

  const LoginUser = async (e) => {
    e.preventDefault();

    await instance
      .post(`auth/login`, {
        username: emailText,
        password: passwordText,
      })
      .then((res) => {
        console.log(`Successfully logged in ${res}`);
        setisAuthenticated(true);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // const EmailBlurHandler = () => {
  //   EmailHandler();
  //   // if (emailText === "") {
  //   //   // if (emailRef.current.value === "") {
  //   //   setEmailError(true);
  //   // } else setEmailError(false);
  // };

  // const PasswordBlurHandler = () => {
  //   PasswordHandler();
  //   // if (passwordText === "") {
  //   //   // if (passwordRef.current.value === "") {
  //   //   setPasswordError(true);
  //   // } else setPasswordError(false);
  // };

  let formIsValid = false;

  const EmailHandler = () => {
    setEmailText(emailRef.current.value);
    if (emailText === "") {
      // if (emailRef.current.value === "") {
      setEmailError(true);
      setSignInButtonActivated(false);
    } else {
      setEmailError(false);
      setSignInButtonActivated(passwordError ? false : true);
    }

    // validate();
    // setSignInButtonActivated(formIsValid);
  };

  const PasswordHandler = () => {
    setPasswordText(passwordRef.current.value);
    if (passwordText === "") {
      setPasswordError(true);
      setSignInButtonActivated(false);
    } else {
      setPasswordError(false);
      setSignInButtonActivated(emailError ? false : true);
    }

    // validate();
    // setSignInButtonActivated(formIsValid);
  };

  // const validate = () => {
  //   if (emailError === true || passwordError === true) formIsValid = false;
  //   // setSignInButtonActivated(false);
  //   if (emailError === false && passwordError === false) formIsValid = true;
  //   // setSignInButtonActivated(true);
  // };

  return (
    <div className="full_container">
      <div className="container">
        <div className="center verticle_center full_height">
          <div className="login_section">
            <div className="logo_login">
              <div className="center">
                <img width="210" src="assets/images/logo/logo.png" alt="#" />
              </div>
            </div>
            <div className="login_form">
              <form onSubmit={LoginUser}>
                <fieldset>
                  <div className="field">
                    <label className="label_field">Email Address</label>
                    <input
                      type="email"
                      ref={emailRef}
                      // value={emailText}
                      name="email"
                      placeholder="E-mail"
                      onBlur={EmailHandler}
                      onChange={EmailHandler}
                    />
                    <p>{emailError ? "Invalid Email Address" : ""}</p>
                  </div>
                  <div className="field">
                    <label className="label_field">Password</label>
                    <input
                      type="password"
                      ref={passwordRef}
                      // value={passwordText}
                      name="password"
                      placeholder="Password"
                      onBlur={PasswordHandler}
                      onChange={PasswordHandler}
                    />
                    <p>{passwordError ? "Password empty" : ""}</p>
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

export default Login;
