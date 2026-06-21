import React from 'react'
import { FaGithub } from "react-icons/fa";

const InfoContact = () => {
  return (
    <div>
        <div className='flex flex-col m-4 border-1 border-black p-4 text-xl'>
            <span>Thanks to the creators and contributors of Fate/Domination.</span>
            <span>I really don't have much to say...</span>
            <span className='flex items-center gap-1'>GitHub: <a href="https://github.com/Fuugarlu/fate-domination-card-maker"><FaGithub /></a></span>
        </div>
    </div>
  )
}

export default InfoContact