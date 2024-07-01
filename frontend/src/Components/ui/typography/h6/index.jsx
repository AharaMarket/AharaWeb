import React from 'react'

const H6 = ({children, className, ...others}) => {
  return (
    <h6 className={` text-xs font-normal ${className}`}{...others}>{children}</h6>
  )
}

export default H6