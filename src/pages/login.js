import { useRef, useState } from "react";
import "../static/css/bootstrap.min.css";
import "../static/css/responsive.css";
import "../static/css/style.css";
import "../static/css/color_2.css";
import "../static/css/bootstrap-select.css";
import "../static/css/perfect-scrollbar.css";
import "../static/css/custom.css";
import { instance } from "../api";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [signInButtonActivated, setSignInButtonActivated] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const LoginUser = (e) => {
    e.preventDefault();

    instance
      .post(`auth/login`, {
        username: emailRef.current.value,
        password: passwordRef.current.value,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const EmailBlurHandler = () => {
    if (emailRef.current.value !== "" && emailRef.current.value.includes("@"))
      setEmailError(false);
    else setEmailError(true);
  };

  const PasswordBlurHandler = () => {
    if (passwordRef.current.value === "") setPasswordError(true);
    else setPasswordError(false);
  };

  const EmailHandler = () => {
    if (emailRef.current.value !== "" && emailRef.current.value.includes("@"))
      setEmailError(false);
    else setEmailError(true);

    if (emailError === true || passwordError === true)
      setSignInButtonActivated(false);
    else setSignInButtonActivated(true);
  };

  const PasswordHandler = () => {
    if (passwordRef.current.value === "") setPasswordError(true);
    else setPasswordError(false);

    if (emailError === true || passwordError === true)
      setSignInButtonActivated(false);
    else setSignInButtonActivated(true);
  };

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
                      name="email"
                      placeholder="E-mail"
                      onBlur={EmailBlurHandler}
                      onChange={EmailHandler}
                    />
                    <p>{emailError ? "Invalid Email Address" : ""}</p>
                  </div>
                  <div className="field">
                    <label className="label_field">Password</label>
                    <input
                      type="password"
                      ref={passwordRef}
                      name="password"
                      placeholder="Password"
                      onBlur={PasswordBlurHandler}
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
