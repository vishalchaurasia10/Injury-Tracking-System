import React, { useEffect, useState } from 'react'
import { Client, Account } from "appwrite";
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { AiFillCheckCircle, AiFillCloseCircle, AiFillExclamationCircle } from 'react-icons/ai';

const Verificaiton = () => {

    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {

        const handleVerification = async () => {
            try {
                const client = new Client()
                    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
                    .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);                 // Your project ID

                const account = new Account(client);

                const urlParams = new URLSearchParams(window.location.search);
                const secret = urlParams.get('secret');
                const userId = urlParams.get('userId');

                const promise = await account.updateVerification(userId, secret);
                if (promise.$id) {
                    toast.success('Email verified successfully')
                    setVerified(true)
                } else {
                    toast.error('Something went wrong')
                }
            } catch (error) {
                setError(true)
                toast.error(error.message)
            }
        }

        handleVerification()
    }, [])
    return (
        <>
            <Toaster />
            {error ?
                <div className='min-h-screen text-center flex flex-col items-center justify-center space-y-4'>
                    <AiFillCloseCircle className='text-red-500 text-9xl' />
                    <h1 className='text-black text-4xl md:text-5xl font-bold md:pb-4 lg:pb-0 xl:pb-4 lg:py-2'>Some error occurred</h1>
                    <Link href='/'>
                        <button className='btn btn-active btn-neutral bg-black text-white w-full rounded-xl'>
                            <span>Home</span>
                        </button>
                    </Link>
                </div>
                :
                (verified ?
                    <div className='min-h-screen text-center flex flex-col items-center justify-center space-y-4'>
                        <AiFillCheckCircle className='text-green-500 text-9xl' />
                        <h1 className='text-black text-4xl md:text-5xl font-bold md:pb-4 lg:pb-0 xl:pb-4 lg:py-2'>Email verified successfully</h1>
                        <Link href='/sign-in'>
                            <button className='btn btn-active btn-neutral bg-black text-white w-full rounded-xl'>
                                <span>Login</span>
                            </button>
                        </Link>
                    </div>
                    :
                    <div className='min-h-screen text-center flex flex-col items-center justify-center space-y-4'>
                        <AiFillExclamationCircle className='text-orange-400 text-9xl' />
                        <h1 className='text-black text-4xl md:text-5xl font-bold md:pb-4 lg:pb-0 xl:pb-4 lg:py-2'>Email verifying...</h1>
                    </div>)
            }
        </>
    )
}

export default Verificaiton
