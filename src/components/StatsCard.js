import React from 'react';
import { Link } from 'react-router-dom';

const StatsCard = ({icon, title, total, link}) => {
    return (
        <div className="col-md-6 col-lg-3">
            <Link to={link} className="full counter_section margin_bottom_30">
                <div className="couter_icon">
                    <div>
                        <i className={`fa fa-${icon} yellow_color`}></i>
                    </div>
                </div>
                <div className="counter_no">
                    <div>
                        <p className="total_no">{total }</p>
                        <p className="head_couter">{ title }</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default StatsCard;
