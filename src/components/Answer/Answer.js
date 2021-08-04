import React from "react";
import { motion } from "framer-motion";
import icon from "../../assets/right.svg";
import "./Answer.scss";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 1,
      duration: 1,
    },
  },
};

const buttonVariants = {
  initial: {
    opacity: 0.9,
  },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.1,
    },
  },
};
const iconVariants = {
  initial: {
    rotate: 180,
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.5,
      yoyo: Infinity,
    },
  },
};

const Answer = (props) => {
  // [disable, setDisable] = useState("");

  return (
    <motion.div
      className="answer__container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="answer__text__container">
        <p className="answer__text">Which has higher population?</p>
      </div>
      <div className="answer__btn__container">
        <motion.button
          className="answer__btn answer__btn--left"
          onClick={props.checkAnswerLower}
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
        >
          <motion.img
            src={icon}
            className={"icon icon--left"}
            initial={"initial"}
            variants={iconVariants}
            whileHover="hover"
          ></motion.img>
        </motion.button>
        <motion.button
          className="answer__btn answer__btn--right"
          onClick={props.checkAnswerHigher}
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
        >
          <motion.img
            src={icon}
            className={"icon icon--right"}
            variants={iconVariants}
            whileHover="hover"
          ></motion.img>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Answer;
