import React from "react";
import { IoHome } from "react-icons/io5";
import { PiDiamondsFourFill } from "react-icons/pi";
import { GiSwordInStone } from "react-icons/gi";
import { IoLocationSharp } from "react-icons/io5";
import { IoShapes } from "react-icons/io5";
import { FaInfoCircle } from "react-icons/fa";
import { SideBarItem } from "./SideBar/SideBarItem";
import { FaRegUserCircle  } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";

const menuItems = [
  { label: "Master", icon: PiDiamondsFourFill, link: 'master' },
  { label: "Servant", icon: GiSwordInStone, link: 'servant' },
  { label: "Objective", icon: IoLocationSharp, link: 'objective' },
  { label: "Misc", icon: IoShapes, link: 'misc' },
  { label: "Master Token", icon: FaRegUserCircle, link: 'master-token' },
  { label: "Master Standee", icon: FaRegUser, link: 'master-standee' },
];

export const SideBar = () => {
  return (
    <div className="h-screen w-[250px] mr-3">
      <div className="fixed h-screen bg-[#2b3950] p-2 border-r border-black">
        <h1 className="font-bold flex gap-2 p-1 items-center text-sm select-none"><IoHome />Fate/Domination Card Maker</h1>
        <hr className="mt-1 mb-2" />
        <div className="flex flex-col justify-between h-[calc(100%-50px)]">
          <div className="flex flex-col gap-1">
            {menuItems.map(({label, icon, link}) => (
              <SideBarItem label={label} icon={icon} link={link} key={link+'-menu-item'} />
            ))}
          </div>
          <div>
          <hr className="mt-2 mb-2" />
          <div className="font-semibold flex gap-2 p-1 items-center cursor-pointer hover:bg-blue-400 rounded select-none"><FaInfoCircle />Info & Contact</div>
          </div>
        </div>
      </div>
    </div>
  );
};
