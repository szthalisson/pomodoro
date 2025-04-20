"use client";

import { Pomodoro } from "@/sections/pomodoro";
import { ShortBreak } from "@/sections/shortBreak";
import { useEffect, useState } from "react";

export default function Home() {
  const [activePage, setActivePage] = useState<"pomodoro" | "longB" | "shortB">(
    "pomodoro",
  );
  const [bgColor, setBgColor] = useState<string>("red");

  useEffect(() => {
    function changePageHeader() {
      const headerElements = document.querySelectorAll(".header-item");

      headerElements.forEach((element) => {
        element.classList.remove("bg-black/20");
      });

      const element = document.querySelector(`#${activePage}`);
      element?.classList.add("bg-black/20");
    }

    function backgroundChanger() {
      const body = document.getElementsByTagName("body")[0];

      if (activePage === "pomodoro") {
        setBgColor("oklch(63.7% 0.237 25.331)");
      } else if (activePage === "shortB") {
        setBgColor("oklch(62.3% 0.214 259.815)");
      } else {
        setBgColor("oklch(54.6% 0.245 262.881)");
      }

      body.style.backgroundColor = bgColor;
    }

    changePageHeader();
    backgroundChanger();
  }, [activePage, bgColor]);

  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center">
      <header className="mb-5">
        <nav className="flex flex-row gap-5">
          <span
            className="px-4 py-2 rounded-md cursor-pointer hover:bg-black/30 header-item transition-all"
            onClick={() => setActivePage("pomodoro")}
            id="pomodoro"
          >
            Pomodoro
          </span>
          <span
            className="px-4 py-2 rounded-md cursor-pointer hover:bg-black/30 header-item transition-all"
            onClick={() => setActivePage("shortB")}
            id="shortB"
          >
            Short Break
          </span>
          <span
            className="px-4 py-2 rounded-md cursor-pointer hover:bg-black/30 header-item transition-all"
            onClick={() => setActivePage("longB")}
            id="longB"
          >
            Long Break
          </span>
        </nav>
      </header>
      {activePage === "pomodoro" && <Pomodoro />}
      {activePage === "shortB" && <ShortBreak />}
    </div>
  );
}
