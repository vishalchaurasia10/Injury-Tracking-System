import Link from 'next/link'
import React from 'react'
import { navbarData } from '@/utils/constants';

const Sidebar = () => {

    return (
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
    )
}

export default Sidebar