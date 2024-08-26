import React, { useState, useEffect, useRef } from 'react';
import TailwindInput from '../input';
import Iconify from '../iconify';
import H5 from '../typography/h5';

const TailwindSelect = () => {
    const options = [
        { id: '1', state: 'California' },
        { id: '2', state: 'Oregon' },
        { id: '3', state: 'Washington' },
        { id: '4', state: 'Nevada' },
    ];

    const [dropdownActive, setDropdownActive] = useState(false);
    const [activeOpt, setActiveOpt] = useState('Select State');
    const [activeOptId, setActiveOptId] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const outsideHandler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownActive(false);
            }
        };

        document.addEventListener('mousedown', outsideHandler);
        return () => {
            document.removeEventListener('mousedown', outsideHandler);
        };
    }, []);

    const handleOptionClick = (id, state) => {
        setActiveOpt(state);
        setActiveOptId(id);
        setDropdownActive(false);
    };

    return (
        <div className='relative w-full'>
            <div className="flex flex-col gap-1.5 w-full cursor-pointer" onClick={() => setDropdownActive(!dropdownActive)}>
                <label className='text-sm text-dark-grey'>
                    State <span className='text-red-600'>*</span>
                </label>
                <div className="flex items-center gap-2 h-9 w-full px-3 border border-gray-200 rounded wd">
                    <span className='grow pl-1 text-sm text-dark-grey'>{activeOpt}</span>
                    <Iconify iconName={'ep:arrow-down-bold'} className={`!text-custom-black !w-4 !h-4 ${dropdownActive ? '-rotate-180' : ""}`} />
                </div>
            </div>
            {dropdownActive && (
                <div ref={dropdownRef} className='w-full h-fit absolute top-14 bg-white shadow-lg border border-gray-200 divide-y divide-gray-200 rounded-b-md z-40'>
                    {options.map((item) => (
                        <H5
                            key={item.id}
                            onClick={() => handleOptionClick(item.id, item.state)}
                            className={`!font-normal cursor-pointer hover:bg-gray-100 p-2 ${activeOptId === item.id ? 'bg-gray-100' : ''}`}
                        >
                            {item.state}
                        </H5>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TailwindSelect;
