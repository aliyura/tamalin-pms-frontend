import { useState, useEffect, useCallback } from "react";
import instance from "../api";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Search from "../components/Search";
import "react-toastify/dist/ReactToastify.css";
import "../static/css/list.css";
import Loader from "../components/Loader";
import "./EditVehicles.css";
import EditContract from "./EditContract";

const Contracts = () => {
  const [contracts, setContracts] = useState([]);
  const [totalPages, setTotalPage] = useState(0);
  let [currentPage, setCurrentPage] = useState(0);
  const [discount, setDiscount] = useState("");
  const [cuid, setCuid] = useState("");
  const [inProgress, setInProgress] = useState(true);
  const [active, setActiveness] = useState();
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const getContracts = useCallback(async () => {
    setInProgress(true);
    setModal(false);
    const token = sessionStorage.getItem("token");
    await instance
      .get(`contract/list?page=${currentPage}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setInProgress(false);
        console.log(res.data.data.page);
        const { page } = res.data.data;
        const { data } = res.data;

        setContracts(data.page);
        if (page.length > 0) {
          setTotalPage(++data.totalPages);
          setCurrentPage(data.currentPage);
        }
      })
      .catch((err) => {
        setInProgress(false);
        console.log(err);
        const message = err;
        throw new Error(message);
      });
  }, []);

  const changePage = (action) => {
    if (action === -1) {
      if (currentPage > 0) currentPage--;
    } else if (action === +1) {
      if (currentPage < totalPages) currentPage++;
    } else {
      currentPage = action;
    }
    setCurrentPage(currentPage);
    getContracts();
  };

  useEffect(() => {
    getContracts();
  }, []);

  const showModal = (e) => {
    e.preventDefault();
    setData();
    setModal(true);
  };

  const CloseModal = () => {
    setModal(false);
    getContracts();
  };

  const setData = () => {
    contracts.map((c, _) => {
      setDiscount(c.discount);
      setCuid(c.cuid);
    });
  };

  const UpdateStatus = async (e, id, status) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    await instance
      .put(
        `contract/status/change/${id}?status=${
          status == "ACTIVE" ? "INACTIVE" : "ACTIVE"
        }`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(res);
        setActiveness(!active);
        setContracts(contracts);
      })
      .catch((err) => console.log(err));
  };

  const SearchHandler = async (e) => {
    const token = sessionStorage.getItem("token");
    await instance
      .get(`contract/search?q=${e.target.value}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        const { data } = res.data;
        setContracts(data);
        console.log(data);
      });
  };

  return (
    <>
      {/* <div className="table-size"> */}
      <div className="row mt-4">
        {/* <div className="col-sm-12 col-md-10 col-lg-10 "> */}
        <div className="search-section m-4">
          <div className="search-input">
            {modal || (
              <Search
                placeholder={"Search Contracts e.g John Doe"}
                onChange={SearchHandler}
              />
            )}
          </div>
          <div className="register-btn">
            <Button onClick={() => navigate("/newcontract")}>
              Create a new Contract
            </Button>
          </div>
        </div>
        {inProgress ? (
          <Loader />
        ) : contracts.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr className="table-header">
                <th>S/N</th>
                <th>Code</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Discount</th>
                <th>Created By</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((c, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td>{++index}</td>
                      <td>{c.code}</td>
                      <td>{c.startDate}</td>
                      <td>{c.endDate}</td>
                      <td>{c.discount}</td>
                      <td>{c.createdBy}</td>
                      <td>{c.createdAt}</td>
                      <td>{c.updatedAt}</td>
                      <td className="actions">
                        <a href="" type="button" onClick={showModal}>
                          <i className="fa fa-edit edit-icon icon text-success"></i>
                        </a>
                        <div className="icon actions">
                          <p className="icon">&nbsp;|&nbsp;</p>
                        </div>
                        <a
                          href=""
                          onClick={async (e) => {
                            e.preventDefault();
                            if (
                              window.confirm(
                                "Are you sure you want to delete this contract?"
                              )
                            ) {
                              const token = sessionStorage.getItem("token");
                              await instance
                                .delete(`contract/${c.cuid}`, {
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                  },
                                })
                                .then(() => {
                                  getContracts();
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
                        <a
                          href=""
                          type="button"
                          onClick={(e) => UpdateStatus(e, c.cuid, c.status)}
                        >
                          <i
                            className={`fa  ${
                              c.status === "ACTIVE"
                                ? "fa-toggle-on"
                                : "fa-toggle-off"
                            } aria-hidden="true" edit-icon icon text-success`}
                          ></i>
                        </a>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="text-center message-box">
            <p>No Contract Found</p>
          </div>
        )}
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-end">
          <li className="page-item">
            {currentPage === 0 ? (
              ""
            ) : (
              <button
                className="page-link btn-color"
                onClick={() => changePage(-1)}
              >
                Previous
              </button>
            )}
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
            {currentPage === totalPages || currentPage === null ? (
              ""
            ) : (
              <button
                className="page-link btn-color"
                onClick={() => changePage(+1)}
              >
                Next
              </button>
            )}
          </li>
        </ul>
      </nav>
      {modal && (
        <EditContract Close={CloseModal} discount={discount} cuid={cuid} />
      )}
    </>
  );
};

export default Contracts;
