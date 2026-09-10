import React from "react";
import { FaGithub, FaSteam } from "react-icons/fa";

const InfoContact = () => {
  return (
    <div>
      <div className="flex flex-col gap-4 m-4 border border-black p-4 text-xl">
        <span className="flex flex-col">
          <span>
            Thanks to the creators and contributors of Fate/Domination!
          </span>
          <span>I really don&apos;t have much to say...</span>
          <span>
            Feel free to suggest improvements on the game&apos;s Discord server
            or on GitHub!
          </span>
        </span>
        <a href="https://github.com/Fuugarlu/fate-domination-card-maker" className="hover:underline">
          <span className="flex flex-row items-center gap-1">
            <FaGithub className="text-3xl" />
            GitHub (for this website)
          </span>
        </a>
        <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=2047461756" className="hover:underline">
          <span className="flex flex-row items-center gap-1">
            <FaSteam className="text-3xl" />
            Steam Workshop (Caresim&apos;s mod)
          </span>
        </a>
      </div>
    </div>
  );
};

export default InfoContact;
