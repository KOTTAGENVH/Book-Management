"use client";
import Header from "@/components/header";
import Protected from "@/components/home";
import Public from "@/components/public";
import useAuth from "@/hooks/useAuth";
import { useBackgroundContext } from '@/contextApi/darkModeState';
import Loader from "@/components/loader";
import { Bounce, ToastContainer } from "react-toastify";


export default function Home() {
  const [isLogin,token , , loading] = useAuth();
  const { status } = useBackgroundContext();
  if (loading) {
    return <Loader />;
  }
  return (
    <div className={`h-screen min-w-screen overflow-y-auto overflow-x-hidden ${status ? "bg-bg-gradient-two" : "bg-bg-gradient-one"}  relative overflow-y-auto overflow-x-hidden relative `}>
      <Header />
      <ToastContainer theme="dark" transition={Bounce} />
      {
        isLogin ? <Protected token={token || ''} /> : <Public />
      }
    </div>
  );
}
