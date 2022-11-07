import { Link } from "react-router-dom";
import Client from "../pages/Client";


const ClientCreated = ({ setPage, createdClient }) => {
   
    return (
        <div>
                <Client createdClient={ createdClient } />
        </div>
    );
}

export default ClientCreated;
