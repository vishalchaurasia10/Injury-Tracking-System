import Navbar from '@/components/layout/Navbar'
import AuthState from '@/context/auth/AuthState'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthState>
        <Navbar />
        <Component {...pageProps} />
      </AuthState>
    </>
  )
}
