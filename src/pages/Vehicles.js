import { useState, useEffect, useCallback } from "react";
import instance from "../api";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Search from "../components/Search";
import "react-toastify/dist/ReactToastify.css";
import "../static/css/list.css";
import "./EditVehicles.css";
import EditVehicle from "./EditVehicles";
import { useRef } from "react";
import Loader from "../components/Loader";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [totalPages, setTotalPage] = useState(0);
  let [currentPage, setCurrentPage] = useState(0);
  const [tableMessage, setTableMessage]=useState("No Vehicles found")
  const [plate, setPlate] = useState("");
  const [imei, setImei] = useState("");
  const [sim, setSim] = useState("");
  const [vuid, setVuid] = useState("");
  const [inProgress, setInProgress] = useState(true);
  const [active, setActiveness] = useState();
  const [modal, setModal] = useState(false);
  const [SearchInput, setSearchInput] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const SearchInputRef = useRef();
  // const []
  const navigate = useNavigate();

  const getVehicles = useCallback(async () => {
    setInProgress(true);
    setModal(false);
    const token = sessionStorage.getItem("token");
    await instance
      .get(`vehicle/list?page=${currentPage}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setInProgress(false);
        console.log(res);
        const { page } = res.data.data;
        const { data } = res.data;
        setVehicles(data.page);
        if (page.length > 0) {
          setTotalPage(++data.totalPages);
          setCurrentPage(data.currentPage);
        }
      })
      .catch((err) => {
        setInProgress(false);
        if(err.code ==="ERR_NETWORK"){
          setTableMessage("Network failed, Check your internet connection!")
        }
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
    getVehicles();
  };

  useEffect(() => {
    getVehicles();
  }, []);

  const showModal = (e) => {
    e.preventDefault();
    setData();
    setModal(true);
  };

  const CloseModal = () => {
    setModal(false);
    getVehicles();
  };

  const setData = () => {
    vehicles.map((v, _) => {
      setPlate(v.plateNumber);
      setImei(v.trackerIMEI);
      setSim(v.trackerSIM);
      setVuid(v.vuid);
    });
  };

  const UpdateStatus = async (e, id, status) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    await instance
      .put(
        `vehicle/status/change/${id}?status=${
          status == "ACTIVE" ? "INACTIVE" : "ACTIVE"
        }`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(res);
        setActiveness(!active);
        setVehicles(vehicles);
      })
      .catch((err) => console.log(err));
  };

  const searchHandler = async () => {
    setInProgress(true);
    try {
      const token = sessionStorage.getItem("token");
      const res = await instance.get(`vehicle/search?q=${searchKey}`, {
        headers: { Authorization: `Bearer ${token}` },
      }); 
      setInProgress(false);
      console.log(res.data.data.page);
      const { page } = await res.data.data;
      const { data } = await res.data;
      setVehicles(page)
      if (page.length > 0) {
        setTotalPage(++data.totalPages);
        setCurrentPage(data.currentPage);
      }
     
    } catch (err) {
      setInProgress(false);
      if(err.code ==="ERR_NETWORK"){
        setTableMessage("Network failed, Check your internet connection!")
      }
    }
  };


  // const SearchHandler = async (e) => {
  //   const token = sessionStorage.getItem("token");
  //   if (e.target.value === "") {
  //     console.log("Getting search vehicle");
  //     await getVehicles();
  //   } else {
  //     await instance
  //       .get(`vehicle/search?q=${e.target.value}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then(async (res) => {
  //         console.log(res);
  //         const { data } = res.data;
  //         setVehicles(data)

  //         const findMatch = data.filter((v, _) =>
  //           v.model.includes(e.target.value)
  //         );
  //         setVehicles(findMatch);
  //         console.log(findMatch);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         // throw new Error(err.message);
  //       });
  //   }
  // };

  return (
    <>
      {/* <div className="table-size"> */}
      <div className="row mt-4">
        {/* <div className="col-sm-12 col-md-10 col-lg-10 "> */}
        <div className="search-section m-4">
          <div className="search-input">
            {modal || (
              <Search
              placeholder={"Search a vehicle"}
              onChange={(e) => {
              setSearchKey(e.target.value);
              }}
              onClick={e=>{
                e.preventDefault()
                if (searchKey.length < 1) getVehicles();
                else searchHandler()
              }} />
            )}
          </div>
          <div className="register-btn">
            <Button onClick={() => navigate("/createvehicle")}>
              Register a new Vehicle
            </Button>
          </div>
        </div>

        <div className="table-responsive">
        <table className="table">
        <div className="white_shd margin_bottom_30 ">
        <div className="padding_infor_info ">
        
        {inProgress ? (
          <div className="col-12 text-center p-4 m-4"><Loader /></div>
        ) : vehicles.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr className="table-header">
                <th>S/N</th>
                <th>Code</th>
                <th>Plate Number</th>
                <th>Model</th>
                <th>IMEI</th>
                <th>SIM</th>
                <th>Created By</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((v, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td>{++index}</td>
                      <td>{v.code}</td>
                      <td>{v.plateNumber}</td>
                      <td>{v.model}</td>
                      <td>{v.trackerIMEI}</td>
                      <td>{v.trackerSIM}</td>
                      <td>{v.createdBy}</td>
                      <td>{v.createdAt}</td>
                      <td>{v.updatedAt}</td>
                      <td className="actions">
                        <a href="" type="button" onClick={showModal}>
                          {/* Open Modal */}
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
                              const token = sessionStorage.getItem("token");
                              await instance
                                .delete(`vehicle/${v.vuid}`, {
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                  },
                                })
                                .then(() => {
                                  getVehicles();
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
                          onClick={(e) => UpdateStatus(e, v.vuid, v.status)}
                        >
                          {/* Open Modal */}
                          <i
                            className={`fa  ${
                              v.status === "ACTIVE"
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
            <p>{tableMessage}</p>
          </div>
        )}

        {/* jjjjj */}
       </div> 
       </div> 
       </table>
        </div>
      {/* // ksksksk */}
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
      {modal && (
        <EditVehicle
          Close={CloseModal}
          plate={plate}
          imei={imei}
          sim={sim}
          vuid={vuid}
        />
      )}
      </div>
    </>
  );
};

export default Vehicles;
