import React from 'react';

const Button = ({children}) => {
    return (
<button className='btn btn-outlined btn-success'>
    {children}
</button>
    );
}

export default Button;
