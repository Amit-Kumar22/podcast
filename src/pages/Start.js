import React, { useState } from "react";
import ImageLoad from "../Components/ImageLoad";
import { BiLoaderCircle } from "react-icons/bi";
import "../Css/imageLoad.css"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { database, storage } from "../firebaseConfig";
import { auth } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Start() {
  const [desc, setDesc] = useState("");
  const [tittle, setTittle] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [displayImg, setDisplayImg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handle = async() => {
    setLoading(true)
    if(desc && tittle && bannerImage && displayImg){
      try{
        const bannerImageRef = ref(storage, `podcast/${auth.currentUser.uid}/${Date.now}`)
        await uploadBytes(bannerImageRef, bannerImage)
        const bannerImageUrl = await getDownloadURL(bannerImageRef)
  
        const displayImageRef = ref(storage, `podcast/${auth.currentUser.uid}/${Date.now}`)
        await uploadBytes(displayImageRef, displayImg)
        const displayImageUrl = await getDownloadURL(displayImageRef)
  
        const podcastData = {
          tittle: tittle,
          desc: desc,
          bannerImage:bannerImageUrl,
          displayImg:displayImageUrl,
          createddBy:auth.currentUser.uid
        }
  
        const docref = await addDoc(collection(database, "podcast"), podcastData);
        navigate("/Podcast")
        setBannerImage("")
        setDisplayImg("")
        setTittle("")
        setDesc("")
      }catch(e){
        alert(e.message)
      }
    }
    else{
      alert("Please fill all input")
      setLoading(false)
    }
  };
  const bannerHandle = (file) => {
    setBannerImage(file);
    alert("file has been selected")
  };
  const displayHandle = (file) => {
    setDisplayImg(file);
    alert("file has been selected")
  };

  return (
    <div>
      <div className="desc">
        <input
          type="text"
          name="Tittle"
          value={tittle}
          placeholder="Tittle.."
          onChange={(e) => setTittle(e.target.value)}
        />
      </div>
      <div className="desc">
        <input
          type="text"
          name="Desc"
          value={desc}
          placeholder="Desc..."
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <ImageLoad
        accept={"image/*"}
        id="banner-Image"
        fileHandlefnc={bannerHandle}
        text={"BannerImage"}
      />
     <ImageLoad
        accept={"image/*"}
        id="display-Image"
        fileHandlefnc={displayHandle}
        text={"DisplayImage"}
      />
      <div className="button">
      <button onClick={handle}>{loading ? <BiLoaderCircle /> : "signup"}</button>
      </div>
    </div>
  );
}

export default Start;
