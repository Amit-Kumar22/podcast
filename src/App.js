import React, {useEffect}from 'react';
import { useDispatch } from "react-redux";
import Profile from './pages/Profile';
import Login from './pages/Login';
import SingUp from './pages/SingUp';
import { Routes, Route } from 'react-router-dom';
import Navbaar from './pages/Navbaar';
import Podcast from './pages/Podcast';
import Start from './pages/Start';
import { signOut } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, database } from './firebaseConfig';
import { onSnapshot } from 'firebase/firestore';
import { setDoc,doc } from "firebase/firestore";
import { getData } from './Slice/Slice';
import Private from './pages/Private';
import PodcastDetail from './pages/PodcastDetail';
import Episode from './pages/Episode';

const App = () => {

  const dispatch = useDispatch()

  useEffect(()=>{
    const some = onAuthStateChanged(auth, (user)=>{
      if(user){
        const snapshot = onSnapshot(doc(database, "users", user.uid), 
        (userDoc)=>{
          if(userDoc.exists()){
            const userdata = userDoc.data()
            dispatch(getData({
              name:userdata.name,
              email:userdata.email,
              uid:user.uid
            }))
          }
        },
        (error)=>{
          console.error("hghbbh", error)
        }
        )
        return ()=>{
          some()
        }
      }
    })
  })
  return (
    <div>
    <Navbaar />
      <Routes>
      <Route path="/" element={<SingUp />} />
      <Route path='login' element={<Login />} />
      <Route  element={<Private />}>
      <Route path='profile' element={<Profile />} />
      <Route path='Podcast' element={<Podcast />} />
      <Route path='Start' element={<Start />} />
      <Route path="/podcast/:id" element={<PodcastDetail />} />
      <Route path="/podcast/:id/episode" element={<Episode />} />
      </Route>
      </Routes>
    </div>
  )
}

//f2ddcd6b28msh1dab7c611a37affp1cba2ejsn6d1cfaf68e81

export default App
