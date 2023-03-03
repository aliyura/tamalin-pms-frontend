import { useRef, useState } from "react";
import instance from "../api";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../store/loginContext";
import "../static/css/users.css";
import Spinner from "../components/Spinner";

const CreateAdmin = () => {
  const [nameText, setNameText] = useState("");
  const [phoneText, setPhoneText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [ninText, setNinText] = useState("");
  const phoneRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const ninRef = useRef();
  const [createButtonActivated, setSignInButtonActivated] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [ninError, setNinError] = useState(false);
  const [error, setError] = useState("");
  const { setisAuthenticated } = useLoginContext();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const CreateUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token = sessionStorage.getItem("token");
    await instance
      .post(
        `/user`,
        {
          name: nameRef.current.value,
          phoneNumber: phoneRef.current.value,
          password: passwordRef.current.value,
          nin: ninRef.current.value,
          role: "ADMIN".toUpperCase(),
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
        setIsLoading(false);
      })
      .catch((err) => {
        const { message } = err.response.data;
        setError(message);
        setIsLoading(false);
      });
  };

  const NameHandler = () => {
    setNameText(nameRef.current.value);
    if (nameText === "") {
      setNameError(true);
      setSignInButtonActivated(false);
    } else {
      setNameError(false);
      setSignInButtonActivated(
        passwordError && phoneError && ninError ? false : true
      );
    }
  };

  const PhoneHandler = () => {
    setPhoneText(phoneRef.current.value);
    if (phoneText.length != 11) {
      setPhoneError(true);
      setSignInButtonActivated(false);
    } else {
      setPhoneError(false);
      setSignInButtonActivated(
        passwordError && nameError && ninError ? false : true
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
        phoneError && ninError && nameError ? false : true
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
        phoneError && nameError && passwordError ? false : true
      );
    }
  };

  return (
    <div className="full_container">
      <div className="container">
        <div className="left verticle_center full_height my-4">
          <div className="login_section">
            <div className="logo_login">
              <div className="center">
                <h1 className="heading">Create Admin</h1>
              </div>
            </div>
            <div className="register_form">
              <p className="err-color px-4 mx-4">{error}</p>
              <form onSubmit={CreateUser} className="px-4 mx-4">
                <fieldset>
                  <div className="input-field">
                    <label className="">Full Name</label>
                    <input
                      className="input"
                      type="text"
                      ref={nameRef}
                      name="name"
                      placeholder="ex. John Doe"
                      onBlur={NameHandler}
                      onChange={NameHandler}
                    />
                    <p className="err-color">{nameError ? "Name empty" : ""}</p>
                  </div>
                  <div className="input-field">
                    <label className="label_field">Phone Number</label>
                    <input
                      className="input"
                      type="tel"
                      ref={phoneRef}
                      name="tel"
                      placeholder="ex. 08000000000"
                      maxlength="11"
                      onChange={PhoneHandler}
                      autocomplete="off"
                    />
                    <p className="err-color">
                      {phoneError ? "Invalid Phone Number" : ""}
                    </p>
                  </div>
                  <div className="input-field">
                    <label className="label_field">Password</label>
                    <input
                      className="input"
                      type="password"
                      ref={passwordRef}
                      name="password"
                      placeholder="****"
                      onBlur={PasswordHandler}
                      onChange={PasswordHandler}
                    
                    />
                    <p className="err-color">
                      {passwordError ? "Password empty" : ""}
                    </p>
                  </div>
                  <div className="input-field">
                    <label className="label_field">NIN</label>
                    <input
                      className="input"
                      type="text"
                      ref={ninRef}
                      name="nin"
                      placeholder="61250945671"
                      onBlur={ninHandler}
                      onChange={ninHandler}
                    />
                    <p className="err-color">{ninError ? "NIN empty" : ""}</p>
                  </div>
                 
                  <div className="m-1">
                      <div className="col-12 text-right m-4">
                        <button
                        className="main_bt"
                        onClick={CreateUser}
                        disabled={isLoading}
                        style={{
                          backgroundColor: isLoading ? "#e6e6e6" : null,
                        }}
                      >
                        {isLoading ? <Spinner /> : "Create User"}
                        </button>
                      </div>
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

export default CreateAdmin;
