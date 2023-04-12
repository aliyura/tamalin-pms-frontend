import { ToastContainer, toast } from "react-toastify";
import "../static/css/users.css";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import instance from "../api";

const CreatePayment = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState({
    contractId: '',
    amount: 0,
    paymentMode: '',
    paymentRef: '',
    narration: '',
  });

  const createPayment = async () => {
    if (input.contractId.length < 6)
      toast.error('Valid contract id required!')
    else if (input.amount.length <= 0)
      toast.error('Valid amount id required!')
    else if (input.paymentMode.length < 3)
      toast.error('Valid contract id required!')

    else {

      const request = {
        contractId: input.contractId,
        amount: input.amount,
        paymentMode: input.paymentMode,
        paymentRef: input.paymentRef,
        narration: input.narration
      }

      console.log(request);

      setIsLoading(true);
      const token = sessionStorage.getItem("token");

      await instance
        .post(`/payment`,
          request,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setIsLoading(false);
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

    }
  }

  return (
    <div className="full_container">
      <div className="container">
        <div className=" left my-4 mx-0 full_height">
          <div className="login_section">
            <ToastContainer />
            <div className="logo_login">
              <div className="center">
                <h1 className="heading">Create Payment</h1>
              </div>
            </div>
            <div className="register_form">
              <div className="px-4 mx-4">
                <fieldset>
                  <div className="row">
                    <div className="col-md-6 col-sm-6 mt-2">
                      <div className="input-field ">
                        <label className="label_field">Contract Id</label>
                        <input
                          className="input"
                          type="input"
                          name="code"
                          maxLength={6}
                          value={input.contractId}
                          placeholder="eg. 00000"
                          onChange={(e) => setInput({
                            ...input,
                            contractId: e.target.value
                          })}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6 mt-2">
                      <div className="input-field ">
                        <label className="label_field">Amount</label>
                        <input
                          className="input"
                          type="input"
                          name="amount"
                          value={input.amount}
                          placeholder="Amount"
                          onChange={(e) => setInput({
                            ...input,
                            amount: Number(e.target.value)
                          })}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6 mt-2">
                      <div className="input-field ">
                        <label className="label_field">Mode of Payment</label>
                        <select
                          className="input"
                          type="input"
                          value={input.paymentMode}
                          name="paymentMode"
                          onChange={(e) => setInput({
                            ...input,
                            paymentMode: e.target.value
                          })}
                          required
                        >
                          <option>Cash</option>
                          <option>Transfer</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6 mt-2">
                      <div className="input-field ">
                        <label className="label_field">Payment Ref</label>
                        <input
                          className="input"
                          type="input"
                          value={input.paymentRef}
                          name="paymentRef"
                          onChange={(e) => setInput({
                            ...input,
                            paymentRef: e.target.value
                          })}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-12 col-sm-12 mt-2">
                      <div className="input-field ">
                        <label className="label_field">Narration</label>
                        <input
                          className="input"
                          type="input"
                          name="narration"
                          value={input.narration}
                          onChange={(e) => setInput({
                            ...input,
                            narration: e.target.value
                          })}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-buttons row">
                      <div className="previous col-6"></div>
                      <div className="previous col-6 text-right">
                        <button className="btn btn-success" onClick={createPayment}>
                          {isLoading ? <Spinner /> : "Create a Payment"}
                        </button>
                      </div>
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

export default CreatePayment;
