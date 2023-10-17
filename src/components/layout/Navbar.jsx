import React, { useContext, useEffect, useState } from 'react'
import { LuSearch } from 'react-icons/lu';
import Link from 'next/link'
import { motion } from 'framer-motion'
import { navbarData } from '@/utils/constants';
import Button from '../elements/Button';
import Sidebar from './Sidebar';
import { jost } from '@/utils/fonts';
import authContext from '@/context/auth/authContext';
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {

    const [expandState, setExpandState] = useState(false)
    const [userExpand, setUserExpand] = useState(false)
    const { checkLoggedIn, user, logout } = useContext(authContext)

    const toggle = () => {
        setExpandState(!expandState)
    }

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {

        function checkScreenSize() {
            setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
        }

        window.addEventListener('resize', checkScreenSize);
        checkScreenSize();

        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    useEffect(() => {
        checkLoggedIn()
    }, [])

    useEffect(() => {
        console.log(user)
    }, [user])

    const showUserDetails = () => {
        setUserExpand(!userExpand)
    }

    const signOut = () => {
        logout()
        setUserExpand(false)
    }

    return (
        <>
            <div className={`${jost.className} wrapper overflow-hidden w-full`}>
                <nav className={`flex w-screen fixed top-0 left-0 z-50 backdrop-blur-2xl bg-[rgba(255,255,255,0.3)] items-center  justify-center pl-4 pr-2 py-2 md:pl-20 md:pr-8 lg:px-20 xl:px-28 `}>
                    <ul className='left hidden text-lg lg:w-1/3 lg:flex items-center text-black justify-start space-x-8'>
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
                            <Link href='/' className='text-3xl font-bold text-black'>
                                {/* <Image className='' src='/images/logo.png' height={200} width={200} alt='logo' /> */}
                                ReportEase
                            </Link>
                        </li>
                    </ul>

                    <ul className='right w-3/4 lg:w-1/3 flex items-center justify-end md:space-x-2 lg:space-x-3'>
                        <li className={`text-2xl mr-2`}>
                            <LuSearch />
                        </li>
                        {user !== null ?
                            <li onClick={showUserDetails} className='mr-2 cursor-pointer'>
                                <FaUserCircle className='text-3xl' />
                            </li> :
                            <li className='mr-2'>
                                <Button text='Sign Up' path='/sign-up' />
                            </li>}
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
                {userExpand &&
                    <div className={`credentials ${userExpand ? 'opacity-100' : 'opacity-0 scale-0'} transition-all duration-300 py-4 pb-6 bg-pureWhite text-[#565656] bg-white font-jost rounded-2xl shadow-2xl shadow-black absolute right-0 top-14 text-sm tracking-wide space-y-1 z-40`}>
                        <div className="name space-y-1 py-2 px-10">
                            <p className='font-bold text-black -mb-1 capitalize' title={user.name} >{user.name}</p>
                            <p className='text-black text-sm font-light' title={user.email}>{user.email}</p>
                        </div>
                        <div onClick={signOut} title='Sign-out' className="signout cursor-pointer py-2 px-10 hover:bg-[#f5f5f5]">
                            <FaSignOutAlt className='text-lg inline mr-2' />
                            <p className='inline'>Sign Out</p>
                        </div>
                    </div>
                }
                {expandState &&
                    <div className={`wrapper lg:hidden overflow-hidden ${expandState ? 'backdrop-blur-md' : 'hidden'} transition-all duration-300 fixed z-40`}>
                        <motion.div
                            initial={{ x: '100%', opacity: 0 }}
                            animate={{
                                x: isMobile ? (expandState ? '40%' : '100%') : (expandState ? '60%' : '100%'),
                                opacity: 1,
                            }}
                            transition={{ duration: 0.3 }}
                            className='pt-24 px-10 bg-[#e0e0e0] h-screen w-screen'>
                            <Sidebar />
                        </motion.div>
                    </div>
                }
            </div>
        </>
    )
}

export default Navbar