import React from "react";
import default_avatar from "../static/images/user_avatar.png";

const Client = () => {
  return (
    <div className="midde_cont">
      <div className="container-fluid">
        <div className="row column_title">
          <div className="col-md-12">
            <div className="page_title">
              <h2>Client</h2>
            </div>
          </div>
        </div>
        {/* row */}
        <div className="row column1">
          <div className="col-md-2" />
          <div className="col-md-8">
            <div className="white_shd full margin_bottom_30">
              <div className="full graph_head">
                <div className="heading1 margin_0">
                  <h2>Client profile</h2>
                </div>
              </div>
              <div className="full price_table padding_infor_info">
                <div className="row">
                  {/* user profile section */}
                  {/* profile image */}
                  <div className="col-lg-12">
                    <div className="full dis_flex center_text">
                      <div class="profile_img">
                        <img
                          width="180"
                          class="rounded-circle"
                          src={default_avatar}
                          alt="#"
                        />
                      </div>
                      <div className="profile_contant">
                        <div className="contact_inner">
                          <h3>John Smith</h3>
                          <p>
                            <strong>About: </strong>Frontend Developer
                          </p>
                          <ul className="list-unstyled">
                            <li>
                              <i className="fa fa-envelope-o" /> :
                              test@gmail.com
                            </li>
                            <li>
                              <i className="fa fa-phone" /> : 987 654 3210
                            </li>
                          </ul>
                        </div>
                        <div className="user_progress_bar">
                          <div className="progress_bar">
                            {/* Skill Bars */}
                            <span className="skill" style={{ width: "85%" }}>
                              Web Applications{" "}
                              <span className="info_valume">85%</span>
                            </span>
                            <div className="progress skill-bar ">
                              <div
                                className="progress-bar progress-bar-animated progress-bar-striped"
                                role="progressbar"
                                aria-valuenow={85}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                style={{ width: "85%" }}
                              ></div>
                            </div>
                            <span className="skill" style={{ width: "78%" }}>
                              Website Design{" "}
                              <span className="info_valume">78%</span>
                            </span>
                            <div className="progress skill-bar">
                              <div
                                className="progress-bar progress-bar-animated progress-bar-striped"
                                role="progressbar"
                                aria-valuenow={78}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                style={{ width: "78%" }}
                              ></div>
                            </div>
                            <span className="skill" style={{ width: "47%" }}>
                              Automation &amp; Testing{" "}
                              <span className="info_valume">47%</span>
                            </span>
                            <div className="progress skill-bar">
                              <div
                                className="progress-bar progress-bar-animated progress-bar-striped"
                                role="progressbar"
                                aria-valuenow={54}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                style={{ width: "54%" }}
                              ></div>
                            </div>
                            <span className="skill" style={{ width: "65%" }}>
                              UI / UX <span className="info_valume">65%</span>
                            </span>
                            <div className="progress skill-bar">
                              <div
                                className="progress-bar progress-bar-animated progress-bar-striped"
                                role="progressbar"
                                aria-valuenow={65}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                style={{ width: "65%" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* profile contant section */}
                    <div className="full inner_elements margin_top_30">
                      <div className="tab_style2">
                        <div className="tabbar">
                          <nav>
                            <div
                              className="nav nav-tabs"
                              id="nav-tab"
                              role="tablist"
                            >
                              <a
                                className="nav-item nav-link active"
                                id="nav-home-tab"
                                data-toggle="tab"
                                href="#recent_activity"
                                role="tab"
                                aria-selected="true"
                              >
                                Recent Activity
                              </a>
                              <a
                                className="nav-item nav-link"
                                id="nav-profile-tab"
                                data-toggle="tab"
                                href="#project_worked"
                                role="tab"
                                aria-selected="false"
                              >
                                Projects Worked on
                              </a>
                              <a
                                className="nav-item nav-link"
                                id="nav-contact-tab"
                                data-toggle="tab"
                                href="#profile_section"
                                role="tab"
                                aria-selected="false"
                              >
                                Profile
                              </a>
                            </div>
                          </nav>
                          <div className="tab-content" id="nav-tabContent">
                            <div
                              className="tab-pane fade show active"
                              id="recent_activity"
                              role="tabpanel"
                              aria-labelledby="nav-home-tab"
                            >
                              <div className="msg_list_main">
                                <ul className="msg_list">
                                  <li>
                                    <span>
                                      <img
                                        src="images/layout_img/msg2.png"
                                        className="img-responsive"
                                        alt="#"
                                      />
                                    </span>
                                    <span>
                                      <span className="name_user">
                                        Taison Jack
                                      </span>
                                      <span className="msg_user">
                                        Sed ut perspiciatis unde omnis.
                                      </span>
                                      <span className="time_ago">
                                        12 min ago
                                      </span>
                                    </span>
                                  </li>
                                  <li>
                                    <span>
                                      <img
                                        src="images/layout_img/msg3.png"
                                        className="img-responsive"
                                        alt="#"
                                      />
                                    </span>
                                    <span>
                                      <span className="name_user">
                                        Mike John
                                      </span>
                                      <span className="msg_user">
                                        On the other hand, we denounce.
                                      </span>
                                      <span className="time_ago">
                                        12 min ago
                                      </span>
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* end user profile section */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2" />
          </div>
          {/* end row */}
        </div>
      </div>
      {/* end dashboard inner */}
    </div>
  );
};

export default Client;
