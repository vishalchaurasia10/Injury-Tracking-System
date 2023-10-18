import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router';
import authContext from '@/context/auth/authContext';

const ForgotPassword = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '', confirmPassword: '' })
    const { sendRecoveryLink, resetPassword, loading } = useContext(authContext)
    const router = useRouter()
    const userId = router.query.userId
    const secret = router.query.secret

    const onChangeHandler = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSendLink = (e) => {
        e.preventDefault()
        sendRecoveryLink(credentials, 'http://localhost:3000/forgot-password')
        setCredentials({ email: '', password: '', confirmPassword: '' })
    }

    const handleResetPassword = (e) => {
        e.preventDefault()
        const id = resetPassword(userId, secret, credentials)
        if (id) {
            setCredentials({ email: '', password: '', confirmPassword: '' })
        }
    }

    return (
        <>
            <div className={`wrapper transition-all px-5 lg:px-0 duration-300 h-screen bg-gray-200 flex justify-center items-center`}>
                <div className="content w-full md:w-[27%] border bg-pureWhite border-gray-300 p-6 rounded-2xl shadow-2xl shadow-black">
                    <div className="heading py-4">
                        <h1 className='font-bold text-2xl font-jost'>Reset Password</h1>
                        <h3>reset link will be sent to your email</h3>
                    </div>
                    <form className='form flex w-full flex-col space-y-4'>
                        <input onChange={onChangeHandler} className='border-2 w-full outline-none bg-[#fafafa] border-[#c6c6c6] p-3 px-4 rounded-xl' placeholder='Enter your email' value={credentials.email} type="email" name="email" id="email" />
                        {userId ?
                            <input onChange={onChangeHandler} className='border-2 w-full outline-none bg-[#fafafa] border-[#c6c6c6] p-3 px-4 rounded-xl' placeholder='Enter the password' value={credentials.password} type="password" name="password" id="password" />
                            : ''}
                        {userId ?
                            <input onChange={onChangeHandler} className='border-2 w-full outline-none bg-[#fafafa] border-[#c6c6c6] p-3 px-4 rounded-xl' placeholder='Confirm the password' value={credentials.confirmPassword} type="password" name="confirmPassword" id="confirmPassword" />
                            : ''}
                        {userId ?
                            <button onClick={handleResetPassword} className='btn btn-active btn-neutral bg-black text-white w-full rounded-xl'>Reset Password</button>
                            :
                            <button onClick={handleSendLink} className='btn btn-active btn-neutral bg-black text-white w-full rounded-xl'>
                                {loading && <span className="loading loading-spinner loading-md"></span>}
                                <span>Send Link</span>
                            </button>}
                    </form>
                </div>


            </div>
        </>
    )
}

export default ForgotPassword