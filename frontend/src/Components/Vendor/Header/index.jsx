import React, { useState } from 'react'
import H1 from '../../ui/typography/h1'
import H3 from '../../ui/typography/h3'
import H5 from '../../ui/typography/h5'
import Iconify from '../../ui/iconify'


const Header = () => {
    const [active, setActive] = useState('3')
    const [navOpen, setNavOpen] = useState(false)

    const data = [
        { id: '1', name: 'Dashboard', link: "" },
        { id: '2', name: 'Recipe Management', link: "" },
        { id: '3', name: 'Ingredient Marketplace', link: "" },
        { id: '4', name: 'Orders', link: "" },
    ]

    return (
        <>
            <header className='bg-light-purple flex items-center gap-16 lg:gap-32 justify-between px-4 md:px-7 h-24 '>
                <H1>Ahara</H1>
                <div className="hidden md:flex items-center grow gap-2 ">
                    {
                        data?.map((item) => (
                            <div key={item?.id} onClick={() => setActive(item?.id)} className={`h-12 flex items-center justify-center rounded hover:bg-dark-purple px-3 cursor-pointer ${active === item?.id ? "bg-dark-purple  " : ""} `}>
                                <H3 className={'text-nowrap'}>{item?.name}</H3>
                            </div>
                        ))
                    }
                </div>
                {/* Repsonsive Navbar Icons  */}
                <div className="flex md:hidden " onClick={() => setNavOpen(!navOpen)}>
                    {
                        navOpen ? (

                            <Iconify iconName={'maki:cross'} className={'z-50 text-custom-black'} />

                        ) : (
                            <Iconify iconName={'mingcute:menu-fill'} />
                        )
                    }
                </div>
                {/* Repsonsive Navbar  */}
                <div className={`md:hidden fixed top-0 left-0 h-screen flex  flex-col justify-center items-center border bg-white w-screen transition-transform duration-700 z-40  ${navOpen ? ' translate-x-0' : ' -translate-x-full'} `}>
                    {
                        data?.map((item) => (
                            <div key={item?.id} onClick={() => setActive(item?.id)} className={`h-12 flex items-center justify-center rounded  px-3 cursor-pointer  `}>
                                <H3 className={` text-lg text-custom-black  hover:text-dark-purple ${active == item?.id ? 'text-dark-purple' : 'text-custom-black'}`}>{item?.name}</H3>
                            </div>
                        ))
                    }
                </div>
            </header>
            {/* Bread Crums  */}
            <div className='flex flex-col gap-2 '>
                <div className="w-full px-4 md:px-7 py-6 border-b border-grey ">
                    <H1 className={'!text-custom-black font-medium'}>{data.map((_) => _?.id === active ? _?.name : '')}</H1>
                </div>
                <div className="flex gap-4 px-4 md:px-7 py-2">
                    <H5 className={'!text-light-purple'}>Home</H5>
                    <H5 className={' !font-semibold'}>|</H5>
                    <H5 className={'!text-custom-black font-medium'}>{data.map((_) => _?.id === active ? _?.name : '')}</H5>
                </div>
            </div>
        </>

    )
}

export default Header 