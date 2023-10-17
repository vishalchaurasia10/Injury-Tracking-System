import Uploads from "@/components/elements/Uploads";
import authContext from "@/context/auth/authContext";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

export default function Home() {
  const { user } = useContext(authContext);
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/sign-in')
    }
  }, [])

  return (
    <Uploads />
  )
}
