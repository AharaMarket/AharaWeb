import React from 'react'

const TailwindInput = ({ type, label, required, placeholder, className, ...others }) => {
    return (
        <>
            <div className="flex flex-col gap-1.5 w-full">
                <label className='text-sm text-dark-grey '>{label} {required ? <span className='text-red-600'>*</span> : null}</label>
                <input type={type} placeholder={placeholder} className={`h-9 w-full border border-gray-200 rounded outline-none px-2 text-sm ${className} `} {...others} />
            </div>
        </>

    )
}

export default TailwindInput 