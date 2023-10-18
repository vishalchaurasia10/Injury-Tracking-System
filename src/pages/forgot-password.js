import ForgotPassword from '@/components/authentication/ForgotPassword'
import { jost } from '@/utils/fonts'
import Head from 'next/head'
import React from 'react'

const forgotPassword = () => {
    return (
        <>
            <Head>
                <title>Forgot Password | ReportEase</title>
            </Head>
            <div className={jost.className}>
                <ForgotPassword />
            </div>
        </>
    )
}

export default forgotPassword
