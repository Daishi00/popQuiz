import React, { useState, useEffect, useRef } from "react";
import PopCountry from "./PopCountry";
import CountryData from "../api/data.json";
import {
  motion,
  AnimatePresence,
  useAnimation,
  useTransform
} from "framer-motion";
import Start from "./Start";
import Answer from "./Answer";
import "./PopBox.scss";

const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: { duration: 1.5, delay: 0.5, when: "beforeChildren" }
  },
  exit: {
    x: "-100vw",
    transition: {
      ease: "easeInOut"
    }
  }
};

const lineVariants = {
  hidden: {
    y: "-100vh",
    opacity: 0
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: 1.5 }
  }
};

const scoreVariants = {
  hidden: {
    x: "100vw"
  },
  visible: {
    x: 0,
    transition: {
      delay: 1,
      duration: 1.5
    }
  }
};

const highscoreVariants = {
  hidden: {
    x: "-100vw"
  },
  visible: {
    x: 0,
    transition: {
      delay: 1,
      duration: 1.5
    }
  }
};

const PopBox = () => {
  const [countryData, setCountryData] = useState(CountryData);
  const [country1, setCountry1] = useState("");
  const [country2, setCountry2] = useState("");
  const [score, setScore] = useState(0);
  const [lost, setLost] = useState(false);

  const randomCountry = () => {
    const random = () => {
      return countryData[(Math.random() * countryData.length) | 0];
    };
    let randomCountry1 = random();
    let randomCountry2 = random();
    do {
      randomCountry2 = random();
    } while (randomCountry1 === randomCountry2);
    return {
      first: randomCountry1,
      second: randomCountry2
    };
  };

  let { first, second } = randomCountry();
  const didMountRef2 = useRef(false);
  const controls = useAnimation();

  useEffect(() => {
    if (didMountRef2.current) {
      controls.start({
        x: "-50vw",
        transition: { duration: 0.8 }
      });
      setCountry1(first);
    } else {
      didMountRef2.current = true;
      setCountry1(first);
      console.log("hoho");
    }
  }, []);

  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      controls.start({
        x: "-50vw",
        transition: { duration: 0.8 }
      });
      setCountry2(second);
    } else {
      didMountRef.current = true;
      setCountry2(second);
      console.log("hoho");
    }
  }, [score]);

  const getScore = localStorage.getItem("highscore");

  const checkAnswerLower = () => {
    if (country1.population > country2.population) {
      setScore(score + 1);
      setCountry1(country2);
      setCountryData(
        countryData.filter(item => item.name !== `${country2.name}`)
      );
    } else {
      if (score > getScore) {
        localStorage.setItem("highscore", score);
      }
      setCountryData(CountryData);
      setLost(true);
    }
  };
  const checkAnswerHigher = () => {
    if (country1.population < country2.population) {
      setScore(score + 1);
      setCountry1(country2);
      setCountryData(
        countryData.filter(item => item.name !== `${country2.name}`)
      );
    } else {
      if (score > getScore) {
        localStorage.setItem("highscore", score);
      }
      setCountryData(CountryData);
      setLost(true);
    }
  };

  return (
    <>
      <AnimatePresence>
        {lost ? (
          <Start
            startText={`You have lost. Your score: ${score}`}
            buttonText={`Try again`}
          />
        ) : (
          <motion.div
            className="container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
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
            />
            <motion.div className="country" animate={controls}>
              <PopCountry
                id={country2.id}
                name={country2.name}
                population="???"
              />
            </motion.div>

            <Answer
              country1={country1.name}
              country2={country2.name}
              checkAnswerHigher={checkAnswerHigher}
              checkAnswerLower={checkAnswerLower}
            />
            <motion.div
              className="score__wrapper highscore"
              variants={highscoreVariants}
              initial="hidden"
              animate="visible"
            >
              <p className="score__text">
                Highscore: {getScore ? getScore : "0"}
              </p>
            </motion.div>
            <motion.div
              className="score__wrapper score"
              variants={scoreVariants}
              initial="hidden"
              animate="visible"
            >
              <p className="score__text">Score: {score}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PopBox;
