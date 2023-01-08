import { useState, useEffect, useCallback } from "react";
import instance from "../api";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Search from "../components/Search";
import "react-toastify/dist/ReactToastify.css";
import "../static/css/list.css";
import Loader from "../components/Loader";

const AllClients = () => {
  const [clients, setClients] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [totalPages, setTotalPage] = useState();
  let [currentPage, setCurrentPage] = useState(0);
  const [inProgress, setInProgress] = useState(true);
  const navigate = useNavigate();

  const search =async () => {
    setInProgress(true);
    const token = sessionStorage.getItem("token");
    await instance
      .get(`client/search?q=${searchKey}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setInProgress(false);
        console.log(res.data.data.page)
        const { page } = res.data.data;
        const { data } = res.data;
        setClients(page);
        if (page.length > 0) {
          setTotalPage(++data.totalPages);
          setCurrentPage(data.currentPage);
        }
      })
      .catch((err) => {
        setInProgress(false);
        const { message } = err.response.data;
        throw new Error(message);
      });
  };


  const getAllClients = async () => {
    setInProgress(true);
    const token = sessionStorage.getItem("token");
    await instance
      .get(`client/list?page=${currentPage}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setInProgress(false);
        const { page } = res.data.data;
        const { data } = res.data;
        setClients(page);
        if (page.length > 0) {
          setTotalPage(++data.totalPages);
          setCurrentPage(data.currentPage);
        }
      })
      .catch((err) => {
        setInProgress(false);
        const { message } = err.response.data;
        throw new Error(message);
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

  useEffect(() => {
    getAllClients();
  }, []);

  useEffect(() => {
    if(searchKey.length < 1)
      getAllClients()
      search();
  }, [searchKey]);

  return (
    <>
      <div className="row">
        <div className="col-12 recently registered"></div>
      </div>
      <div className="row mt-4">
        <div className="col-sm-12 col-md-10 col-lg-10 table">
          <div className="d-flex search-section m-4">

            {/* Search Bar */}
            <Search placeholder={"Search Clients e.g John Doe"}
              onChange={(e)=>{
                setSearchKey(e.target.value)
              }}
              onClick={(e)=>{
                e.preventDefault()
                setClients([])
                if(searchKey.length < 1)
                  getAllClients()
                  search()}} />
            {/* Search Bar */}

            <div className="col-6 register-btn m-2">
              <Button onClick={() => navigate("/registerclient")}>
                Register a new client
              </Button>
            </div>
          </div>
          <div className="col-12">
            <div className="white_shd full stretch margin_bottom_30">
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
                                <td>{ client.name }</td>
                                <td>{ client.phoneNumber }</td>
                                <td>{ client.status }</td>
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
    </>
  );
};

export default AllClients;
