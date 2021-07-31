import React from "react";
import Header from "./Header";
import PopBox from "./PopBox";
import Start from "./Start";
import { AnimatePresence } from "framer-motion";
import "./App.scss";

const App = () => {
  return (
    <div className="app">
      <Header />
      <AnimatePresence>
        <Start />
      </AnimatePresence>
    </div>
  );
};

export default App;
