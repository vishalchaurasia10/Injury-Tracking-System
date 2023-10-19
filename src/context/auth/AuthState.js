import { Toaster, toast } from "react-hot-toast";
import AuthContext from "./authContext";
import { Client, Account, ID } from "appwrite";
import { useRouter } from "next/router";
import { useState } from "react";

const AuthState = (props) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const client = new Client()
        .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
        .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

    const account = new Account(client);

    const signup = async (credentials) => {
        try {
            setLoading(true);
            const res = await account.create(ID.unique(), credentials.email, credentials.password, credentials.name);
            if (res.$id) {
                toast.success('Account created successfully');
                await account.createEmailSession(credentials.email, credentials.password);
                sendVerificationLink(`${process.env.NEXT_PUBLIC_API_URL}/verification`);
            }
            setLoading(false);
            return res.$id;
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    }

    const sendVerificationLink = async (url) => {
        try {
            setLoading(true);
            const res = await account.createVerification(url);
            if (res.$id) {
                toast.success('Verification email sent');
            }
            setLoading(false);
        } catch (error) {
            toast.error(error.message);
            console.error(error);
            setLoading(false);
        }
    }

    const signin = async (credentials) => {
        try {
            setLoading(true);
            const res = await account.createEmailSession(credentials.email, credentials.password);
            const verified = await account.get(credentials.email);
            if (verified.emailVerification === false) {
                toast.error('Email not verified');
                localStorage.clear();
                return
            } else {
                toast.success('Logged in successfully');
                setUser({ name: verified.name, email: verified.email });
            }
            setLoading(false);
            return res.$id;
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    }

    const sendRecoveryLink = async (credentials, url) => {
        try {
            setLoading(true);
            const res = await account.createRecovery(credentials.email, url);
            if (res.$id) {
                toast.success('Recovery email sent');
            }
            setLoading(false);
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    }

    const resetPassword = async (userId, secret, credentials) => {
        try {
            setLoading(true);
            const response = await account.updateRecovery(userId, secret, credentials.password, credentials.confirmPassword);
            if (response.$id) {
                toast.success('Password reset successfully');
                router.push('/sign-in');
            }
            setLoading(false);
            return response.$id;
        } catch (error) {
            toast.error(error.message)
            setLoading(false);
        }
    }

    const checkLoggedIn = async () => {
        try {
            setLoading(true);
            const res = await account.get();
            if (res.$id) {
                setUser({ name: res.name, email: res.email });
                return true;
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    const logout = async () => {
        try {
            setLoading(true);
            await account.deleteSession('current');
            localStorage.clear();
            router.push('/sign-in');
            setUser(null);
            setLoading(false);
        } catch (error) {
            console.error(error);
            toast.error(error.message);
            setLoading(false);
        }
    }

    const googleAuth = async () => {
        try {
            setLoading(true);
            const account = new Account(client);
            const res = await account.createOAuth2Session('google', process.env.NEXT_PUBLIC_API_URL, `${process.env.NEXT_PUBLIC_API_URL}/sign-in`);
            if (res) {
                toast.success('Logged in successfully');
                setUser({ name: res.name, email: res.email });
            }
            setLoading(false);
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    }

    return (
        <>
            <Toaster />
            <AuthContext.Provider value={{
                signup, signin, resetPassword, sendRecoveryLink, checkLoggedIn, user, logout, googleAuth, loading
            }}>
                {props.children}
            </AuthContext.Provider>
        </>
    )
}

export default AuthState