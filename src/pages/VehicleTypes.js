import { useState, useEffect, useCallback } from "react";
import instance from "../api";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import "react-toastify/dist/ReactToastify.css";
import "../static/css/list.css";
import Loader from "../components/Loader";
import "./EditVehicles.css";

const VehicleTypes = () => {
  const [vehicletypes, setVehicleTypes] = useState([]);
  const [inProgress, setInProgress] = useState(true);
  const navigate = useNavigate();

  const getVehicleTypes = useCallback(async () => {
    setInProgress(true);
    const token = sessionStorage.getItem("token");
    await instance
      .get(`vehicle-type`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setInProgress(false);
        console.log(res);
        const { data } = res.data;

        setVehicleTypes(data);
      })
      .catch((err) => {
        setInProgress(false);
        const { message } = err.response.data;
        throw new Error(message);
      });
  }, []);

  useEffect(() => {
    getVehicleTypes();
  }, []);

  return (
    <>
      <div className="row mt-4">
        <div className="search-section m-4">
          <div className="register-btn">
            <Button onClick={() => navigate("/createvehicletype")}>
              Create Vehicle Type
            </Button>
          </div>
        </div>
        {inProgress ? (
          <div className="col-12 text-center p-4 m-4 card"><Loader /></div>
        ) : vehicletypes.length > 0 ? (
          <div className=" ml-4 card table-responsive">
                      <table className="table table-sm table-striped">
            <thead>
              <tr>
                <th className="font-weight-bold">S/N</th>
                <th className="font-weight-bold">Title</th>
                <th className="font-weight-bold">Description</th>
                <th className="font-weight-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {vehicletypes.map((v, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td>{++index}</td>
                      <td>{v.title}</td>
                      <td>{v.description}</td>
                      <td className="actions">
                        <button className="border-0  bg-transparent"
                          onClick={async (e) => {
                            e.preventDefault();
                            if (
                              window.confirm(
                                "Are you sure you want to delete this Vehicle Type?"
                              )
                            ) {
                              const token = sessionStorage.getItem("token");
                              await instance
                                .delete(`vehicle-type/${v.vtuid}`, {
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                  },
                                })
                                .then(() => {
                                  getVehicleTypes();
                                });
                            }
                            return;
                          }}
                        >
                          <i
                            className="fa fa-trash text-danger"
                            style={{ fontSize: 30 + "px" }}
                          ></i>
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
          </div>
        ) : (
          <div className="text-center message-box">
            <p>No Vehicle Type Found</p>
          </div>
        )}
      </div>
    </>
  );
};

export default VehicleTypes;
