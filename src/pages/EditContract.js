import React, { Fragment, useRef, useState } from "react";
import instance from "../api";
import "../static/css/users.css";
import "../static/css/list.css";
import Spinner from "../components/Spinner";

const EditContract = (props) => {
  const { discount, cuid } = props;
  const [error, setError] = useState(false);
  const [createButtonActivated, setSignInButtonActivated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [discountError, setDiscountError] = useState(false);
  const [discountText, setDicountText] = useState("");
  const discountRef = useRef();

  const discountHandler = (e) => {
    setDicountText(discountRef.current.value);
    if (discountText === "") {
      setDiscountError(true);
      setSignInButtonActivated(false);
    } else {
      setDiscountError(false);
      setSignInButtonActivated(true);
    }
  };

  const UpdateContract = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token = sessionStorage.getItem("token");
    await instance
      .put(
        `/contract/${cuid}`,
        {
          discount:
            (discountRef.current.value !== discount &&
              discountRef.current.value !== "" &&
              discountRef.current.value) ||
            discount,
        },
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        props.Close();
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="form-modal">
        <div className="form-overlay" onClick={props.Close}>
          {props.Close}
        </div>
        <div className="form-modal-content">
          <div className="full_container">
            <div className="container">
              <div className="center verticle_center full_height">
                <div className="login_section">
                  <div className="logo_login">
                    <div className="center">
                      <h1 className="heading">Updated Contract</h1>
                    </div>
                  </div>
                  <div className="register_form">
                    <p className="err-color">{error}</p>
                    <form className="px-4 mx-4">
                      <fieldset>
                        <div className="input-field ">
                          <label className="label_field">Discount</label>
                          <label className="label_field text-success">{`Current Plate Number is "${discount}"`}</label>
                          <input
                            className="input"
                            type="text"
                            name="Plate"
                            ref={discountRef}
                            placeholder="ex. 08000000000"
                            onBlur={discountHandler}
                            onChange={discountHandler}
                          />
                          <p className="err-color">
                            {discountError ? "Invalid Plate Number" : ""}
                          </p>
                        </div>
                        <div className="input-field margin_0 btn-section">
                          <label className="label_field hidden">
                            hidden label
                          </label>
                          <div className="btn-sec">
                            <button
                              className="btn-danger cancel-btn"
                              onClick={props.Close}
                            >
                              Cancel
                            </button>
                            <div className="button">
                              <button
                                className="main_bt"
                                onClick={UpdateContract}
                                disabled={isLoading}
                                style={{
                                  backgroundColor: isLoading ? "#e6e6e6" : null,
                                }}
                              >
                                {isLoading ? <Spinner /> : "Update Contract"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditContract;
