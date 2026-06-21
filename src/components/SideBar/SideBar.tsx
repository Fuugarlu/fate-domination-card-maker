"use client";
import React, { useState } from "react";
import { IoHome } from "react-icons/io5";
import { PiDiamondsFourFill } from "react-icons/pi";
import { GiSwordInStone } from "react-icons/gi";
import { IoShapes } from "react-icons/io5";
import { FaInfoCircle } from "react-icons/fa";
import { SideBarItem } from "./SideBarItem";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";

const menuItems = [
  { label: "Main", icon: PiDiamondsFourFill, link: "" },
  { label: "Servant Summon", icon: GiSwordInStone, link: "servant-summon" },
  { label: "Master Token", icon: FaRegUserCircle, link: "master-token" },
  { label: "Master Standee", icon: FaRegUser, link: "master-standee" },
  { label: "Master Box", icon: IoShapes, link: "master-box" },
  { label: "Command Seal", icon: IoIosStar, link: "command-seal" },
  // { label: "NPC [WIP]", icon: GiSwordInStone, link: "npc" }, // scrapped
];

export const SideBar = () => {
  const [showResponsiveSideBar, setShowResponsiveSideBar] =
    useState<boolean>(false);
  return (
    <>
      <div className="h-screen md:w-[250px] mr-3 z-10 hidden md:block">
        <div className="fixed h-screen bg-[#2b3950] p-2 border-r border-black">
          <h1 className="font-bold flex gap-2 p-1 items-center text-sm select-none">
            <IoHome />
            Fate/Domination Card Maker
          </h1>
          <hr className="mt-1 mb-2" />
          <div className="flex flex-col justify-between h-[calc(100%-50px)]">
            <div className="flex flex-col gap-1">
              {menuItems.map(({ label, icon, link }) => (
                <SideBarItem
                  label={label}
                  icon={icon}
                  link={link}
                  key={link + "-menu-item"}
                />
              ))}
            </div>
            <div>
              <hr className="mt-2 mb-2" />
              <div className="font-semibold flex gap-2 p-1 items-center cursor-pointer hover:bg-blue-400 rounded select-none">
                <SideBarItem icon={FaInfoCircle} label="Info & Contact" link="info-contact" key={"Info & Contact"}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showResponsiveSideBar && (
        <div className=" md:w-[250px] mr-3 z-10 mobile-fixed fixed top-0 left-0 ">
          <div className="fixed h-dvh bg-[#2b3950] p-2 border-r border-black">
            <h1 className="font-bold flex gap-2 p-1 items-center text-sm select-none">
              <IoHome />
              Fate/Domination Card Maker
            </h1>
            <hr className="mt-1 mb-2" />
            <div className="flex flex-col justify-between h-[calc(100%-50px)]">
              <div className="flex flex-col gap-1">
                {menuItems.map(({ label, icon, link }) => (
                  <SideBarItem
                    label={label}
                    icon={icon}
                    link={link}
                    key={link + "-menu-item"}
                  />
                ))}
              </div>
              <div>
                <hr className="mt-2 mb-2" />
                <div className="font-semibold flex gap-2 p-1 items-center cursor-pointer hover:bg-blue-400 rounded select-none">
                  <FaInfoCircle />
                  Info & Contact
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        {showResponsiveSideBar && (
          <button
            className="fixed w-10 h-10 rounded bg-red-800 right-3 top-3 z-10 cursor-pointer md:hidden "
            onClick={() => {
              setShowResponsiveSideBar(false);
            }}
          >
            X
          </button>
        )}
        {!showResponsiveSideBar && (
          <button
            className="fixed w-10 h-10 rounded bg-red-800 right-3 top-3 z-10 cursor-pointer md:hidden "
            onClick={() => {
              setShowResponsiveSideBar(true);
            }}
          >
            O
          </button>
        )}
      </div>
    </>
  );
};
