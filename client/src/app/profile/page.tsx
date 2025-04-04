"use client";
import Header from '@/components/header';
import Loader from '@/components/loader';
import ProfileDash from '@/components/profile/profileDash';
import { useBackgroundContext } from '@/contextApi/darkModeState';
import useAuth from '@/hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { faHome } from '@fortawesome/free-solid-svg-icons';
import MyBooks from '@/components/profile/myBooks';

function Page() {
  const router = useRouter();
  const [, token, , loading] = useAuth();
  const { status } = useBackgroundContext();

  if (loading) {
    return <Loader />;
  }
  return (
    <div className={`h-screen min-w-screen overflow-y-auto overflow-x-hidden ${status ? "bg-bg-gradient-two" : "bg-bg-gradient-one"}  relative overflow-y-auto overflow-x-hidden relative `}>
      <Header />
      <div className="w-full flex justify-left mt-28">
        <motion.div
          className="origin-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <button
            title="Home"
            className={`bg-bg-gradient-five ${status ? "hover:bg-hover-h-bg-gradient" : "hover:bg-hover-h-bg-gradient-two"} 
        backdrop-blur-lg flex items-center 
        ${status ? "text-white" : "text-black-700"} 
        space-x-2 px-6 py-3 m-2 rounded-3xl 
        shadow-lg hover:shadow-none transition-all duration-300`}
            onClick={() => router.push("/")}
          >
            <FontAwesomeIcon icon={faHome} className={`${status ? "text-white-950" : "text-blue-950"}`} />
          </button>
        </motion.div>
      </div>

      <ProfileDash token={token || ''} />
      <MyBooks token={token || ''} />
    </div>
  )
}

export default Page;