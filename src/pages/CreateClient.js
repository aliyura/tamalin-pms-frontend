import { useRef, useState } from "react";
import instance from "../api";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../store/loginContext";
import "../static/css/users.css";
import Spinner from "../components/Spinner";

const CreateClient = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [identity, setIdentity] = useState("");
  const [identityType, setIdentityType] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [photograph, setPhotograph] = useState("");
  
   const [guarantorName, setGuarantorName] = useState("");
   const [guarantorPhone, setGuarantorPhone] = useState("");
   const [guarantorIdentity, setGuarantorIdentity] = useState("");
   const [guarantoIdentityNumber, setGuarantorIdentityNumber] = useState("");
   const [guarantorIdentityType, setGuarantorIdentityType] = useState("");
   const [guarantorPhotograph, setGuarantorPhotograph] = useState("");
   const [guarantorRelationship, setGuarantorRalationship] = useState("");
   const [guarantorAddress, setGuarantorAddress] = useState("");
  
  
    
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
        `/client`,
        {
          name: nameRef.current.value,
          phoneNumber: phoneRef.current.value,
          password: passwordRef.current.value,
          nin: ninRef.current.value,
          role: "AGENT".toUpperCase(),
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

//   const NameHandler = () => {
//     setName(nameRef.current.value);
//     if (nameText === "") {
//       setNameError(true);
//       setSignInButtonActivated(false);
//     } else {
//       setNameError(false);
//       setSignInButtonActivated(
//         passwordError && phoneError && ninError ? false : true
//       );
//     }
//   };

//   const PhoneHandler = () => {
//     setPhoneText(phoneRef.current.value);
//     if (phoneText === "") {
//       setPhoneError(true);
//       setSignInButtonActivated(false);
//     } else {
//       setPhoneError(false);
//       setSignInButtonActivated(
//         passwordError && nameError && ninError ? false : true
//       );
//     }
//   };

//   const PasswordHandler = () => {
//     setPasswordText(passwordRef.current.value);
//     if (passwordText === "") {
//       setPasswordError(true);
//       setSignInButtonActivated(false);
//     } else {
//       setPasswordError(false);
//       setSignInButtonActivated(
//         phoneError && ninError && nameError ? false : true
//       );
//     }
//   };

//   const ninHandler = () => {
//     setNinText(ninRef.current.value);
//     if (ninText === "") {
//       setNinError(true);
//       setSignInButtonActivated(false);
//     } else {
//       setNinError(false);
//       setSignInButtonActivated(
//         phoneError && nameError && passwordError ? false : true
//       );
//     }
//   };

  return (
    <div className="full_container">
      <div className="container">
        <div className="center verticle_center full_height">
          <div className="login_section">
            <div className="logo_login">
              <div className="center">
                <h1 className="heading">Register Client</h1>
              </div>
            </div>
            <div className="register_form">
              <p className="err-color">{error}</p>
              <form onSubmit={CreateUser} className="px-4 mx-4">
                <fieldset>
                    <div className="row">
                        <div className="col-md-6 col-sm-12 mt-2">
                            <div className="input-field ">
                                <label className="label_field">Full Name</label>
                                <input
                                className="input"
                                type="text"
                                ref={nameRef}
                                name="name"
                                placeholder="ex. John Doe"
                                />
                            </div>
                        </div>
                        
                        <div className="col-md-6 col-sm-12 mt-2">
                            <div className="input-field ">
                                <label className="label_field">Phone</label>
                                <input
                                className="input"
                                type="tel"
                                ref={nameRef}
                                name="name"
                                />
                            </div>
                         </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-md-6 col-sm-12 mt-2">
                            <div className="input-field ">
                                <label className="label_field">Identity Type</label>
                                <input
                                className="input"
                                type="text"
                                ref={nameRef}
                                name="name"
                                placeholder="ex. John Doe"
                                />
                            </div>
                        </div>
                        
                        <div className="col-md-6 col-sm-12 mt-2">
                            <div className="input-field ">
                                <label className="label_field">Identity Number</label>
                                <input
                                className="input"
                                type="number"
                                ref={nameRef}
                                name="name"
                                />
                            </div>
                         </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-md-6 col-sm-12 mt-2">
                            <div className="input-field ">
                                <label className="label_field">Passport</label>
                                <input
                                className="file"
                                type="file"
                                ref={nameRef}
                                name="name"
                                />
                            </div>
                        </div>
                        
                        <div className="col-md-6 col-sm-12 mt-2">
                            <div className="input-field ">
                                <label className="label_field">Identity Card</label>
                                <input
                                type="file"
                                ref={nameRef}
                                name="name"
                                />
                            </div>
                         </div>
                    </div>
                    
                                  

                    <div className="row">
                        <div className="col-md-6 col-sm-12 mt-2">
                            <div className="input-field ">
                                <label className="label_field">Guarantor's Full Name</label>
                                <input
                                className="input"
                                type="text"
                                ref={nameRef}
                                name="name"
                                placeholder="ex. John Doe"
                                />
                            </div>
                        </div>
                        
                        <div className="col-md-6 col-sm-12 mt-2">
                            <div className="input-field ">
                                <label className="label_field">Guarantor's Phone</label>
                                <input
                                className="input"
                                type="tel"
                                ref={nameRef}
                                name="name"
                                />
                            </div>
                         </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-md-6 col-sm-12 mt-2">
                            <div className="input-field ">
                                <label className="label_field">Guarantor's Identity Type</label>
                                <input
                                className="input"
                                type="text"
                                ref={nameRef}
                                name="name"
                                placeholder="ex. John Doe"
                                />
                            </div>
                        </div>
                        
                        <div className="col-md-6 col-sm-12 mt-2">
                            <div className="input-field ">
                                <label className="label_field">Guarantor's Identity Number</label>
                                <input
                                className="input"
                                type="number"
                                ref={nameRef}
                                name="name"
                                />
                            </div>
                         </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-md-6 col-sm-12 mt-2">
                            <div className="input-field ">
                                <label className="label_field">Guarantor's Passport</label>
                                <input
                                className="file"
                                type="file"
                                ref={nameRef}
                                name="name"
                                />
                            </div>
                        </div>
                        
                        <div className="col-md-6 col-sm-12 mt-2">
                            <div className="input-field ">
                                <label className="label_field">Guarantor's Identity Card</label>
                                <input
                                className=""
                                type="file"
                                ref={nameRef}
                                name="name"
                                />
                            </div>
                         </div>
                    </div>
                    
                      <div className="row">
                        <div className="col-md-12 col-sm-12 m-2">
                            <div className="input-field ">
                                <label className="label_field">Relationship</label>
                                <input
                                className="input"
                                type="text"
                                ref={nameRef}
                                name="name"
                                />
                            </div>
                        </div>
                    </div>
                    
                                  




                       <div className="button m-4">
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
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateClient;
