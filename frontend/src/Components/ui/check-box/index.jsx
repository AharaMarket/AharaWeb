import React from 'react';
import Iconify from '../iconify';

const CheckBox = ({ className, value, onChange, labelClass, ...others }) => {
    const uniqueId = `checkbox_${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className={`inline-flex items-center ${className}`} {...others}>
            <label className="relative flex items-center rounded-full cursor-pointer" htmlFor={uniqueId}>
                <input type="checkbox"
                    className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded checked:border-2 border border-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900  checked:bg-white hover:before:opacity-10 "
                    id={uniqueId}
                    onChange={onChange}
                />
                <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                    <Iconify iconName={'ph:check-bold'} className={'!text-black !w-3.5 !h-3.5 mb-px'} />
                </span>
            </label>
            <label className={`mt-px -ml-1 !text-sm font-normal text-custom-black cursor-pointer select-none ${labelClass}`} htmlFor={uniqueId}>
                {value}
            </label>
        </div>
    );
};

export default CheckBox;
