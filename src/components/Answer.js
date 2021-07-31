import React from "react";
import { motion } from "framer-motion";

import "./Answer.scss";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 1.5,
      duration: 1,
    },
  },
};

const buttonVariants = {
  initial: {
    opacity: 0.85,
  },
  hover: {
    scale: 1.1,
    opacity: 1,
    transition: {
      duration: 0.1,
    },
  },
};

const Answer = (props) => {
  return (
    <motion.div
      className="answer__container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="answer__text">
        <p>
          Does {props.country2} have <br />
          <span className="answer__text--red">LOWER</span> or{" "}
          <span className="answer__text--green">HIGHER</span> <br /> population
          than {props.country1}
        </p>
      </div>
      <div className="button__wrapper">
        <motion.button
          className="button__answer button__answer--lower "
          onClick={props.checkAnswerLower}
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
        >
          <i className="angle down icon large"></i>
        </motion.button>
        <motion.button
          className="button__answer button__answer--higher"
          onClick={props.checkAnswerHigher}
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
        >
          <i className="angle up icon large"></i>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Answer;
