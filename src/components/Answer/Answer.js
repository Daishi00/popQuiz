import React from "react";
import { motion } from "framer-motion";
import icon from "../../assets/icon.svg";
import "./Answer.scss";

const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 1,
      duration: 1
    }
  }
};

const buttonVariants = {
  initial: {
    opacity: 1
  },
  hover: {
    backgroundColor: "#33b864",
    transition: {
      duration: 0.1
    }
  },
  tap: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 0.2
    }
  }
};

const Answer = props => {
  return (
    <motion.div
      className="answer__container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="answer__text__container">
        <p className="answer__text">Which country has larger population</p>
      </div>
      <div className="answer__btn__container">
        <motion.button
          className="answer__btn answer__btn--left"
          onClick={props.checkAnswerLower}
          onMouseOver={props.highlightCountry1}
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          disabled={props.disabled}
        >
          <img src={icon} className={"icon icon--left"} />
        </motion.button>
        <motion.button
          className="answer__btn answer__btn--right"
          onClick={props.checkAnswerHigher}
          onMouseOver={props.highlightCountry2}
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          disabled={props.disabled}
        >
          <img src={icon} className={"icon icon--right"} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Answer;
