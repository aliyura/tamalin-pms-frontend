import { useState, useEffect, useCallback, useContext } from "react";
import instance from "../api";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Search from "../components/Search";
import "react-toastify/dist/ReactToastify.css";
import "../static/css/list.css";
import Loader from "../components/Loader";
import EditClient from "./EditClient";
import { AllContext } from "../App";

const AllClients = () => {
  const [updateModal, setUpdateModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [clients, setClients] = useState([]);
  const [clientName, setClientName] = useState();
  const [clientId, setClientId] = useState();
  const [clientPhone, setClientPhone] = useState();
  const [searchKey, setSearchKey] = useState("");
  const [totalPages, setTotalPage] = useState();
  const [active, setActiveness] = useState();
  const [contractId, setContractId] = useState();
  let [currentPage, setCurrentPage] = useState(0);
  const [inProgress, setInProgress] = useState(true);
  const { contracts, setContracts } = useContext(AllContext);
  const navigate = useNavigate();

  const setData = (client) => {
    setClientName(client.name);
    setClientPhone(client.phoneNumber);
    setClientId(client.cuid);
  };

  const showUpdateModal = (e, client) => {
    e.preventDefault();
    setData(client);
    setUpdateModal(true);
  };

  const showPaymentModal = (e, client) => {
    e.preventDefault();
    const contract = contracts.find(
      (contract) => contract.client.id === client
    );
    console.log(contracts);
    setPaymentModal(true);
  };

  const closeModal = () => {
    setUpdateModal(false);
    setPaymentModal(false);
    AllClients();
  };

  const UpdateStatus = async (e, id, status) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    await instance
      .put(
        `client/status/change/${id}?status=${
          status === "ACTIVE" ? "INACTIVE" : "ACTIVE"
        }`,
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
        setActiveness(!active);
        // setVehicles(vehicles);
        getAllClients();
      })
      .catch((err) => console.log(err));
  };

  const search = async () => {
    setInProgress(true);
    try {
      const token = sessionStorage.getItem("token");
      const res = await instance.get(`client/search?q=${searchKey}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInProgress(false);
      console.log(res.data.data.page);
      const { page } = await res.data.data;
      const { data } = await res.data;
      setClients(page);
      if (page.length > 0) {
        setTotalPage(++data.totalPages);
        setCurrentPage(data.currentPage);
      }
    } catch (err) {
      setInProgress(false);
      const { message } = err.response.data;
      throw new Error(message);
    }
  };

  const getAllClients = async () => {
    setInProgress(true);
    const token = sessionStorage.getItem("token");
    await instance
      .get(`client/list?page=${currentPage}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { page } = res.data.data;
        const { data } = res.data;
        setClients(page);
        if (page.length > 0) {
          setTotalPage(++data.totalPages);
          setCurrentPage(data.currentPage);
        }
        setInProgress(false);
      })
      .catch((err) => {
        const { message } = err.response.data;
        throw new Error(message);
        setInProgress(false);
      });
  };

  const changePage = (action) => {
    if (action === -1) {
      if (currentPage > 0) currentPage--;
    } else if (action === +1) {
      if (currentPage < totalPages) currentPage++;
    } else {
      currentPage = action;
    }
    setCurrentPage(currentPage);
    getAllClients();
  };

  const allContracts = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await instance.get(`contract/list?page=0`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { page } = await response.data.data;
      setContracts(page);
      console.log(contracts, "kkkk");
    } catch (err) {
      console.log(err);
      // const { message } = err.response.data;
      // throw new Error(message);
      // setInProgress(false);
    }
  };

  useEffect(() => {
    getAllClients();
    allContracts();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-12 recently registered"></div>
      </div>
      <div className="row mt-4">
        <div className="col-12 table">
          <div className="d-flex search-section m-4">
            {/* Search Bar */}
            <Search
              placeholder={"Search Clients e.g John Doe"}
              onChange={(e) => {
                setSearchKey(e.target.value);
              }}
              onClick={(e) => {
                e.preventDefault();
                // setClients([])
                if (searchKey.length < 1) getAllClients();
                else search();
              }}
            />
            {/* Search Bar */}

            <div className="col-6 register-btn m-2">
              <Button onClick={() => navigate("/registerclient")}>
                Register a new client
              </Button>
            </div>
          </div>
          <div className="col-12">
            <div className=" full stretch">
              <div className="table_section padding_infor_info">
                <div className="table-responsive">
                  {inProgress ? (
                    <Loader />
                  ) : clients.length > 0 ? (
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>s. No</th>
                          <th>Full Name</th>
                          <th>Phone Number</th>
                          <th>Status</th>
                          <th>action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {clients.map((client, index) => {
                          return (
                            <>
                              <tr key={index}>
                                <td>{++index}</td>
                                <td>{client.name}</td>
                                <td>{client.phoneNumber}</td>
                                <td>{client.status}</td>
                                <td className="actions">
                                  {/* <a href="" type="button" onClick={(e) => showPaymentModal(e, client.cuid)}>
                                    <i className="fa fa-money edit-icon icon text-success"></i>
                                  </a> */}

                                  <div className="icon actions">
                                    <p className="icon">&nbsp;|&nbsp;</p>
                                  </div>

                                  <a
                                    href=""
                                    type="button"
                                    onClick={(e) => showUpdateModal(e, client)}
                                  >
                                    {/* Open updateModal */}
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
                                          "Are you sure you want to delete this vehicle?"
                                        )
                                      ) {
                                        const token =
                                          sessionStorage.getItem("token");
                                        await instance
                                          .delete(`client/${client.cuid}`, {
                                            headers: {
                                              Authorization: `Bearer ${token}`,
                                            },
                                          })
                                          .then(() => {
                                            AllClients();
                                          })
                                          .catch((err) => console.log(err));
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
                                    onClick={(e) =>
                                      UpdateStatus(
                                        e,
                                        client.cuid,
                                        client.status
                                      )
                                    }
                                  >
                                    {/* Open updateModal */}
                                    <i
                                      className={`fa  ${
                                        client.status === "ACTIVE"
                                          ? "fa-toggle-on text-success"
                                          : "fa-toggle-off text-danger"
                                      } aria-hidden="true" edit-icon icon `}
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
                      <p>No client found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
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
            {currentPage === totalPages ? (
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

      {updateModal && (
        <EditClient
          close={closeModal}
          clientName={clientName}
          clientPhone={clientPhone}
          clientId={clientId}
          getAllClients={getAllClients}
        />
      )}
    </>
  );
};

export default AllClients;