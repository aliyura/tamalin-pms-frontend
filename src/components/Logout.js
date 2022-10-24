import {useNavigate } from 'react-router-dom';

function Logout() {

    const navigate = useNavigate();


    const logout = (e) => {
        e.preventDefault();
        console.log('Logout');
        sessionStorage.clear();

        navigate("/login");
    }

    return (

            <button 
              className="btn btn-warning mt-3 mx-4" 
              onClick={logout}
			>
             Logout
			</button>
    )
}

export default Logout;