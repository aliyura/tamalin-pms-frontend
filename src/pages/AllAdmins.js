import { Fragment } from "react";
import { useState, useEffect, useCallback } from "react";
import instance from "../api";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Search from "../components/Search";
import "react-toastify/dist/ReactToastify.css";
import "../static/css/list.css";
import Loader from "../components/Loader";
import { ToastContainer, toast } from "react-toastify";

const AllAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [totalPages, setTotalPage] = useState();
  let [currentPage, setCurrentPage] = useState(0);
  const [inProgress, setInProgress] = useState(true);
  const navigate = useNavigate();

  const getAllAdmins = useCallback(async () => {
    setInProgress(true);
    const token = sessionStorage.getItem("token");
    await instance
      .get(`user/list?page=${currentPage}&role=ADMIN`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setInProgress(false);
        const { page } = res.data.data;
        const { data } = res.data;
        setAdmins(page);
        if (page.length > 0) {
          setTotalPage(++data.totalPages);
          setCurrentPage(data.currentPage);
        }
      })
      .catch((err) => {
        setInProgress(false);
        console.log(err)
        const data = err.response.data;
        toast.error(data.message)

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
    getAllAdmins();
  };

  useEffect(() => {
    getAllAdmins();
  }, []);

  return (
    <Fragment>
      <ToastContainer/>
      <div className="row">
        <div className="col-12 recently registered"></div>
      </div>
      <div className="row mt-4">
        <div className="col-12 ">
          <div className="d-flex search-section m-4">
            <Search placeholder={"Search Admins e.g John Doe"} />
            <div className="col-6 register-btn m-2">
              <Button onClick={() => navigate("/createadmin")}>
                Register a new Admin
              </Button>
            </div>
          </div>
          <div className="col-12">
            <div className=" full stretch">
              <div className="">
                <div className="table-responsive">
                  {inProgress ? (
                    <Loader />
                  ) : admins.length > 0 ? (
                    <table className="table table-striped">
                      <thead>
                        <tr>
                        <th>S/N</th>
                          <th>Full Name</th>
                          <th>Phone Number</th>
                          <th>NIN</th>
                          <th>Role</th>
                          <th>#</th>
                        </tr>
                      </thead>
                      <tbody>
                        {admins.map((admin, index) => {
                          return (
                            <>
                              <tr key={index}>
                                <td>{++index}</td>
                                <td>{admin.name}</td>
                                <td>{admin.phoneNumber}</td>
                                <td>{admin.nin}</td>
                                <td>{admin.role}</td>
                                <td>
                                  <Link to="/">
                                    <i className="fa fa-edit text-success"></i>
                                  </Link>
                                  &nbsp;|&nbsp;
                                  <Link to="/">
                                    <i className="fa fa-trash text-danger"></i>
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

export default AllAdmins;
