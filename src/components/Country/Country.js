import React from "react";
import CountUp from "react-countup";
import "./country.scss";

const Country = (props) => {
  return (
    <div className="country__container">
      <div className="country__flag">
        <img
          alt={props.id}
          src={`https://www.countryflags.io/${props.id}/shiny/64.png`}
        />
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
