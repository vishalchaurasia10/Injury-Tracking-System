import { Toaster, toast } from "react-hot-toast";
import AuthContext from "./authContext";
import { Client, Account, ID } from "appwrite";
import { useRouter } from "next/router";

const AuthState = (props) => {

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

    return (
        <>
            <Toaster />
            <AuthContext.Provider value={{
                signup, signin, resetPassword, sendRecoveryLink
            }}>
                {props.children}
            </AuthContext.Provider>
        </>
    )
}

export default AuthState