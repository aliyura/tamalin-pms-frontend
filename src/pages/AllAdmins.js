import { useState, useEffect } from "react";
import instance from "../api";
import Table from "../components/Table";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Search from "../components/Search";

const AllAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [totalPages, setTotalPage] = useState();
  let [currentPage, setCurrentPage] = useState(0);
  const [inProgress, setInProgress] = useState(true);

  const getAllAdmins = async () => {
    setInProgress(true);
    const token = sessionStorage.getItem("token");
    await instance
      .get(`/vehicle-type`, {
        // headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setInProgress(false);
        console.log(res);
        // const { page } = res.data.data;
        const { data } = res.data;
        // setAdmins(page);
        // if (page.length > 0) {
        //   setTotalPage(++data.totalPages);
        //   setCurrentPage(data.currentPage);
        // }
      })
      .catch((err) => {
        setInProgress(false);
        console.log(err.message);
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
    getAllAdmins();
  };

  useEffect(() => {
    getAllAdmins();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-12 recently registered"></div>
      </div>
      <div className="row mt-4">
        <div className="col-sm-12 col-md-2 col-lg-2 mt-4 pt-4 ">
          <ul className="mt-4 pt-4">
            <li className="p-2">
              <Link to={""}>All Vehicle</Link>
            </li>
            <li className="p-2">
              <Link to={""}>Create Vehicle</Link>
            </li>
            <li className="p-2">
              <Link to={""}>All Vehicle Type</Link>
            </li>
          </ul>
        </div>
        <div className="col-sm-12 col-md-10 col-lg-10 table">
          <div className="d-flex  m-4">
            <Search placeholder={"Search for Vehicles"} />
            <div className="col-6 d-flex justify-content-end m-2">
              <Button>Register a new client</Button>
            </div>
          </div>
          <div className="col-12">
            <div className="white_shd full margin_bottom_30">
              <div className="table_section padding_infor_info">
                <div className="table-responsive-sm">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Full Name</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {admins.map((admin, index) => {
                        return (
                          <>
                            <tr key={index}>
                              <td>{++index}</td>
                              {/* <td>{titleCase(admin.name)}</td> */}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-end">
          <li className="page-item">
            <button className="page-link" onClick={() => changePage(-1)}>
              Previous
            </button>
          </li>
          {[...Array(totalPages)].map((e, i) => (
            <li className="page-item" key={i}>
              <button
                className={
                  i === currentPage
                    ? "page-link btn-primary text-white"
                    : "page-link"
                }
                onClick={() => changePage(i)}
              >
                {i}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button className="page-link" onClick={() => changePage(+1)}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default AllAdmins;
