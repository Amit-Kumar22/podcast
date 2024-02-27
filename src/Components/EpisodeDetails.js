import React from 'react'
import { FaPlay } from "react-icons/fa";
import "../Css/EpisodeDetail.css"

function EpisodeDetails({tittle, description, audioFile, onClick}) {
  return (
    <div>
      <h1>{tittle}</h1>
      <p className='description'>{description}</p>
      <div className='play-btn'>
      <button onClick={()=>onClick(audioFile)}>Play</button>
      </div>
    </div>
  )
}

export default EpisodeDetails
