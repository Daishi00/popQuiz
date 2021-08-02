import React, { useState } from "react";
import PopBox from "./PopBox";
import { AnimatePresence, motion } from "framer-motion";

import "./Start.scss";

const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: { duration: 1.5 }
  },
  exit: {
    x: "-100vw",
    transition: {
      ease: "easeInOut",
      duration: 1
    }
  }
};

const buttonVariants = {
  hover: {
    scale: 1.1,

    transition: {
      duration: 0.5,
      yoyo: Infinity
    }
  }
};

const Start = props => {
  const [visibility, setVisibility] = useState(false);

  return (
    <div>
      <AnimatePresence>
        {visibility ? null : (
          <motion.div
            className="start__container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="start__text__container">
              <p className="start__text">{props.startText}</p>
            </div>
            <div className="button__start__container">
              <motion.button
                className="button__start"
                onClick={setVisibility}
                variants={buttonVariants}
                whileHover="hover"
              >
                {props.buttonText}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {visibility && <PopBox />}
    </div>
  );
};

export default Start;
