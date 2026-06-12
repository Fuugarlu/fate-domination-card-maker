import React from "react";
import { IoHome } from "react-icons/io5";
import { PiDiamondsFourFill } from "react-icons/pi";
import { GiSwordInStone } from "react-icons/gi";
import { IoLocationSharp } from "react-icons/io5";
import { IoShapes } from "react-icons/io5";
import { FaInfoCircle } from "react-icons/fa";

// const menuItems = [
//   { label: "Master", icon: PiDiamondsFourFill },
//   { label: "Servant", icon: GiSwordInStone },
//   { label: "Objective", icon: IoLocationSharp },
//   { label: "Misc", icon: IoShapes },
// ];

export const SideBar = () => {
  return (
    <div className="h-full bg-[#2b3950] p-2 w-[250px] fixed border border-black">
      <h1 className="font-bold flex gap-2 p-1 items-center text-sm select-none"><IoHome />Fate/Domination Card Maker</h1>
      <hr className="mt-1 mb-2" />
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-1">
          <div className="font-semibold flex gap-2 p-1 items-center cursor-pointer hover:bg-blue-400 rounded select-none"><PiDiamondsFourFill /> Master</div>
          <div className="font-semibold flex gap-2 p-1 items-center cursor-pointer hover:bg-blue-400 rounded select-none"><GiSwordInStone /> Servant</div>
          <div className="font-semibold flex gap-2 p-1 items-center cursor-pointer hover:bg-blue-400 rounded select-none"><IoLocationSharp /> Objective</div>
          <div className="font-semibold flex gap-2 p-1 items-center cursor-pointer hover:bg-blue-400 rounded select-none"><IoShapes /> Misc</div>
        </div>
        <hr className="mt-2 mb-2" />
        <div className="font-semibold flex gap-2 p-1 items-center cursor-pointer hover:bg-blue-400 rounded select-none"><FaInfoCircle />Info & Contact</div>
      </div>
    </div>
  );
};
