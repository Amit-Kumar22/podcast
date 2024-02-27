import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../Components/Loader'
import PodcastCard from '../Components/PodcastCard';


function Profile() {
  
const data = useSelector((state)=>state.user.data)
console.log("data", data)
const navigate = useNavigate()

const signout = () => {
  signOut(auth).then(() => {
    
  }).catch((error) => {
    console.log(error.message)
  })
}


if(!data){
  return <Loader />
}

  return (
    <div>
      {/* <p className="heading">Profile</p>
      <div className="card-container">
     {data.data &&
         data.data.map((item) => {
           return (          
             <div className="card" key={item.id}>
               <img src={require("../image/home-page-photo.594aa72ea33daab87662.png")} alt="Avatar" />
               <div className="container">
                 <h4>
                   <b>{item.Fullname}</b>
                 </h4>
                 <FaPlay />
               </div>
             </div>
           );
         })}
         </div> */}
        { data && (
          <div>
          <p>{data.email}</p>
          <p>{data.name}</p>
          <p>{data.uid}</p>
          <img src={data.bannerImageUrl} alt='Amit'/>
         <button onClick={signout}>Sign Out</button>
          </div>
         )}
     </div> 
  )
}

export default Profile
