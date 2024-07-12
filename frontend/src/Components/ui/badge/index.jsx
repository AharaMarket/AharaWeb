import React from 'react'

const Badge = ({ className, children }) => {
    return (
        <span className={`absolute top-1 right-2  bg-dark-purple text-10fs font-medium text-white w-fit  px-2 py-1 rounded-full shadow-lg ${className}`}>{children}</span>)
}

export default Badge