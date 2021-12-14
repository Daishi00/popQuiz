import React from "react";
import CountUp from "react-countup";
import "./Country.scss";

const Country = (props) => {
  return (
    <div className="country__container">
      <div className="country__flag">
        {props.id && (
          <img
            alt={props.id}
            src={`https://flagcdn.com/${props.id.toLowerCase()}.svg`}
            width="64"
            height="48"
          />
        )}
      </div>
      <div className="country__name">{props.name}</div>
      <h2>POPULATION</h2>
      <div className="country__population">
        <CountUp
          start={0}
          end={props.population}
          separator={","}
          duration={2}
          useEasing={true}
        >
          {({ countUpRef }) => (
            <div>
              <span ref={countUpRef} />
            </div>
          )}
        </CountUp>
      </div>
    </div>
  );
};

export default Country;
