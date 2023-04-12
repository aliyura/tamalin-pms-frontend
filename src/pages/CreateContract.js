import { useEffect, useContext } from "react";
import instance from "../api";
import "../static/css/users.css";
import CreateContractForm from "../components/CreateContractForm";
import { AllContext } from "../App";


const CreateContract = () => {

  const { setClients, setVehicles } = useContext(AllContext)

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const fetchClients = async () => {
      try {
        const res = await instance
          .get(`client/list`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        setClients(res.data.data.page)
        console.log(res.data.data.page)
      }
      catch (error) {
        console.log(error)
      }
    }

    const fetchVehicles = async () => {
      try {
        const res = await instance
          .get(`vehicle/list`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        setVehicles(res.data.data.page)
        console.log(res.data.data.page, "vel")

      }
      catch (error) {
        console.log(error)
      }

    }

    fetchClients()
    fetchVehicles()
  }, [])


  return (
    <div className="full_container">
      <div className="container">
        <div className=" left my-4 mx-0 full_height">
          <CreateContractForm />
        </div>
      </div>
    </div>
  );
};

export default CreateContract;
