import React, { useState, useEffect } from "react";
import Countries from "../api/data.json";
import CountUp from "react-countup";
import "./PopCountry.scss";

const PopCountry = (props) => {
  return (
    <div className="country__container">
      <div className="country__flag">
        <img
          alt={props.id}
          src={`https://www.countryflags.io/${props.id}/flat/64.png`}
        />
      </div>
      <div className="country__name">{props.name}</div>
      <h2>POPULATION</h2>
      <div className="country__population">
        {props.population === "???" ? (
          "???"
        ) : (
          <CountUp
            start={0}
            end={props.population}
            delay={0}
            duration={2}
            useEasing={true}
          >
            {({ countUpRef }) => (
              <div>
                <span ref={countUpRef} />
              </div>
            )}
          </CountUp>
        )}
      </div>
    </div>
  );
};

export default PopCountry;
