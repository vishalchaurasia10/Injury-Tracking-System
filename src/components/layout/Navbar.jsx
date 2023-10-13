import React, { useState } from 'react'
import { FiShoppingCart } from 'react-icons/fi';
import { LuSearch } from 'react-icons/lu';
import Link from 'next/link'
// import Sidebar from './Sidebar';
import { motion } from 'framer-motion'
import { navbarData } from '@/utils/constants';
import Button from '../elements/Button';

const Navbar = () => {

    const [expandState, setExpandState] = useState(false)

    const toggle = () => {
        setExpandState(!expandState)
    }

    return (
        <>
            <div className="wrapper overflow-hidden w-full">
                <nav className={`flex w-screen fixed top-0 left-0 z-50 backdrop-blur-2xl bg-[rgba(255,255,255,0.3)] items-center  justify-center pl-4 pr-2 py-2 md:pl-20 md:pr-8 lg:px-20 xl:px-28 `}>
                    <ul className='left hidden text-lg lg:w-1/3 lg:flex items-center text-white justify-start space-x-8'>
                        {navbarData.map((item, index) => {
                            return (
                                <li key={index}>
                                    <Link href={item.path}>
                                        {item.title}
                                    </Link>
                                </li>
                            )
                        }
                        )}
                    </ul>

                    <ul className='center w-1/4 lg:w-1/3 flex lg:justify-center items-center'>
                        <li>
                            <Link href='/' className='text-3xl font-bold text-white'>
                                {/* <Image className='' src='/images/logo.png' height={200} width={200} alt='logo' /> */}
                                Logo
                            </Link>
                        </li>
                    </ul>

                    <ul className='right w-3/4 lg:w-1/3 flex items-center justify-end md:space-x-2 lg:space-x-3'>
                        <li className='mr-2'>
                            <Button text='Sign Up' path='/sign-up' />
                        </li>
                        <li className={`text-2xl mr-2`}>
                            <LuSearch />
                        </li>
                        <li className='mr-1'>
                            <Link href='/cart' className={`text-2xl`}>
                                <FiShoppingCart />
                            </Link>
                        </li>
                        <li>
                            <div className="hamburger mx-2 lg:hidden flex flex-col space-y-1" onClick={toggle}>
                                <motion.div
                                    initial={{ rotate: 0 }}
                                    animate={{ rotate: expandState ? 45 : 0, y: expandState ? 7 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className={`line w-7 h-[0.2rem] bg-black rounded-full`}
                                ></motion.div>
                                <motion.div
                                    initial={{ opacity: 1 }}
                                    animate={{ opacity: expandState ? 0 : 1 }}
                                    transition={{ duration: 0.2 }}
                                    className={`line text-left w-6 h-[0.2rem] bg-black rounded-full`}
                                ></motion.div>
                                <motion.div
                                    initial={{ rotate: 0 }}
                                    animate={{ rotate: expandState ? -45 : 0, y: expandState ? -8 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className={`line w-7 h-[0.2rem] bg-black rounded-full`}
                                ></motion.div>
                            </div>
                        </li>
                    </ul>
                </nav>
                {/* <Sidebar /> */}
            </div>
        </>
    )
}

export default Navbar