import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { navbarData } from '@/utils/constants';

const Sidebar = () => {

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


    return (
        <div className={`wrapper lg:hidden overflow-hidden ${isExpanded ? 'backdrop-blur-md' : 'hidden'} transition-all duration-300 fixed z-30`}>
            <motion.div
                initial={{ x: '100%', opacity: 0 }}
                animate={{
                    x: isMobile ? (isExpanded ? '40%' : '100%') : (isExpanded ? '60%' : '100%'),
                    opacity: 1,
                }}
                transition={{ duration: 0.3 }}
                className='pt-24 px-10 bg-[#e0e0e0] h-screen w-screen'>
                <ul className='flex flex-col space-y-4 text-xl'>
                    {navbarData.map((item, index) => {
                        return (
                            <li key={index}>
                                <Link href={item.path}>
                                    {item.title}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </motion.div>
        </div>
    )
}

export default Sidebar