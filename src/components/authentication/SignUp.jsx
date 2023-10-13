import { signupFormFields } from '@/utils/constants'
import Link from 'next/link'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'

const SignUp = () => {
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
                        <input key={index} className='border-2 w-full outline-none bg-[#fafafa] border-[#c6c6c6] p-3 px-4 mx-4 rounded-xl' placeholder={field.placeholder} type={field.type} name={field.name} id={field.name} />
                    )
                })}
            </div>
            <button className='btn btn-active btn-neutral bg-black text-white w-full lg:w-1/2 rounded-xl'>
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