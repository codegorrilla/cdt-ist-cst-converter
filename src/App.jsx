import React from "react";
import { TimeConverter } from "./components/TimeConverter";

const App = () => {
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <div className="card rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 shadow-2xl w-[500px] h-[500px] flex flex-col justify-center align-items-center gap-4">
        <hgroup className="flex gap-2 justify-center items-center  text-3xl font-bold text-white text-center">
          <h1>CDT Time Converter</h1>
          <img src="./clock.svg" alt="Clock" className="w-8 h-8" />
        </hgroup>
        <p className="text-lg text-gray-200 text-center">
          Convert CDT to IST and IST to CDT
        </p>
        <TimeConverter />
        <p className="text-sm text-gray-200 text-center">
          Note: This converter does not account for Daylight Saving Time (DST).
        </p>
        <p className="text-sm text-gray-200 text-center">
          Made with ❤️ by <span className="font-bold">CodeGorrilla</span>
        </p>
      </div>
    </main>
  );
};

export default App;
