import { Toaster, toast } from "react-hot-toast";
import AuthContext from "./authContext";
import { Client, Account, ID } from "appwrite";
import { useRouter } from "next/router";
import { useState } from "react";

const AuthState = (props) => {

    const [user, setUser] = useState(null); // [1
    const router = useRouter();
    const client = new Client()
        .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
        .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

    const account = new Account(client);

    const signup = async (credentials) => {
        try {
            const res = await account.create(ID.unique(), credentials.email, credentials.password, credentials.name);
            if (res.$id) {
                toast.success('Account created successfully');
                await account.createEmailSession(credentials.email, credentials.password);
                sendVerificationLink(`http://localhost:3000/verification`);
            }
            return res.$id;
        } catch (error) {
            toast.error(error.message);
        }
    }

    const sendVerificationLink = async (url) => {
        try {
            const res = await account.createVerification(url);
            if (res.$id) {
                toast.success('Verification email sent');
            }
        } catch (error) {
            toast.error(error.message);
            console.error(error);
        }
    }

    const signin = async (credentials) => {
        try {
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
            return res.$id;
        } catch (error) {
            toast.error(error.message);
        }
    }

    const sendRecoveryLink = async (credentials, url) => {
        try {
            const res = await account.createRecovery(credentials.email, url);
            if (res.$id) {
                toast.success('Recovery email sent');
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const resetPassword = async (userId, secret, credentials) => {
        try {
            const response = await account.updateRecovery(userId, secret, credentials.password, credentials.confirmPassword);
            if (response.$id) {
                toast.success('Password reset successfully');
                router.push('/sign-in');
            }
            return response.$id;
        } catch (error) {
            toast.error(error.message)
        }
    }

    const checkLoggedIn = async () => {
        try {
            const res = await account.get();
            if (res.$id) {
                setUser({ name: res.name, email: res.email });
                return true;
            }
        } catch (error) {
            console.error(error);
        }
    }

    const logout = async () => {
        try {
            await account.deleteSession('current');
            localStorage.clear();
            router.push('/sign-in');
            setUser(null);
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }

    const googleAuth = async () => {
        try {
            const res = await account.createOAuth2Session('google', 'http://localhost:3000/', 'http://localhost:3000/sign-in');
            if (res) {
                toast.success('Logged in successfully');
                setUser({ name: res.name, email: res.email });
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <>
            <Toaster />
            <AuthContext.Provider value={{
                signup, signin, resetPassword, sendRecoveryLink, checkLoggedIn, user, logout, googleAuth
            }}>
                {props.children}
            </AuthContext.Provider>
        </>
    )
}

export default AuthState