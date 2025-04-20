"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ClockProps {
  minutesP: number;
  secondsP: number;
  color: "red" | "blue" | "lightblue";
}

export function Clock({ minutesP, secondsP, color }: ClockProps) {
  const [seconds, setSeconds] = useState<number>(secondsP);
  const [textSeconds, setTextSeconds] = useState<string>("");
  const [minutes, setMinutes] = useState<number>(minutesP);
  const [textMinutes, setTextMinutes] = useState<string>();
  const [start, setStart] = useState(false);
  let message = "";

  useEffect(() => {
    function convertSecondsOrMinutes() {
      if (seconds < 10) {
        setTextSeconds(`0${seconds}`);
      } else {
        setTextSeconds(`${seconds}`);
      }
      if (minutes < 10) {
        setTextMinutes(`0${minutes}`);
      } else {
        setTextMinutes(`${minutes}`);
      }
    }

    convertSecondsOrMinutes();
  }, [seconds, minutes]);

  function timer() {
    var clock = setTimeout(() => {
      if (seconds <= 0) {
        setSeconds(59);
        const minutesCount = minutes - 1;
        setMinutes(minutesCount);
      } else {
        const secondsCount = seconds - 1;
        setSeconds(secondsCount);
      }
    }, 1000);

    if (minutes == 0 && seconds == 0) {
      clearTimeout(clock);
      setStart(false);
      setMinutes(25);
      setSeconds(0);
    }
  }

  if (start) {
    timer();
  }

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-8xl select-none text-shadow">
          {textMinutes}:{textSeconds}
        </h1>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {color !== "lightblue" ? (
          <button
            onClick={() => setStart(!start)}
            className={`bg-white rounded-2xl text-${color}-500 px-10 py-2 tracking-wide text-2xl font-bold cursor-pointer mt-2 shadow  hover:tracking-widest transition-all`}
          >
            {start ? "pause" : "start"}
          </button>
        ) : (
          <button
            onClick={() => setStart(!start)}
            className={`bg-white rounded-2xl text-blue-600 px-10 py-2 tracking-wide text-2xl font-bold cursor-pointer mt-2 shadow  hover:tracking-widest transition-all`}
          >
            {start ? "pause" : "start"}
          </button>
        )}
      </motion.div>
    </>
  );
}
