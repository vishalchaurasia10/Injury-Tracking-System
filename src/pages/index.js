import Uploads from "@/components/elements/Uploads";
import authContext from "@/context/auth/authContext";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

export default function Home() {
  const { user } = useContext(authContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/sign-in');
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Home | ReportEase</title>
      </Head>
      <div>
        {user && <Uploads />}
      </div>
    </>
  );
}
