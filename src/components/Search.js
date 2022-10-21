import React from 'react';

const Search = ({placeholder}) => {
    return (
        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder={placeholder}  aria-describedby="basic-addon2" />
            <div class="input-group-append">
                <button class="btn btn-outline-success" type="button"><i className="fa fa-search text-success"></i></button>
            </div>
        </div>
    );
}

export default Search;
