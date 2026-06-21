import React from 'react'
import { FaGithub } from "react-icons/fa";

const InfoContact = () => {
  return (
    <div>
        <div className='flex flex-col gap-4 m-4 border-1 border-black p-4 text-xl'>
          <span className='flex flex-col'>
            <span>Thanks to the creators and contributors of Fate/Domination!</span>
            <span>I really don't have much to say...</span>
            <span>There's a lot of features and code cleanup I could work on, but I'll pass for now!</span>
            </span>
            <span className='flex items-center gap-1'>GitHub: <a href="https://github.com/Fuugarlu/fate-domination-card-maker"><FaGithub className='text-3xl'/></a></span>
        </div>
    </div>
  )
}

export default InfoContact