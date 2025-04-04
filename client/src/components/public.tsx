import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";

const Public = ({ status = false }) => {
  return (
    <div
      className={`h-screen min-w-screen flex items-center justify-center ${
        status ? "bg-bg-gradient-two" : "bg-bg-gradient-one"
      }`}
    >
      <motion.div
        className="box"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <button
          title="logout"
          className={`bg-bg-gradient-five ${
            status
              ? "hover:bg-hover-h-bg-gradient"
              : "hover:bg-hover-h-bg-gradient-two"
          } backdrop-blur-lg flex items-center m-2 space-x-2 p-4 rounded-3xl shadow-lg hover:shadow-none`}
          onClick={() => window.location.reload()}
        >
          <FontAwesomeIcon icon={faRefresh} className="text-blue-600" />
        </button>
      </motion.div>
    </div>
  );
};

export default Public;
