"use client";
import Header from "@/components/header";
import Protected from "@/components/home";
import Public from "@/components/public";
import useAuth from "@/hooks/useAuth";
import { useBackgroundContext } from '@/contextApi/darkModeState';
import Loader from "@/components/loader";


export default function Home() {
  const [isLogin, token, , loading] = useAuth();
  const { status } = useBackgroundContext();
  console.log("token", token);
  if (loading) {
    return <Loader />;
  }
  return (
    //isLogin ? <Protected /> : <Public />;
    <div className={`h-auto md:h-screen min-w-screen overflow-y-auto overflow-x-hidden ${status ? "bg-bg-gradient-two" : "bg-bg-gradient-one"}  relative overflow-y-auto overflow-x-hidden relative `}>
      <Header />
      {
        isLogin ? <Protected /> : <Public />
      }
    </div>
  );
}
