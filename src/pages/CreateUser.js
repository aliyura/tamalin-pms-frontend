import { useRef, useState } from "react";
import instance from "../api";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../store/loginContext";

const CreateUser = ({role}) => {
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
          role: {role}
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
                <h1 className="heading text-white">Register {role}</h1>
              </div>
            </div>
            <div className="register_form">
              <p className="err-color">{error}</p>
              <form onSubmit={CreateUser} className="px-4 mx-4">
                <fieldset>
                  <div className="field m-2 mb-4">
                    <label className="label_field">Full Name</label>
                    <input
                      type="text"
                      ref={nameRef}
                      name="name"
                      onBlur={NameHandler}
                      onChange={ NameHandler }
                      className="form-control mr-4"
                    />
                    <p className="err-color">{nameError ? "Name empty" : ""}</p>
                  </div>
                  <div className="field m-2 mb-4">
                    <label className="label_field">Phone Number</label>
                    <input
                      type="tel"
                      name="tel"
                      // placeholder="Phone Number"
                      onBlur={PhoneHandler}
                      onChange={ PhoneHandler }
                      className="form-control mr-4"
                    />
                    <p className="err-color">
                      {phoneError ? "Invalid Phone Number" : ""}
                    </p>
                  </div>
                  <div className="field m-2 mb-4">
                    <label className="label_field">Password</label>
                    <input
                      type="password"
                      ref={passwordRef}
                      name="password"
                      // placeholder="Password"
                      onBlur={PasswordHandler}
                      onChange={ PasswordHandler }
                      className="form-control mr-4"
                    />
                    <p className="err-color">
                      {passwordError ? "Password empty" : ""}
                    </p>
                  </div>
                  <div className="field m-2 mb-4">
                    <label className="label_field">NIN</label>
                    <input
                      type="text"
                      ref={ninRef}
                      name="nin"
                      placeholder="National Identity Number"
                      onBlur={ninHandler}
                      onChange={ ninHandler }
                      className="form-control mr-4"
                    />
                    <p className="err-color">{ninError ? "NIN empty" : ""}</p>
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
