import React from 'react';

const Search = ({placeholder}) => {
    return (
        <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder={placeholder}  aria-describedby="basic-addon2" />
            <div className="input-group-append">
                <button className="btn btn-outline-success" type="button"><i className="fa fa-search text-success"></i></button>
            </div>
        </div>
    );
}

export default Search;
