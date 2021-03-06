import React from "react";
import Header from "./Header/Header";
import Start from "./Start/Start";
import "./App.scss";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Start
        startText={`Which country is larger by population?`}
        buttonText={`Start the game`}
      />
    </div>
  );
};

export default App;
