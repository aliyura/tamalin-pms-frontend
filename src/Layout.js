import React, { useContext, useState} from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { LoginContext } from "./store/loginContext";

const Layout = () => {
  const { isAuthenticated } = useContext(LoginContext);
  const [hideUser, setHideUser] = useState(true)

  return (
    <>
      {!isAuthenticated ? (
        <Navigate to="/login" />
      ) : (
        <div className="full_container">
          <div className="inner_container">
            <Sidebar hideUser={hideUser} />
            <div id="content">
              <Header setHideUser={setHideUser} hideUser={hideUser} />
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Layout;
