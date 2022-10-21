import React from 'react';
import {Link} from 'react-router-dom'
import Button from './Button';


const Table = () => {
    return (
 <div className="col-12">
    <div className="white_shd full margin_bottom_30">
        <div className="table_section padding_infor_info">
            <div className="table-responsive-sm">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>john@example.com</td>
                         <td><Link to='/'><i className="fa fa-edit text-success"></i></Link>&nbsp;|&nbsp;<Link to='/'><i className="fa fa-trash text-danger"></i></Link></td>
                    </tr>
                    <tr>
                        <td>Mary</td>
                        <td>Moe</td>
                        <td>mary@example.com</td>
                        <td><Link to='/'><i className="fa fa-edit text-success"></i></Link>&nbsp;|&nbsp;<Link to='/'><i className="fa fa-trash text-danger"></i></Link></td>
                    </tr>
                    <tr>
                        <td>July</td>
                        <td>Dooley</td>
                        <td>july@example.com</td>
                           <td><Link to='/'><i className="fa fa-edit text-success"></i></Link>&nbsp;|&nbsp;<Link to='/'><i className="fa fa-trash text-danger"></i></Link></td>
                    </tr>
                    <tr>
                        <td>Mary</td>
                        <td>Moe</td>
                        <td>mary@example.com</td>
                         <td><Link to='/'><i className="fa fa-edit text-success"></i></Link>&nbsp;|&nbsp;<Link to='/'><i className="fa fa-trash text-danger"></i></Link></td>
                    </tr>                    
                </tbody>
            </table>
            </div>
        </div>
    </div>
</div>
    );
}

export default Table;
