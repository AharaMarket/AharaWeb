import React from 'react'
import Iconify from '../../ui/iconify'
import H4 from '../../ui/typography/h4'
import H3 from '../../ui/typography/h3'

function Stepper({ currentStep }) {
    return (
        <div className='flex justify-center items-center border-b border-grey'>
            <ol className="flex items-center justify-between px-4 md:px-7 py-5 w-full md:w-4/5 xl:w-2/5 text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
                {steps.map((step, index) => (
                    <li key={index} className={`flex items-center ${index < steps.length - 1 ? 'text-blue-600 dark:text-blue-500 md:after:content-[""] after:w-full after:h-[1.5px] after:border-b after:border-grey-200 after:bg-gray-200 after:inline-block after:mx-0 after:xl:mx-1.5 dark:after:border-grey-700' : ''}`}>
                        <div className='flex flex-col justify-center items-center w-full'>
                            {
                                currentStep > index + 1 ? (
                                    <>
                                        <span className='flex justify-center items-center rounded-full w-9 h-9 bg-green mb-2 sm:mb-1'>
                                            <Iconify iconName={'ph:check-bold'} className={'!w-5'} />
                                        </span>
                                        <H4 className='!font-medium !text-green sm:!text-nowrap mt-1'>{step.title}</H4>
                                    </>
                                ) : (
                                    <>
                                        <span className={`flex justify-center items-center rounded-full w-9 h-9 mb-2 sm:mb-1 ${currentStep === index + 1 ? 'bg-light-purple' : 'bg-extra-light-purple opacity-40'}`}>
                                            <H3 className="!text-white">{index + 1}</H3>
                                        </span>
                                        <H4 className='!font-medium sm:!text-nowrap mt-1'>{step.title}</H4>
                                    </>
                                )
                            }
                        </div>
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
