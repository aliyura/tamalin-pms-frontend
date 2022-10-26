import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav id="sidebar">
      <div className="sidebar_blog_1">
        <div className="sidebar-header">
          <div className="logo_section">
            <Link to={"/"}>
              <img
                className="logo_icon img-responsive"
                src="images/logo/logo_icon.png"
                alt="#"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="sidebar_blog_2">
        <h4>TAMALIN Logo</h4>
        <ul className="list-unstyled components">
          <li className="active">
            <Link
              to={"/"}
              data-toggle="collapse"
              aria-expanded="false"
              className=""
            >
              <i className="fa fa-dashboard yellow_color"></i>{" "}
              <span>Dashboard</span>
            </Link>
          </li>

          <li>
            <a
              href="#staffs"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fa fa-users purple_color"></i>{" "}
              <span>Manage Admins</span>
            </a>
            <ul className="collapse list-unstyled" id="staffs">
              <li>
                <Link to={"/vehicles/"}>
                  &gt; <span>Create Admin</span>
                </Link>
              </li>
              <li>
                <Link to={"/vehicles"}>
                  &gt; <span>All Admins</span>
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <a
              href="#agents"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fa fa-user purple_color"></i>{" "}
              <span>Manage Agents</span>
            </a>
            <ul className="collapse list-unstyled" id="agents">
              <li>
                <Link to={"/vehicles/"}>
                  &gt; <span>Create Agent</span>
                </Link>
              </li>
              <li>
                <Link to={"/vehicles"}>
                  &gt; <span>All Agents</span>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="#vehicles"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fa fa-motorcycle purple_color"></i>
              <span>Manage Vehicles</span>
            </a>
            <ul className="collapse list-unstyled" id="vehicles">
              <li>
                <Link to={"/vehicles/"}>
                  &gt; <span>Register Vehicles</span>
                </Link>
              </li>
              <li>
                <Link to={"/vehicles"}>
                  &gt; <span>All Vehicles</span>
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <a
              href="#clients"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fa fa-industry purple_color"></i>{" "}
              <span>Manage Clients</span>
            </a>
            <ul className="collapse list-unstyled" id="clients">
              <li>
                <Link to={"/clients/"}>
                  &gt; <span>Register a Client</span>
                </Link>
              </li>
              <li>
                <Link to={"/clients/"}>
                  &gt; <span>All Clients</span>
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <a
              href="#contracts"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fa fa-compress purple_color"></i>{" "}
              <span>Manage Contracts</span>
            </a>
            <ul className="collapse list-unstyled" id="contracts">
              <li>
                <Link to={"/contracts"}>
                  &gt; <span>All Contracts</span>
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <a
              href="#payments"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fa fa-credit-card purple_color"></i>{" "}
              <span>Manage Payments</span>
            </a>
            <ul className="collapse list-unstyled" id="payments">
              <li>
                <Link to={"/contracts"}>
                  &gt; <span>Pending Payments</span>
                </Link>
              </li>
              <li>
                <Link to={"/contracts/monthly-report"}>
                  &gt; <span>Monthly Report</span>
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <a
              href="#payments"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fa fa-table purple_color"></i> <span>Reports</span>
            </a>
            <ul className="collapse list-unstyled" id="payments">
              <li>
                <Link to={"/contracts"}>
                  &gt; <span>Clients</span>
                </Link>
              </li>
              <li>
                <Link to={"/contracts/monthly-report"}>
                  &gt; <span>Vehicles</span>
                </Link>
              </li>
              <li>
                <Link to={"/contracts/monthly-report"}>
                  &gt; <span>Payments</span>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
