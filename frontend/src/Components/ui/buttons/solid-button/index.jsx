import React from 'react'

const SolidButton = ({ children, className, ...others }) => {
    return (
        <button className={` text-base font-medium rounded bg-light-purple text-white px-2 sm:px-4 py-2 sm:py-3.5 ${className}`} {...others}>{children}</button>
    )
}

export default SolidButton