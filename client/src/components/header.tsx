"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSignOut, faSun, faUser } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useBackgroundContext } from "@/contextApi/darkModeState";
import useAuth from "@/hooks/useAuth";

function Header() {
  const router = useRouter();
  const { status, toggleBackground } = useBackgroundContext();
  const [, , keycloak,] = useAuth();

  //Handle Home Click
  const handleHomeClick = () => {
    router.push("/");
  };

  const handleLogout = () => {
    if (keycloak) {
      keycloak.logout({
        redirectUri: "http://localhost:3000/",
      });
    } else {
      console.warn("Keycloak not initialized yet");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <nav className="flex items-center justify-between bg-transparent p-bg-opacity-50 backdrop-blur-2xl shadow-2xl rounded-xl p-2  m-4 ">
        {/* Left Side (Logo) */}
        <div className="w-auto h-auto">
          <Image
            src="/logo.png"
            width={60}
            height={60}
            alt="Book Realm Logo"
            onClick={handleHomeClick}
            className="rounded-xl select-none pointer-events-none"
            onLoad={(event) => event.currentTarget.classList.remove("opacity-0")}
            draggable={false}
          />
        </div>
        <div className="flex flex-row w-auto h-auto">
          {/* Bg Status Button */}
          <motion.div
            className="box relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <button
              title="dark mode"
              className={` bg-bg-gradient-five ${status ? " hover:bg-hover-h-bg-gradient" : "hover:bg-hover-h-bg-gradient-two"} backdrop-blur-lg flex items-center ${status ? "text-white" : "text-black-700"} m-2 space-x-2 p-4 rounded-3xl shadow-lg hover:shadow-none`}
              onClick={() => toggleBackground(!status)}
            >
              <FontAwesomeIcon  icon={status ? faMoon : faSun} className={`${status ? "text-blue-950" : "text-yellow-500"}`} />

            </button>
          </motion.div>
          {/* Profile Button */}
          <motion.div
            className="box relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <button
              title="profile"
              className={` bg-bg-gradient-five ${status ? " hover:bg-hover-h-bg-gradient" : "hover:bg-hover-h-bg-gradient-two"} backdrop-blur-lg flex items-center ${status ? "text-white" : "text-black-700"} m-2 space-x-2 p-4 rounded-3xl shadow-lg hover:shadow-none`}
              onClick={() => router.push("/profile")}
            >
              <FontAwesomeIcon icon={faUser} className={`${status ? "text-blue-950" : "text-white"}`} />

            </button>
          </motion.div>


          {/* Logout Button */}
          <motion.div
            className="box"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <button
              title="logout"
              className={` bg-bg-gradient-five ${status ? " hover:bg-hover-h-bg-gradient" : "hover:bg-hover-h-bg-gradient-two"} backdrop-blur-lg flex items-center m-2 space-x-2 p-4 rounded-3xl shadow-lg hover:shadow-none`}
              onClick={() => handleLogout()}
            >
              <FontAwesomeIcon icon={faSignOut} className={`${status ? "text-red-500" : "text-red-950"}`} />
            </button>
          </motion.div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
