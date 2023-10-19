import { signinFormFields } from '@/utils/constants'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import authContext from '@/context/auth/authContext'
import { useRouter } from 'next/router'

const SignIn = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const { signin, googleAuth, user, loading } = useContext(authContext)
    const router = useRouter()

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSignin = async () => {
        const id = await signin(credentials)
        if (id) {
            setCredentials({ email: '', password: '' })
            router.push('/')
        }
    }

    useEffect(() => {
        if (user) {
            router.push('/')
        }
    }, [user])

    return (
        <div className='flex px-8 md:px-40 lg:px-0 py-10 md:py-16 lg:pt-12 lg:py-0 flex-col items-center justify-center space-y-4 lg:space-y-3 xl:space-y-4'>
            <h1 className='text-black text-4xl md:text-5xl font-bold md:pb-4 lg:pb-0 xl:pb-4 lg:py-2'>Welcome Back</h1>
            <button onClick={googleAuth} className='btn btn-outline w-full lg:w-1/2 border-2 rounded-xl'>
                <span className='text-2xl pb-1'>
                    <FcGoogle />
                </span>
                <span className='font-medium'>Continue with Google</span>
            </button>
            <div className="or w-full lg:w-1/2 py-4 lg:py-0 xl:py-4 flex items-center space-x-4">
                <div className='w-full h-[0.075rem] bg-gray-300' />
                <div className='text-xl pb-1'>or</div>
                <div className='w-full h-[0.075rem] bg-gray-300' />
            </div>
            <div className="inputs w-full lg:w-1/2 pb-6 lg:pb-0 xl:pb-6 flex flex-col items-center space-y-2">
                {signinFormFields.map((field, index) => {
                    return (
                        <input
                            key={index}
                            onChange={handleChange}
                            className='border-2 w-full outline-none bg-[#fafafa] border-[#c6c6c6] p-3 px-4 mx-4 rounded-xl'
                            placeholder={field.placeholder}
                            value={credentials[field.name]}
                            type={field.type}
                            name={field.name}
                            id={field.name} />
                    )
                })}
                <div>
                    <Link className='text-sm hover:underline' href='/forgot-password'>
                        Forgot Password
                    </Link>
                </div>
            </div>
            <button onClick={handleSignin} className='btn btn-active btn-neutral bg-black text-white w-full lg:w-1/2 rounded-xl'>
                {loading && <span className="loading loading-spinner loading-md"></span>}
                <span>Log in</span>
            </button>
            <div className="alreadyText">
                No account? <span className='font-bold'>
                    <Link href='/sign-up'>
                        Create an account
                    </Link>
                </span>
            </div>
        </div>
    )
}

export default SignIn