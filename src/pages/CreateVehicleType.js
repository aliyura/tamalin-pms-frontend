import { useRef, useState } from "react";
import instance from "../api";
import { useNavigate } from "react-router-dom";
import "../static/css/users.css";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const CreateVehicleType = () => {
  const [titleText, setTitleText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const titleRef = useRef();
  const descriptionRef = useRef();
  const [createButtonActivated, setSignInButtonActivated] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const RegisterVehicleType = async () => {
    setIsLoading(true);
    const token = sessionStorage.getItem("token");
    await instance
      .post(
        `/vehicle-type`,
        {
          title:
            titleRef.current.value === "" ? "Empty" : titleRef.current.value,
          description: descriptionRef.current.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success("Request Successful")
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        console.log(err)
        const data = err.response.data;
        toast.error(data.message)
        setIsLoading(false);
      });
  };

  const TitleHandler = () => {
    setTitleText(titleRef.current.value);
    if (titleText === "") {
      setTitleError(true);
      setSignInButtonActivated(false);
    } else {
      setTitleError(false);
      setSignInButtonActivated(descriptionError ? false : true);
    }
  };

  const DescriptionHandler = () => {
    setDescriptionText(descriptionRef.current.value);
    if (descriptionText === "") {
      setDescriptionError(true);
      setSignInButtonActivated(false);
    } else {
      setDescriptionError(false);
      setSignInButtonActivated(titleError ? false : true);
    }
  };

  return (
    <div className="full_container">
      <div className="container mx-0 my-4">
        <div className="left full_height">
          <div className="login_section">
            <div className="logo_login">
              <div className="center">
                <h1 className="heading">Create Vehicle Type</h1>
              </div>
            </div>
            <div className="register_form">
              <p className="err-color">{error}</p>
              <div className="px-4 mx-4">
                <fieldset>
                  <div className="input-field ">
                    <label className="label_field">Title</label>
                    <input
                      className="input"
                      type="text"
                      ref={titleRef}
                      name="name"
                      placeholder="ex. Motorcycle"
                      onBlur={TitleHandler}
                      onChange={TitleHandler}
                    />
                    <p className="err-color">
                      {titleError ? "Invalid Title" : ""}
                    </p>
                  </div>
                  <div className="input-field ">
                    <label className="label_field">Description</label>
                    <input
                      className="input"
                      type="text"
                      name="description"
                      ref={descriptionRef}
                      placeholder="Describe this type of vehicle"
                      onBlur={DescriptionHandler}
                      onChange={DescriptionHandler}
                    />
                    <p className="err-color">
                      {descriptionError ? "Invalid Description" : ""}
                    </p>
                  </div>
                  <div className="m-1">
                    <div className="col-12 text-right m-4">
                      <button
                        className="main_bt text-nowrap"
                        onClick={RegisterVehicleType}
                        disabled={isLoading}
                        style={{
                          backgroundColor: isLoading ? "#e6e6e6" : null,
                        }}
                      >
                        {isLoading ? <Spinner /> : "Create Vehicle Type"}
                      </button>
                    </div>

                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateVehicleType;
