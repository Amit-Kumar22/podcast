import React, {useEffect, useState} from 'react'
import { addPodcasts } from '../Slice/PodcastSlice'
import {collection, onSnapshot, query } from 'firebase/firestore'
import { database } from '../firebaseConfig'
import { useSelector, useDispatch } from 'react-redux'
import PodcastCard from '../Components/PodcastCard'
import Loader from '../Components/Loader'

function Podcast() {

  const data = useSelector((state)=>state.podcasts.data)
  const [search, setSearch] = useState("");

  const dispatch = useDispatch()
  useEffect(()=>{
    const some = onSnapshot(
      query(collection(database, "podcast")),
      (QuerySnapshot)=>{
        const podcastData = []
        QuerySnapshot.forEach((doc)=>{
          podcastData.push({id:doc.id, ...doc.data() })
        })
       dispatch(addPodcasts(podcastData))
      },
      (error)=>{
        console.log("error", error)
      }
    )
    return ()=>{
      some()
    }
  }, [dispatch])

 

  const filteredData = data.filter((item) =>
  item.tittle.toLowerCase().includes(search.toLowerCase())
    );
   console.log("podcasts", data)
  // console.log("filter", filteredData)
  if(!data){
    return <Loader />
  }

  return (
    <div>
    <div className="name">
              <input
                type="text"
                value={search}
                placeholder="Search..."
                onChange={(e)=>setSearch(e.target.value)}
              />
            </div>
      {filteredData.length>0 ? (
        <>
        <div className="card-container">
        {
          filteredData.map((item)=>{
               return <PodcastCard id={item.id} tittle={item.tittle} displayimg={item.displayImg} />
          })
          }
        </div>
         
        </>
      ) : "data not found"}
    </div>
  )
}

export default Podcast
