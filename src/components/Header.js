import React from 'react';
import Logout from './Logout';

const Header = () => {
    return (
                        <div className="topbar">
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <div className="full">
                            <button type="button" id="sidebarCollapse" className="sidebar_toggle"><i
                                    className="fa fa-bars"></i></button>
                            <div className="right_topbar">
                                <div className="icon_info">
                                    <ul>
                                        <li><a href="#"><i className="fa fa-bell-o"></i><span className="badge">2</span></a>
                                        </li>
                                        <li><a href="#"><i className="fa fa-question-circle"></i></a></li>
                                        <li><a href="#"><i className="fa fa-envelope-o"></i><span className="badge">3</span></a>
                                        </li>
                                    </ul>
                                            <Logout />
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
    );
}

export default Header;
