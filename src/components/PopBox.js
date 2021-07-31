import React, { useState, useEffect } from "react";
import PopCountry from "./PopCountry";
import CountryData from "../api/data.json";
import { AnimatePresence, motion } from "framer-motion";

import Answer from "./Answer";
import "./PopBox.scss";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { duration: 1.5, delay: 1.5, when: "beforeChildren" },
  },
  exit: {
    x: "-100vw",
    transition: {
      ease: "easeInOut",
    },
  },
};

const lineVariants = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.5, delay: 2 },
  },
};

const scoreVariants = {
  hidden: {
    x: "100vw",
  },
  visible: {
    x: 0,
    transition: {
      delay: 1,
      duration: 1.5,
    },
  },
};

const PopBox = (props) => {
  const [countryData, setCountryData] = useState(CountryData);
  const [country1, setCountry1] = useState("");
  const [country2, setCountry2] = useState("");
  const [score, setScore] = useState(0);

  const randomCountry = () => {
    console.log("random");
    let randomCountry1 = countryData[(Math.random() * countryData.length) | 0];
    let randomCountry2 = countryData[(Math.random() * countryData.length) | 0];
    do {
      randomCountry2 = countryData[(Math.random() * countryData.length) | 0];
    } while (randomCountry1 === randomCountry2);
    return {
      first: randomCountry1,
      second: randomCountry2,
    };
  };

  let { first, second } = randomCountry();

  useEffect(() => {
    setCountry1(first);
  }, []);

  useEffect(() => {
    setCountry2(second);
  }, [score]);

  const checkAnswerLower = () => {
    if (country1.population > country2.population) {
      setScore(score + 1);
      setCountry1(country2);
      setCountryData(
        countryData.filter((item) => item.name !== `${country2.name}`)
      );
    } else {
      alert("You lost");
      setScore(0);
      setCountryData(CountryData);
    }
  };
  const checkAnswerHigher = () => {
    if (country1.population < country2.population) {
      setScore(score + 1);
      setCountry1(country2);
      setCountryData(
        countryData.filter((item) => item.name !== `${country2.name}`)
      );
    } else {
      alert("You lost");

      setScore(0);
      setCountryData(CountryData);
    }
  };

  return (
    <motion.div
      className="container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="country">
        <PopCountry
          id={country1.id}
          name={country1.name}
          population={country1.population}
        />
      </div>
      <motion.div
        className="line"
        variants={lineVariants}
        initial="hidden"
        animate="visible"
      ></motion.div>
      <div className="country">
        <PopCountry id={country2.id} name={country2.name} population="???" />
      </div>

      <Answer
        country1={country1.name}
        country2={country2.name}
        checkAnswerHigher={checkAnswerHigher}
        checkAnswerLower={checkAnswerLower}
      />
      <motion.div
        className="score__wrapper"
        variants={scoreVariants}
        initial="hidden"
        animate="visible"
      >
        <p className="score__text">Score: {score}</p>
      </motion.div>
    </motion.div>
  );
};

export default PopBox;
