"use client";

import { setCookie } from "cookies-next";
import { useState } from "react";

interface Props {
  currentTab?: number;
  tabOptions?: number[];
}

const tabOoptions = [1, 2, 3, 4, 5];

export const TabBar = ({
  currentTab = 1,
  tabOptions = [1, 2, 3, 4],
}: Props) => {
  const [selected, setSelected] = useState(currentTab);

  const onTabSelected = (tab: number) => {
    setSelected(tab);
    setCookie("selectedTab", tab.toString());
  };

  return (
    <div
      className={`grid w-full  space-x-2 rounded-xl bg-gray-200 p-2 ${
        "grid-cols-" + tabOoptions.length
      }`}
    >
      {tabOoptions.map((tab) => (
        <div key={tab}>
          <input
            type="radio"
            id="1"
            className="peer hidden"
            checked={selected === tab}
            onChange={() => {}}
          />
          <label
            className="transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
            onClick={() => onTabSelected(tab)}
          >
            {tab}
          </label>
        </div>
      ))}
    </div>
  );
};
