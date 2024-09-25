import React from 'react'
import Iconify from '../../ui/iconify'
import H4 from '../../ui/typography/h4'
import H3 from '../../ui/typography/h3'

const FormSteper = ({ stepTwo }) => {
    return (
        <div className='flex justify-center items-center border-b border-grey'>
            <ol className="flex items-center justify-between px-4 md:px-7 py-5 w-full md:w-4/5 xl:w-2/5 text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
                <li className="flex w-full items-center text-blue-600 dark:text-blue-500 md:after:content-[''] after:w-full after:h-[1.5px] after:border-b after:border-grey-200 after:bg-gray-200 after:inline-block after:mx-0 after:xl:mx-1.5 dark:after:border-grey-700">
                    <div className='flex flex-col justify-center items-center w-full'>
                        <span className='flex justify-center items-center rounded-full w-9 h-9 bg-green  mb-2 sm:mb-1'>
                            <Iconify iconName={'ph:check-bold'} className={'!w-5 '} />
                        </span>
                        <H4 className='!font-medium !text-green sm:!text-nowrap mt-1'>Select Ingredients</H4>
                    </div>
                </li>
                <li className="flex w-full items-center text-blue-600 dark:text-blue-500 md:after:content-[''] after:w-full after:h-[1.5px] after:border-b after:border-grey-200 after:bg-gray-200  after:inline-block after:mx-0 after:xl:mx-5 dark:after:border-grey-700">
                    <div className='flex flex-col justify-center items-center w-full'>
                        {
                            stepTwo ? (
                                <>
                                    <span className='flex justify-center items-center rounded-full w-9 h-9 bg-green  mb-2 sm:mb-1'>
                                        <Iconify iconName={'ph:check-bold'} className={'!w-5 '} />
                                    </span>
                                    <H4 className='!font-medium !text-green sm:!text-nowrap mt-1'>Select Vendor</H4>
                                </>
                            ) : (
                                <>
                                    <span className='flex justify-center items-center rounded-full w-9 h-9 bg-light-purple  mb-2 sm:mb-1'>
                                        <H3 className="!text-white">2</H3>
                                    </span>
                                    <H4 className='!font-medium sm:!text-nowrap mt-1'>Select Vendor</H4>
                                </>

                            )
                        }

                    </div>
                </li>
                <li className="flex items-center">
                    <div className='flex flex-col justify-center items-center w-full md:-ml-4'>
                        <span className={`flex justify-center items-center rounded-full w-9 h-9  mb-1 sm:mb-1 ${stepTwo ? "bg-light-purple" : "bg-extra-light-purple opacity-40 "}`}>
                            <H3 className="!text-white">3</H3>
                        </span>
                        <H4 className='!font-medium sm:!text-nowrap'>Order Confirmation</H4>
                    </div>
                </li>
            </ol>
        </div >
    )
}

export default FormSteper
