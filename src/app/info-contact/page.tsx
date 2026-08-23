import React from 'react'
import { FaGithub } from "react-icons/fa";

const InfoContact = () => {
  return (
    <div>
        <div className='flex flex-col gap-4 m-4 border border-black p-4 text-xl'>
          <span className='flex flex-col'>
            <span>Thanks to the creators and contributors of Fate/Domination!</span>
            <span>I really don't have much to say...</span>
            <span>Feel free to suggest improvements on the game's Discord server or on GitHub!</span>
          </span>
            <span className='flex items-center gap-1'>GitHub: <a href="https://github.com/Fuugarlu/fate-domination-card-maker"><FaGithub className='text-3xl'/></a></span>
        </div>
    </div>
  )
}

export default InfoContact