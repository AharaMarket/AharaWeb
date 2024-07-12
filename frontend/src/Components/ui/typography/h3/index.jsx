import React from 'react'

const H3 = ({ children, className, ...others }) => {
    return (
        <h3 className={` text-base lg:text-lg font-normal text-white ${className}`} {...others}>{children}</h3>
    )
}

export default H3