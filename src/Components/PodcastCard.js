import React from 'react'
import { FaPlay } from "react-icons/fa";
import { Link } from 'react-router-dom';
import "../Css/Profile.css"

function PodcastCard({id, tittle, displayimg}) {
  return (
    <div>
      <Link to={`/podcast/${id}`}>
      <div className="card" >
               <img src={displayimg} alt="Avatar" />
               <div className="container">
                 <h4>
                   <b>{tittle}</b>
                 </h4>
                 <FaPlay />
               </div>
             </div>
      </Link>
    </div>
  )
}

export default PodcastCard
