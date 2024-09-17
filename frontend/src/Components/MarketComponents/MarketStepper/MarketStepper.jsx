import React from 'react';
import Iconify from '../../ui/iconify';
import H4 from '../../ui/typography/h4';
import H3 from '../../ui/typography/h3';

function Stepper({ currentStep }) {
    return (
        <div className='flex justify-center items-center border-b border-grey'>
            <ol className="flex items-center justify-between px-4 md:px-7 py-5 w-full md:w-4/5 xl:w-2/5 text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base relative">
                {steps.map((step, index) => (
                    <li key={index} className="flex items-center w-full relative">
                        <div className='flex flex-col items-center w-full'>
                            <span className={`flex justify-center items-center rounded-full w-9 h-9 mb-2 sm:mb-1 ${currentStep === index + 1 ? 'bg-light-purple' : 'bg-extra-light-purple opacity-40'}`}>
                                {currentStep > index + 1 ? (
                                    <Iconify iconName={'ph:check-bold'} className={'!w-5 text-white'} />
                                ) : (
                                    <H3 className="!text-white">{index + 1}</H3>
                                )}
                            </span>
                            <H4 className='!font-medium sm:!text-nowrap mt-1'>{step.title}</H4>
                        </div>
                        {index < steps.length - 1 && (
                            <div className='absolute top-1/2 w-full h-[1.5px] bg-grey-200 dark:bg-grey-700' style={{ left: '100%', marginLeft: '1rem', transform: 'translateY(-50%)' }}></div>
                        )}
                    </li>
                ))}
            </ol>
        </div>
    );
}

const steps = [
    { title: 'Select Ingredients' },
    { title: 'Select Vendor' },
    { title: 'Order Confirmation' }
];

export default Stepper;
