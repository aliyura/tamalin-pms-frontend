import React from 'react';

const Sidebar = () => {
    return (
            <nav id="sidebar">
               <div className="sidebar_blog_1">
                  <div className="sidebar-header">
                     <div className="logo_section">
                        <a href="index.html"><img className="logo_icon img-responsive" src="images/logo/logo_icon.png" alt="#" /></a>
                     </div>
                  </div>
               </div>
               <div className="sidebar_blog_2">
                <h4>TAMALIN Logo</h4>
                  <ul className="list-unstyled components">
                     <li className="active">
                            <a href="#dashboard" data-toggle="collapse" aria-expanded="false" className=""><i
                                    className="fa fa-dashboard yellow_color"></i> <span>Dashboard</span></a>
                    </li>
                    
                        <li>
                            <a href="#vehicles" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                                    className="fa fa-diamond purple_color"></i> <span>Manage Vehicles</span></a>
                            <ul className="collapse list-unstyled" id="vehicles">
                                <li><a href="general_elements.html">&gt; <span>Register Vehicles</span></a></li>
                                <li><a href="media_gallery.html">&gt; <span>All Vehicles</span></a></li>
                            </ul>
                    </li>
                    
                        <li>
                            <a href="#clients" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                                    className="fa fa-object-group blue2_color"></i> <span>Manage Clients</span></a>
                            <ul className="collapse list-unstyled" id="clients">
                                <li><a href="email.html">&gt; <span>Register a Client</span></a></li>
                                <li><a href="calendar.html">&gt; <span>All Clients</span></a></li>
                            </ul>
                    </li>

                    <li>
                            <a href="#contracts" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                                    className="fa fa-object-group blue2_color"></i> <span>Manage Contracts</span></a>
                            <ul className="collapse list-unstyled" id="contracts">
                                <li><a href="calendar.html">&gt; <span>All Contracts</span></a></li>
                            </ul>
                    </li>
                    
                        <li>
                            <a href="#payments" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                                    className="fa fa-object-group blue2_color"></i> <span>Manage Payments</span></a>
                            <ul className="collapse list-unstyled" id="payments">
                                <li><a href="email.html">&gt; <span>Pending Payments</span></a></li>
                                <li><a href="calendar.html">&gt; <span>Monthly Report</span></a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
    );
}

export default Sidebar;
