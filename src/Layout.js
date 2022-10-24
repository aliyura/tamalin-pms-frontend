import React, {useContext} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { LoginContext } from './store/loginContext';




const Layout = () => {
    const { isAuthenticated } = useContext(LoginContext)
    
    return (
    <>
        {!isAuthenticated ? <Navigate to='/login' /> : <div class="full_container">
            <div className='inner_container'>
                <Sidebar />
                <div id="content">
                    <Header />
                    <Outlet />
                </div>
                </div>
            </div> }
    </>
    );
}
export default Layout;
