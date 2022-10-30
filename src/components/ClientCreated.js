import { Link } from "react-router-dom";


const ClientCreated = ({ setPage }) => {
   
    return (
        <div>
            <div className='p-6 m-4'>
                <h4 className='text-center'><strong>Register Client</strong></h4>

                {/* progressbar */ }
                <div id="progressbar">
                    <div className="active" id="client"><strong>Client's Info <i className="fa fa-check"></i></strong></div>
                    <div className="active " id="guarantor"><strong>Guarantor's Info <i className="fa fa-check"></i></strong></div>
                    <div className="active" id="documents"><strong>Documents<i className="fa fa-check"></i></strong></div>
                </div>
                <div className="register_form">
                    <h4 className="success-green text-center pt-5 m-5">New Client Registered</h4>
                    <div className="text-center">
                        <Link to='/' className="success-green m-4 ">Home</Link>
                        <Link to={ '/clients' } className="success-green  m-4">All Clients</Link>
                  </div>
                </div>
            </div>
        </div>
    );
}

export default ClientCreated;
