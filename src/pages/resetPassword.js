import { useRef, useState } from "react";
import instance from "../api";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../store/loginContext";
import "../static/css/users.css";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const ResetPassword = (props) => {
  const [confirmPasswordText, setConfirmPasswordText] = useState("");
  const [newPasswordText, setNewPasswordText] = useState("");
  const confirmPasswordRef = useRef();
  const newPasswordRef = useRef();
  const [newPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordError, setNewPasswordError] = useState(false);
  const [signInButtonActivated, setSignInButtonActivated] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuthenticated } = useLoginContext();

  const navigate = useNavigate();

  const Reset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token = sessionStorage.getItem("token");
    await instance
      .post(
        `user/password-reset`,
        {
          username: props.username,
          newPassword: confirmPasswordText,
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
        navigate("/");
        setIsLoading(false);
        setError("");
      })
      .catch((err) => {
         console.log(err)
        const data  = err.response.data;
        toast.error(data.message)
        console.log(err);

        setIsLoading(false);
      });
  };

  const NewPasswordHandler = () => {
    setNewPasswordText(newPasswordRef.current.value);
    if (newPasswordText === "") {
      setNewPasswordError(true);
      setSignInButtonActivated(false);
    } else {
      setNewPasswordError(false);
      setSignInButtonActivated(
        newPasswordError || newPasswordText !== confirmPasswordText
          ? false
          : true
      );
    }
  };

  const ConfirmPasswordHandler = () => {
    setConfirmPasswordText(confirmPasswordRef.current.value);
    if (confirmPasswordText === "") {
      setConfirmPasswordError(true);
      setSignInButtonActivated(false);
    } else {
      setConfirmPasswordError(false);
      setSignInButtonActivated(
        confirmPasswordError || confirmPasswordText !== newPasswordText
          ? false
          : true
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
                    <label className="label_field label">New Password</label>
                    <input
                      type="password"
                      ref={newPasswordRef}
                      name="current password"
                      placeholder="Current Password"
                      onBlur={NewPasswordHandler}
                      onChange={NewPasswordHandler}
                    />
                    <p className="err-color">
                      {confirmPasswordError ? "Current Password empty" : ""}
                    </p>
                  </div>
                  <div className="field">
                    <label className="label_field label">Confirm Password</label>
                    <input
                      type="password"
                      ref={confirmPasswordRef}
                      name="password"
                      placeholder="Password"
                      onBlur={ConfirmPasswordHandler}
                      onChange={ConfirmPasswordHandler}
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
