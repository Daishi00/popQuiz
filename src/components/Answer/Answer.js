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
    scale: 1.1,
    opacity: 1,
    transition: {
      duration: 0.1,
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
        <p className="answer__text">
          Does {props.country2} have <br />
          <span className="answer__span--red answer__span">LOWER</span> or{" "}
          <span className="answer__span--green answer__span">HIGHER</span>{" "}
          <br /> population than {props.country1}
        </p>
      </div>
      <div className="answer__btn__container">
        <motion.button
          className="answer__btn answer__btn--lower"
          onClick={props.checkAnswerLower}
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
        >
          <i className="angle down icon large"></i>
        </motion.button>
        <motion.button
          className="answer__btn answer__btn--higher"
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
