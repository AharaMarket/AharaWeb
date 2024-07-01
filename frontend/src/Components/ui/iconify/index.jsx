import React from 'react'
import { Icon } from '@iconify/react'

const Iconify = ({ iconName, className }) => {
  return (
    <Icon icon={iconName} className={` w-6 h-6 text-white  cursor-pointer ${className}`} />
  )
}

export default Iconify