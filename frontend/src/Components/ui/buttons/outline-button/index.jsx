import React from 'react'

const OutlineButton = ({ children, className, ...others }) => {
    return (
        <button className={` text-base font-medium rounded bg-white text-light-purple border-2 border-light-purple px-2 sm:px-4 py-2 sm:py-3.5 ${className}`} {...others}>{children}</button>
    )
}

export default OutlineButton