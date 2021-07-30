import React, { useState, useEffect } from "react";
import PopCountry from "./PopCountry";
import CountryData from "../api/data.json";
import Buttons from "./Buttons";
import "./PopBox.scss";
import "./Buttons.scss";
const PopBox = (props) => {
  const [countryData, setCountryData] = useState(CountryData);
  const [country1, setCountry1] = useState("");
  const [country2, setCountry2] = useState("");

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

  const [score, setScore] = useState(0);

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
      console.log(countryData);
    } else {
      alert("You lost");
      setScore(0);
    }
  };
  const checkAnswerHigher = () => {
    if (country1.population < country2.population) {
      setScore(score + 1);
      setCountry1(country2);
      setCountryData(
        countryData.filter((item) => item.name !== `${country2.name}`)
      );
      console.log(countryData);
    } else {
      alert("You lost");

      setScore(0);
    }
  };

  return (
    <div className="container">
      <PopCountry
        id={country1.id}
        name={country1.name}
        population={country1.population}
      />
      <div className="line"></div>
      <PopCountry id={country2.id} name={country2.name} population="???" />
      <div className="button__wrapper">
        <button className="button--lower" onClick={() => checkAnswerLower()}>
          <i className="angle down icon large"></i>
        </button>
        <button className="button--higher" onClick={() => checkAnswerHigher()}>
          <i className="angle up icon large"></i>
        </button>
      </div>
    </div>
  );
};

export default PopBox;
