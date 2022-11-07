import { useState, useContext } from 'react';
import ClientCreated from '../components/ClientCreated';
import CreateClientForm1 from '../components/CreateClientForm1';
import CreateClientForm2 from '../components/CreateClientForm2';
import CreateClientForm3 from '../components/CreateClientForm3';
import CreateClientForm4 from '../components/CreateClientForm4';
import '../static/css/users.css'
import { ClientFormContext } from '../store/ClientFormContext';

const CreateClient = () => {
  const [page, setPage] = useState(1);
  const { setClient } = useContext(ClientFormContext)
  const [createdClient, setCreatedClient] = useState([])
  
  const handleChange = e => {
    const { name, value } = e.target;
    setClient(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (

    <div className=" mt-0">
      
          { page === 1 ? <CreateClientForm1 handleChange={ handleChange } setPage={ setPage } />
            : page === 2 ? <CreateClientForm2 handleChange={ handleChange } setPage={ setPage } />
              : page === 3 ? <CreateClientForm3 setPage={ setPage }   /> 
            : page === 4 ? <CreateClientForm4 setPage={ setPage } setCreatedClient={ setCreatedClient } /> 
      : <ClientCreated setPage={ setPage } createdClient={ createdClient } /> }
        </div>
  );
}

export default CreateClient;
