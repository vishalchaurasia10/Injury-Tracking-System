import Reports from '@/components/elements/Reports'
import React from 'react'
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import authContext from '@/context/auth/authContext';
import Head from 'next/head';

const ReportsPage = () => {
    const { user } = useContext(authContext);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/sign-in');
        }
    }, [user]);

    return (
        <>
            <Head>
                <title>Reports | ReportEase</title>
            </Head>
            <div>
                {user && <Reports />}
            </div>
        </>
    )
}

export default ReportsPage
