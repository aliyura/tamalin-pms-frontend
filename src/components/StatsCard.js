import React from 'react';

const StatsCard = ({icon, title, total, }) => {
    return (
        <div className="col-md-6 col-lg-3">
            <div className="full counter_section margin_bottom_30">
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
            </div>
        </div>
    );
}

export default StatsCard;
