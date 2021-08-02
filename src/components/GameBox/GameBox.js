import React, { useState, useEffect, useRef } from "react";
import PopCountry from "../Country/Country";
import CountryData from "../../api/data.json";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Start from "../Start/Start";
import Answer from "../Answer/Answer";
import "./GameBox.scss";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { duration: 1.5, delay: 0.5, when: "beforeChildren" },
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
    transition: { duration: 1, delay: 1.5 },
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

const highscoreVariants = {
  hidden: {
    x: "-100vw",
  },
  visible: {
    x: 0,
    transition: {
      delay: 1,
      duration: 1.5,
    },
  },
};

const GameBox = () => {
  const [countryData, setCountryData] = useState(CountryData);
  const [country1, setCountry1] = useState("");
  const [country2, setCountry2] = useState("");
  const [score, setScore] = useState(0);
  const [isPopulation, setIsPopulation] = useState("");
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
      second: randomCountry2,
    };
  };

  let { first, second } = randomCountry();
  const didMountRef1 = useRef(false);
  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();

  useEffect(() => {
    if (didMountRef1.current) {
      controls1.start({
        opacity: [0, 1],
        transition: { duration: 1.5 },
      });
    } else {
      didMountRef1.current = true;
      setCountry1(first);
    }
  }, [score]);

  useEffect(() => {
    setCountry2(second);
  }, [score]);

  const getScore = localStorage.getItem("highscore");

  const checkAnswerLower = () => {
    setIsPopulation(country2.population);
    setTimeout(() => {
      controls2.start({
        opacity: [1, 0],
        transition: { duration: 0.5 },
      });
    }, 2000);
    setTimeout(() => {
      if (country1.population > country2.population) {
        setScore(score + 1);
        setCountry1(country2);
        setCountryData(
          countryData.filter((item) => item.name !== `${country2.name}`)
        );
        setIsPopulation("");
        controls2.start({
          opacity: [0, 1],
          background: ["#f5f5f5", "#33b864", "#f5f5f5"],
          transition: { duration: 0.5 },
        });
      } else {
        if (score > getScore) {
          localStorage.setItem("highscore", score);
        }
        setCountryData(CountryData);
        setLost(true);
      }
    }, 2500);
  };
  const checkAnswerHigher = () => {
    setIsPopulation(country2.population);
    setTimeout(() => {
      controls2.start({
        opacity: [1, 0],
        transition: { duration: 0.5 },
      });
    }, 2000);
    setTimeout(() => {
      if (country1.population < country2.population) {
        setScore(score + 1);
        setCountry1(country2);
        setCountryData(
          countryData.filter((item) => item.name !== `${country2.name}`)
        );
        setIsPopulation("");
        controls2.start({
          opacity: [0, 1],
          background: ["#f5f5f5", "#33b864", "#f5f5f5"],
          transition: { duration: 0.5 },
        });
      } else {
        if (score > getScore) {
          localStorage.setItem("highscore", score);
        }
        setCountryData(CountryData);
        setLost(true);
      }
    }, 2500);
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
            <motion.div className="country" animate={controls1}>
              <PopCountry
                id={country1.id}
                name={country1.name}
                population={country1.population}
              />
            </motion.div>
            <motion.div
              className="line"
              variants={lineVariants}
              initial="hidden"
              animate="visible"
            />
            <motion.div className="country" animate={controls2}>
              <motion.div animate={controls3}>
                <PopCountry
                  id={country2.id}
                  name={country2.name}
                  population={isPopulation}
                />
              </motion.div>
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

export default GameBox;
