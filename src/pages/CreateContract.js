import { useRef, useState, useEffect } from "react";
import instance from "../api";
import { useNavigate } from "react-router-dom";
import "../static/css/users.css";
import Spinner from "../components/Spinner";
import CreateContractForm from "../components/CreateContractForm";


const CreateVehicle = () => {

  const [clients, setClients] = useState([])
  const [vehicles, setVehicles] = useState([])

  useEffect(() => {
    // declare the data fetching function
    
    const token = sessionStorage.getItem("token");
    const fetchData = async () => {
      const res =  await instance
      .get(`client/list`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setClients(res.data.data.page)
      console.log(res.data.data.page)

    }
  
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [])

  useEffect(() => {
    // declare the data fetching function
    
    const token = sessionStorage.getItem("token");
    const fetchData = async () => {
      const res =  await instance
      .get(`vehicle/list`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setVehicles(res.data.data)
      console.log(res.data.data, "vel")

    }
  
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [])



  return (
    <div className="full_container">
      <div className="container">
        <div className=" verticle_center full_height">
          <CreateContractForm clients={clients} vehicles={vehicles} />
        </div>
      </div>
    </div>
  );
};

export default CreateVehicle;
