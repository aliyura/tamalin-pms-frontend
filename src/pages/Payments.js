import { useState, useEffect, useCallback, Fragment } from "react";
import instance from "../api";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Search from "../components/Search";
import "react-toastify/dist/ReactToastify.css";
import "../static/css/list.css";
import Loader from "../components/Loader";
import { useRef } from "react";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [totalPages, setTotalPage] = useState(0);
  let [currentPage, setCurrentPage] = useState(0);
  const [plate, setPlate] = useState("");
  const [imei, setImei] = useState("");
  const [sim, setSim] = useState("");
  const [puid, setPuid] = useState("");
  const [inProgress, setInProgress] = useState(true);
  const [active, setActiveness] = useState();

  const SearchInputRef = useRef();
  const navigate = useNavigate();

  const getPayments = useCallback(async () => {
    setInProgress(true);
    const token = sessionStorage.getItem("token");
    await instance
      .get(`payment/list?page=${currentPage}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setInProgress(false);
        console.log(res);
        const { page } = res.data.data;
        const { data } = res.data;
        setPayments(data);
        if (page.length > 0) {
          setTotalPage(++data.totalPages);
          setCurrentPage(data.currentPage);
        }
      })
      .catch((err) => {
        setInProgress(false);
        const { message } = err;
        throw new Error(message);
      });
  }, [currentPage]);

  const changePage = (action) => {
    if (action === -1) {
      if (currentPage > 0) currentPage--;
    } else if (action === +1) {
      if (currentPage < totalPages) currentPage++;
    } else {
      currentPage = action;
    }
    setCurrentPage(currentPage);
    getPayments();
  };

  useEffect(() => {
    getPayments();
  }, []);

  const SearchHandler = async (e) => {
    // if (e.target.value === "") {
    //   console.log("Getting search vehicle");
    //   await getVehicles();
    // } else {
    //   setSearchInput(e.target.value);
    //   const ValuesMatch = vehicles.filter((v, _) =>
    //     v.model.includes(SearchInput)
    //   );
    //   console.log(ValuesMatch);
    //   setVehicles(ValuesMatch);
    // }

    const token = sessionStorage.getItem("token");
    if (e.target.value === "") {
      console.log("Getting search Payment");
      await getPayments();
    } else {
      await instance
        .get(`payment/search?q=${e.target.value}&page=${currentPage}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(async (res) => {
          console.log(res);
          const { data } = res.data;

          const findMatch = data.filter((v, _) =>
            v.model.includes(e.target.value)
          );
          setPayments(findMatch);
          console.log(findMatch);
        })
        .catch((err) => {
          console.log(err);
          throw new Error(err.message);
        });
    }
  };

  return (
    <Fragment>
      <div className="row mt-4">
        <div className="search-section m-4">
          <div className="search-input">
            <Search
              placeholder={"Search Admins e.g John Doe"}
              ref={SearchInputRef}
              onChange={SearchHandler}
            />
          </div>
          <div className="register-btn">
            <Button onClick={() => navigate("/createpayment")}>
              Register a new Payment
            </Button>
          </div>
        </div>
        {inProgress ? (
          <Loader />
        ) : payments.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr className="table-header">
                <th>S/N</th>
                <th>Contract Id</th>
                <th>Payment Reference</th>
                <th>Amount</th>
                <th>Narration</th>
                <th>Created By</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p, index) => {
                return (
                  <Fragment>
                    <tr key={index}>
                      <td>{++index}</td>
                      <td>{p.contractId}</td>
                      <td>{p.paymentRef}</td>
                      <td>{p.amount}</td>
                      <td>{p.narration}</td>
                      <td>{p.createdAt}</td>
                      <td>{p.createdBy}</td>
                      <td>{p.updatedBy}</td>
                      <td className="actions">
                        <div className="icon actions">
                          <p className="icon">&nbsp;|&nbsp;</p>
                        </div>
                        <a
                          href=""
                          onClick={async (e) => {
                            e.preventDefault();
                            if (
                              window.confirm(
                                "Are you sure you want to delete this Payment Record?"
                              )
                            ) {
                              const token = sessionStorage.getItem("token");
                              await instance
                                .delete(`payment/${p.cuid}`, {
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                  },
                                })
                                .then(() => {
                                  getPayments();
                                });
                            }
                            return;
                          }}
                        >
                          <i className="fa fa-trash delete-icon icon text-danger"></i>
                        </a>
                        <div className="icon actions">
                          <p className="icon">&nbsp;|&nbsp;</p>
                        </div>
                      </td>
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="text-center message-box">
            <p>No Payment found</p>
          </div>
        )}
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-end">
          <li className="page-item">
            <button
              className="page-link btn-color"
              onClick={() => changePage(-1)}
            >
              Previous
            </button>
          </li>
          {[...Array(totalPages)].map((_, i) => (
            <li className="page-item" key={i}>
              <button
                className={
                  i === currentPage
                    ? "page-link btn-primary bg-white text-dark"
                    : "page-link"
                }
                onClick={() => changePage(i)}
              >
                {i}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button
              className="page-link btn-color"
              onClick={() => changePage(+1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default Payments;
