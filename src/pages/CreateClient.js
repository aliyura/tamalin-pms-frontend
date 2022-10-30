import { useState, useContext } from 'react';
import ClientCreated from '../components/ClientCreated';
import CreateClientForm1 from '../components/CreateClientForm1';
import CreateClientForm2 from '../components/CreateClientForm2';
import CreateClientForm3 from '../components/CreateClientForm3';
import '../static/css/users.css'
import { ClientFormContext } from '../store/ClientFormContext';

const CreateClient = () => {
  const [page, setPage] = useState(1);
  const { setClient } = useContext(ClientFormContext)
  
  const handleChange = e => {
    const { name, value } = e.target;
    setClient(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (

    <div className=" mt-0">
      <div className="col-11 col-sm-9 col-md-7 col-lg-6 p-0 mt-3 mb-2">
        <div className="card px-0 pt-4 pb-0 mt-3 mb-3">
          { page === 1 ? <CreateClientForm1 handleChange={ handleChange } setPage={ setPage } />
            : page === 2 ? <CreateClientForm2 handleChange={ handleChange } setPage={ setPage } />
              : page === 3 ? <CreateClientForm3 setPage={ setPage } /> 
              : <ClientCreated setPage={ setPage } /> }
        </div>
      </div>
    </div>
  );
}

export default CreateClient;
