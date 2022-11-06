import { Fragment } from "react";
import { useState, useEffect, useCallback } from "react";
import instance from "../api";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Search from "../components/Search";
import "react-toastify/dist/ReactToastify.css";
import "../static/css/list.css";
import Loader from "../components/Loader";
import EditVehicle from "./EditVehicles";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [totalPages, setTotalPage] = useState();
  let [currentPage, setCurrentPage] = useState(0);
  const [inProgress, setInProgress] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const getVehicles = useCallback(async () => {
    setInProgress(true);
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

        setVehicles(data);
        // if (page.length > 0) {
        //   setTotalPage(++data.totalPages);
        //   setCurrentPage(data.currentPage);
        // }
      })
      .catch((err) => {
        setInProgress(false);
        const { message } = err.response.data;
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
    getVehicles();
  };

  useEffect(() => {
    getVehicles();
  }, []);

  return (
    <Fragment>
      {isOpen && (
        <EditVehicle
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          // vuid={vehicles.filter((v, id) => {
          //   return v.vuid;
          // })}
        ></EditVehicle>
      )}
      <div className="row mt-4 table-responsive">
        <div className="col-sm-12 col-md-10 col-lg-10">
          <div className="search-section m-4">
            <div className="search-input">
              <Search placeholder={"Search Admins e.g John Doe"} />
            </div>
            <div className="register-btn">
              <Button onClick={() => navigate("/createvehicle")}>
                Register a new Vehicle
              </Button>
            </div>
          </div>
          <div className="col-12">
            <div className="white_shd margin_bottom_30">
              <div className="padding_infor_info">
                {/* <div className="table-responsive"> */}
                {inProgress ? (
                  <Loader />
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
                                <a href="">
                                  <i
                                    className="fa fa-edit edit-icon icon text-success"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setIsOpen(!isOpen);
                                    }}
                                  ></i>
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
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center message-box">
                    <p>No Vehicle found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
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

export default Vehicles;
