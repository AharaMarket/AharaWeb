import React from 'react'

const H1 = ({ children, className }) => {
    return ( 
        <h1 className={` text-2xl lg:text-28fs font-bold leading-4 text-white ${className}`}>{children}</h1>
    )
}

export default H1