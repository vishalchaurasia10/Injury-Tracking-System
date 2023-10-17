import { jost } from '@/utils/fonts'
import React, { useContext, useEffect } from 'react'
import authContext from '@/context/auth/authContext'
import { useRouter } from 'next/router';

const Analytics = () => {
    const { user } = useContext(authContext);
    const router = useRouter();
    useEffect(() => {
        if (!user) {
            router.push('/sign-in');
        }
    }, [user]);

    return (
        <div className={`${jost.className} h-screen flex items-center justify-center text-7xl`}>
            {user && <h1>Coming soon...</h1>}
        </div>
    )
}

export default Analytics
