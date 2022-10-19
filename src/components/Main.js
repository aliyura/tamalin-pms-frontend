import React from 'react';

const Main = () => {
    return (
                <div className="midde_cont">
                    <div className="container-fluid">
                        <div className="row column_title">
                            <div className="col-md-12">
                                <div className="page_title">
                                    <h2>Dashboard</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row column1">
                            <div className="col-md-6 col-lg-3">
                                <div className="full counter_section margin_bottom_30">
                                    <div className="couter_icon">
                                        <div>
                                            <i className="fa fa-user yellow_color"></i>
                                        </div>
                                    </div>
                                    <div className="counter_no">
                                        <div>
                                            <p className="total_no">2500</p>
                                            <p className="head_couter">Welcome</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3">
                                <div className="full counter_section margin_bottom_30">
                                    <div className="couter_icon">
                                        <div>
                                            <i className="fa fa-clock-o blue1_color"></i>
                                        </div>
                                    </div>
                                    <div className="counter_no">
                                        <div>
                                            <p className="total_no">123.50</p>
                                            <p className="head_couter">Average Time</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3">
                                <div className="full counter_section margin_bottom_30">
                                    <div className="couter_icon">
                                        <div>
                                            <i className="fa fa-cloud-download green_color"></i>
                                        </div>
                                    </div>
                                    <div className="counter_no">
                                        <div>
                                            <p className="total_no">1,805</p>
                                            <p className="head_couter">Collections</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3">
                                <div className="full counter_section margin_bottom_30">
                                    <div className="couter_icon">
                                        <div>
                                            <i className="fa fa-comments-o red_color"></i>
                                        </div>
                                    </div>
                                    <div className="counter_no">
                                        <div>
                                            <p className="total_no">54</p>
                                            <p className="head_couter">Comments</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row column1 social_media_section">
                            <div className="col-md-6 col-lg-3">
                                <div className="full socile_icons fb margin_bottom_30">
                                    <div className="social_icon">
                                        <i className="fa fa-facebook"></i>
                                    </div>
                                    <div className="social_cont">
                                        <ul>
                                            <li>
                                                <span><strong>35k</strong></span>
                                                <span>Friends</span>
                                            </li>
                                            <li>
                                                <span><strong>128</strong></span>
                                                <span>Feeds</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3">
                                <div className="full socile_icons tw margin_bottom_30">
                                    <div className="social_icon">
                                        <i className="fa fa-twitter"></i>
                                    </div>
                                    <div className="social_cont">
                                        <ul>
                                            <li>
                                                <span><strong>584k</strong></span>
                                                <span>Followers</span>
                                            </li>
                                            <li>
                                                <span><strong>978</strong></span>
                                                <span>Tweets</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3">
                                <div className="full socile_icons linked margin_bottom_30">
                                    <div className="social_icon">
                                        <i className="fa fa-linkedin"></i>
                                    </div>
                                    <div className="social_cont">
                                        <ul>
                                            <li>
                                                <span><strong>758+</strong></span>
                                                <span>Contacts</span>
                                            </li>
                                            <li>
                                                <span><strong>365</strong></span>
                                                <span>Feeds</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3">
                                <div className="full socile_icons google_p margin_bottom_30">
                                    <div className="social_icon">
                                        <i className="fa fa-google-plus"></i>
                                    </div>
                                    <div className="social_cont">
                                        <ul>
                                            <li>
                                                <span><strong>450</strong></span>
                                                <span>Followers</span>
                                            </li>
                                            <li>
                                                <span><strong>57</strong></span>
                                                <span>Circles</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- graph --> */}
                        <div className="row column2 graph margin_bottom_30">
                            <div className="col-md-l2 col-lg-12">
                                <div className="white_shd full">
                                    <div className="full graph_head">
                                        <div className="heading1 margin_0">
                                            <h2>Extra Area Chart</h2>
                                        </div>
                                    </div>
                                    <div className="full graph_revenue">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="content">
                                                    <div className="area_chart">
                                                        <canvas height="120" id="canvas"></canvas>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- end graph --> */}
                        <div className="row column3">
                            {/* <!-- testimonial --> */}
                            <div className="col-md-6">
                                <div className="dark_bg full margin_bottom_30">
                                    <div className="full graph_head">
                                        <div className="heading1 margin_0">
                                            <h2>Testimonial</h2>
                                        </div>
                                    </div>
                                    <div className="full graph_revenue">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="content testimonial">
                                                    <div id="testimonial_slider" className="carousel slide"
                                                        data-ride="carousel">
                                                        {/* <!-- Wrapper for carousel items --> */}
                                                        <div className="carousel-inner">
                                                            <div className="item carousel-item active">
                                                                <div className="img-box"><img
                                                                        src="images/layout_img/user_img.jpg" alt="" />
                                                                </div>
                                                                <p className="testimonial">Sed ut perspiciatis unde omnis
                                                                    iste natus error sit voluptatem accusantium
                                                                    doloremque laudantium, totam rem aperiam, eaque ipsa
                                                                    quae..</p>
                                                                <p className="overview"><b>Michael Stuart</b>Seo Founder</p>
                                                            </div>
                                                            <div className="item carousel-item">
                                                                <div className="img-box"><img
                                                                        src="images/layout_img/user_img.jpg" alt="" />
                                                                </div>
                                                                <p className="testimonial">Sed ut perspiciatis unde omnis
                                                                    iste natus error sit voluptatem accusantium
                                                                    doloremque laudantium, totam rem aperiam, eaque ipsa
                                                                    quae..</p>
                                                                <p className="overview"><b>Michael Stuart</b>Seo Founder</p>
                                                            </div>
                                                            <div className="item carousel-item">
                                                                <div className="img-box"><img
                                                                        src="images/layout_img/user_img.jpg" alt="" />
                                                                </div>
                                                                <p className="testimonial">Sed ut perspiciatis unde omnis
                                                                    iste natus error sit voluptatem accusantium
                                                                    doloremque laudantium, totam rem aperiam, eaque ipsa
                                                                    quae..</p>
                                                                <p className="overview"><b>Michael Stuart</b>Seo Founder</p>
                                                            </div>
                                                        </div>
                                                        {/* <!-- Carousel controls --> */}
                                                        <a className="carousel-control left carousel-control-prev"
                                                            href="#testimonial_slider" data-slide="prev">
                                                            <i className="fa fa-angle-left"></i>
                                                        </a>
                                                        <a className="carousel-control right carousel-control-next"
                                                            href="#testimonial_slider" data-slide="next">
                                                            <i className="fa fa-angle-right"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- end testimonial --> */}
                            {/* <!-- progress bar --> */}
                            <div className="col-md-6">
                                <div className="white_shd full margin_bottom_30">
                                    <div className="full graph_head">
                                        <div className="heading1 margin_0">
                                            <h2>Progress Bar</h2>
                                        </div>
                                    </div>
                                    <div className="full progress_bar_inner">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="progress_bar">
                                                    {/* <!-- Skill Bars --> */}
                                                    <span className="skill" style={{width:"73%"}}>Facebook <span
                                                            className="info_valume">73%</span></span>
                                                    <div className="progress skill-bar ">
                                                        <div className="progress-bar progress-bar-animated progress-bar-striped"
                                                            role="progressbar" aria-valuenow="73" aria-valuemin="0"
                                                            aria-valuemax="100" style={{width:"73%"}}>
                                                        </div>
                                                    </div>
                                                    <span className="skill" style={{width:"62%"}}>Twitter <span
                                                            className="info_valume">62%</span></span>
                                                    <div className="progress skill-bar">
                                                        <div className="progress-bar progress-bar-animated progress-bar-striped"
                                                            role="progressbar" aria-valuenow="62" aria-valuemin="0"
                                                            aria-valuemax="100" style={{width:"62%"}}>
                                                        </div>
                                                    </div>
                                                    <span className="skill" style={{width:"54%"}}>Instagram <span
                                                            className="info_valume">54%</span></span>
                                                    <div className="progress skill-bar">
                                                        <div className="progress-bar progress-bar-animated progress-bar-striped"
                                                            role="progressbar" aria-valuenow="54" aria-valuemin="0"
                                                            aria-valuemax="100" style={{width:"54%"}}>
                                                        </div>
                                                    </div>
                                                    <span className="skill" style={{width:"82%"}}>Google plus <span
                                                            className="info_valume">82%</span></span>
                                                    <div className="progress skill-bar">
                                                        <div className="progress-bar progress-bar-animated progress-bar-striped"
                                                            role="progressbar" aria-valuenow="82" aria-valuemin="0"
                                                            aria-valuemax="100" style={{width:"82%"}}>
                                                        </div>
                                                    </div>
                                                    <span className="skill" style={{width:"54%"}}>Other <span
                                                            className="info_valume">48%</span></span>
                                                    <div className="progress skill-bar">
                                                        <div className="progress-bar progress-bar-animated progress-bar-striped"
                                                            role="progressbar" aria-valuenow="48" aria-valuemin="0"
                                                            aria-valuemax="100" style={{width:"48%"}}>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                             </div>  
                    
                            {/* <!-- end progress bar --> */}
                        </div>
                        <div className="row column4 graph">
                            <div className="col-md-6 margin_bottom_30">
                                <div className="dash_blog">
                                    <div className="dash_blog_inner">
                                        <div className="dash_head">
                                            <h3><span><i className="fa fa-calendar"></i> 6 July 2018</span><span
                                                    className="plus_green_bt"><a href="#">+</a></span></h3>
                                        </div>
                                        <div className="list_cont">
                                            <p>Today Tasks for Ronney Jack</p>
                                        </div>
                                        <div className="task_list_main">
                                            <ul className="task_list">
                                                <li><a href="#">Meeting about plan for Admin Template
                                                        2018</a><br /><strong>10:00 AM</strong></li>
                                                <li><a href="#">Create new task for Dashboard</a><br /><strong>10:00
                                                        AM</strong></li>
                                                <li><a href="#">Meeting about plan for Admin Template
                                                        2018</a><br /><strong>11:00 AM</strong></li>
                                                <li><a href="#">Create new task for Dashboard</a><br /><strong>10:00
                                                        AM</strong></li>
                                                <li><a href="#">Meeting about plan for Admin Template
                                                        2018</a><br /><strong>02:00 PM</strong></li>
                                            </ul>
                                        </div>
                                        <div className="read_more">
                                            <div className="center"><a className="main_bt read_bt" href="#">Read More</a></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="dash_blog">
                                    <div className="dash_blog_inner">
                                        <div className="dash_head">
                                            <h3><span><i className="fa fa-comments-o"></i> Updates</span><span
                                                    className="plus_green_bt"><a href="#">+</a></span></h3>
                                        </div>
                                        <div className="list_cont">
                                            <p>User confirmation</p>
                                        </div>
                                        <div className="msg_list_main">
                                            <ul className="msg_list">
                                                <li>
                                                    <span><img src="images/layout_img/msg2.png" className="img-responsive"
                                                            alt="#" /></span>
                                                    <span>
                                                        <span className="name_user">Herman Beck</span>
                                                        <span className="msg_user">Sed ut perspiciatis unde omnis.</span>
                                                        <span className="time_ago">12 min ago</span>
                                                    </span>
                                                </li>
                                                <li>
                                                    <span><img src="images/layout_img/msg3.png" className="img-responsive"
                                                            alt="#" /></span>
                                                    <span>
                                                        <span className="name_user">John Smith</span>
                                                        <span className="msg_user">On the other hand, we denounce.</span>
                                                        <span className="time_ago">12 min ago</span>
                                                    </span>
                                                </li>
                                                <li>
                                                    <span><img src="images/layout_img/msg2.png" className="img-responsive"
                                                            alt="#" /></span>
                                                    <span>
                                                        <span className="name_user">John Smith</span>
                                                        <span className="msg_user">Sed ut perspiciatis unde omnis.</span>
                                                        <span className="time_ago">12 min ago</span>
                                                    </span>
                                                </li>
                                                <li>
                                                    <span><img src="images/layout_img/msg3.png" className="img-responsive"
                                                            alt="#" /></span>
                                                    <span>
                                                        <span className="name_user">John Smith</span>
                                                        <span className="msg_user">On the other hand, we denounce.</span>
                                                        <span className="time_ago">12 min ago</span>
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="read_more">
                                            <div className="center"><a className="main_bt read_bt" href="#">Read More</a></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
            </div>
        </div>

    );
}

export default Main;
