import { signupFormFields } from '@/utils/constants'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import authContext from '@/context/auth/authContext'
import { useRouter } from 'next/router'

const SignUp = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '', name: '' })
    const { signup, user } = useContext(authContext)
    const router = useRouter()

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSignup = async () => {
        const id = await signup(credentials)
        if (id) {
            setCredentials({ email: '', password: '', name: '' })
            router.push('/sign-in')
        }
    }

    useEffect(() => {
        if (user) {
            router.push('/')
        }
    }, [user])

    return (
        <div className='flex px-8 md:px-40 lg:px-0 py-10 md:py-16 lg:pt-12 lg:py-0 flex-col items-center justify-center space-y-4 lg:space-y-3 xl:space-y-4'>
            <h1 className='text-black text-4xl md:text-5xl font-bold md:pb-4 lg:pb-0 xl:pb-4 lg:py-2'>Create an account</h1>
            <button className='btn btn-outline w-full lg:w-1/2 border-2 rounded-xl'>
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
                {signupFormFields.map((field, index) => {
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
            </div>
            <button onClick={handleSignup} className='btn btn-active btn-neutral bg-black text-white w-full lg:w-1/2 rounded-xl'>
                <span>Create account</span>
            </button>
            <div className="alreadyText">
                Already have an account? <span className='font-bold'>
                    <Link href='/sign-in'>
                        Login
                    </Link>
                </span>
            </div>
        </div>
    )
}

export default SignUp