import Navbar from '@/components/layout/Navbar'
import AuthState from '@/context/auth/AuthState'
import ReportState from '@/context/report/ReportState'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthState>
        <ReportState>
          <Navbar />
          <Component {...pageProps} />
        </ReportState>
      </AuthState>
    </>
  )
}
