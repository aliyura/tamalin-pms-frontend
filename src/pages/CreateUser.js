import { useRef, useState } from "react";
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

const CreateUser = () => {
  const [nameText, setNameText] = useState("");
  const [phoneText, setPhoneText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [ninText, setNinText] = useState("");
  const [roleText, setRoleText] = useState("");
  const phoneRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const ninRef = useRef();
  const roleRef = useRef();
  const [createButtonActivated, setSignInButtonActivated] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [ninError, setNinError] = useState(false);
  const [roleError, setRoleError] = useState(false);
  const [error, setError] = useState("");
  const { setisAuthenticated } = useLoginContext();
  const [createIsClicked, setCreateIsClicked] = useState(false);
  const navigate = useNavigate();

  const CreateUser = async (e) => {
    e.preventDefault();
    setCreateIsClicked(true);
    const token = sessionStorage.getItem("token");
    await instance
      .post(
        `/user`,
        {
          name: nameRef.current.value,
          phoneNumber: phoneRef.current.value,
          password: passwordRef.current.value,
          nin: ninRef.current.value,
          role: roleRef.current.value,
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
        setisAuthenticated(true);
        navigate("/");
        setCreateIsClicked(false);
      })
      .catch((err) => {
        const { message } = err.response.data;
        setError(message);
        setCreateIsClicked(false);
        console.log(err);
      });

    console.log(roleText.toUpperCase());
  };

  const NameHandler = () => {
    setNameText(nameRef.current.value);
    if (phoneText === "") {
      setNameError(true);
      setSignInButtonActivated(false);
    } else {
      setNameError(false);
      setSignInButtonActivated(
        passwordError && phoneError && ninError && roleError ? false : true
      );
    }
  };

  const PhoneHandler = () => {
    setPhoneText(phoneRef.current.value);
    if (phoneText === "") {
      setPhoneError(true);
      setSignInButtonActivated(false);
    } else {
      setPhoneError(false);
      setSignInButtonActivated(
        passwordError && nameError && ninError && roleError ? false : true
      );
    }
  };

  const PasswordHandler = () => {
    setPasswordText(passwordRef.current.value);
    if (passwordText === "") {
      setPasswordError(true);
      setSignInButtonActivated(false);
    } else {
      setPasswordError(false);
      setSignInButtonActivated(
        phoneError && ninError && nameError && roleError ? false : true
      );
    }
  };

  const ninHandler = () => {
    setNinText(ninRef.current.value);
    if (ninText === "") {
      setNinError(true);
      setSignInButtonActivated(false);
    } else {
      setNinError(false);
      setSignInButtonActivated(
        phoneError && roleError && nameError && passwordError ? false : true
      );
    }
  };
  const roleHandler = () => {
    setRoleText(roleRef.current.value);
    if (passwordText === "") {
      setRoleError(true);
      setSignInButtonActivated(false);
    } else {
      setRoleError(false);
      setSignInButtonActivated(
        phoneError && passwordError && ninError && nameError ? false : true
      );
    }
  };

  return (
    <div className="full_container">
      <div className="container">
        <div className="center verticle_center full_height">
          <div className="login_section">
            <div className="logo_login">
              <div className="center">
                {/* <img width="210" src="assets/images/logo/logo.png" alt="#" /> */}
                <h1 className="heading">Register User</h1>
              </div>
            </div>
            <div className="login_form">
              <p className="err-color">{error}</p>
              <form onSubmit={CreateUser}>
                <fieldset>
                  <div className="field">
                    <label className="label_field">Full Name</label>
                    <input
                      type="text"
                      ref={nameRef}
                      name="name"
                      placeholder="Full Name"
                      onBlur={NameHandler}
                      onChange={NameHandler}
                    />
                    <p>{nameText}</p>
                    <p className="err-color">{nameError ? "Name empty" : ""}</p>
                  </div>
                  <div className="field">
                    <label className="label_field">Phone Number</label>
                    <input
                      type="tel"
                      ref={phoneRef}
                      name="tel"
                      placeholder="Phone Number"
                      onBlur={PhoneHandler}
                      onChange={PhoneHandler}
                    />
                    <p>{phoneText}</p>
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
                    <p>{passwordText}</p>
                    <p className="err-color">
                      {passwordError ? "Password empty" : ""}
                    </p>
                  </div>
                  <div className="field">
                    <label className="label_field">NIN</label>
                    <input
                      type="text"
                      ref={ninRef}
                      name="nin"
                      placeholder="National Identity Number"
                      onBlur={ninHandler}
                      onChange={ninHandler}
                    />
                    <p>{ninText}</p>
                    <p className="err-color">{ninError ? "NIN empty" : ""}</p>
                  </div>
                  <div className="field">
                    <label className="label_field">Role</label>
                    <select
                      id="cars"
                      ref={roleRef}
                      onChange={roleHandler}
                      onBlur={roleHandler}
                    >
                      <option value=""></option>
                      <option value="admin">ADMIN</option>
                      <option value="agent">AGENT</option>
                    </select>
                    <p>{roleText}</p>
                    <p className="err-color">
                      {roleError ? "Choose a Role" : ""}
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

                    {createButtonActivated ? (
                      <button
                        className="main_bt"
                        onClick={CreateUser}
                        disabled={createIsClicked ? true : false}
                        style={{
                          backgroundColor: createIsClicked ? "#e6e6e6" : null,
                        }}
                      >
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

export default CreateUser;
