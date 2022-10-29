import { Fragment } from "react";
import { useState, useEffect, useCallback } from "react";
import instance from "../api";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Search from "../components/Search";
import "react-toastify/dist/ReactToastify.css";
import "../static/css/list.css";
import Loader from "../components/Loader";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [totalPages, setTotalPage] = useState();
  let [currentPage, setCurrentPage] = useState(0);
  const [inProgress, setInProgress] = useState(true);
  const navigate = useNavigate();
  let id;

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
        id = data.vuid;
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

  const deleteVehicle = async () => {
    await instance.delete(`vehicle/${id}`);
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
    getVehicles();
  };

  useEffect(() => {
    getVehicles();
  }, []);

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 recently registered"></div>
      </div>
      <div className="row mt-4">
        <div className="col-sm-12 col-md-10 col-lg-10 table">
          <div className="d-flex search-section m-4">
            <Search placeholder={"Search Admins e.g John Doe"} />
            <div className="col-6 register-btn m-2">
              <Button onClick={() => navigate("/createvehicle")}>
                Register a new Vehicle
              </Button>
            </div>
          </div>
          <div className="col-12">
            <div className="white_shd full stretch margin_bottom_30">
              <div className="table_section table-pad padding_infor_info">
                <div className="table-responsive">
                  {inProgress ? (
                    <Loader />
                  ) : vehicles.length > 0 ? (
                    <table className="table table-striped">
                      <thead>
                        <tr>
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
                                  <Link to="/">
                                    <i
                                      className="fa fa-edit icon text-success"
                                      onClick={deleteVehicle}
                                    ></i>
                                  </Link>
                                  <p>&nbsp;|&nbsp;</p>
                                  <Link to="/">
                                    <i className="fa fa-trash icon text-danger"></i>
                                  </Link>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <div className="text-center message-box">
                      <p>No Administrator found</p>
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
