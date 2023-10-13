import ForgotPassword from '@/components/authentication/ForgotPassword'
import { jost } from '@/utils/fonts'
import React from 'react'

const forgotPassword = () => {
    return (
        <div className={jost.className}>
            <ForgotPassword />
        </div>
    )
}

export default forgotPassword
