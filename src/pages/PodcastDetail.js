import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, database } from "../firebaseConfig";
import { useNavigate, useParams } from "react-router-dom";
import "../Css/podcastdetail.css";
import EpisodeDetails from "../Components/EpisodeDetails";
import Audio from "../Components/Audio";
import Loader from "../Components/Loader";

function PodcastDetail() {
  const { id } = useParams();
  console.log("id", id);
  const navigate = useNavigate();
  const [podcast, setPodcast] = useState({});
  const [episode, setEpisode] = useState([]);
  const [audio, setAudio] = useState()

  useEffect(() => {
    getData();
  }, [id]);
  const getData = async () => {
    try {
      const docRef = doc(database, "podcast", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setPodcast({ id: id, ...docSnap.data() });
        //navigate("/Podcast")
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      alert("error", error.message);
    }
  };

  useEffect(() => {
    const some = onSnapshot(
      query(collection(database, "podcast", id, "episode")),
      (QuerySnapshot) => {
        const episodeData = [];
        QuerySnapshot.forEach((doc) => {
          episodeData.push({ id: doc.id, ...doc.data() });
        });
        setEpisode(episodeData);
      },
      (error) => {
        console.log("error", error);
      }
    );
    return () => {
      some();
    };
  }, [id]);


  console.log("fnjfnvvn", podcast.id);

  if(!podcast.id){
    return <Loader />
  }
  return (
    <div>
      <div className="detail-container">
        <div className="banner">
          {podcast.id && (
            <div>
              <h1>{podcast.tittle}</h1>
              <div className="pod-bannerImg">
              <img src={podcast.bannerImage} />
              </div>
              <p className="description">
                <p>{podcast.desc}</p>
              </p>
              <div>
                <h2>Episode</h2>
                {episode.length > 0 ? (
                  <ol>
                    {episode.map((item) => {
                      return (
                        <EpisodeDetails
                          tittle={item.episodeName}
                          description={item.description}
                          audioFile={item.audioFile}
                          onClick={(file)=>setAudio(file)}
                        />
                      );
                    })}
                  </ol>
                ) : (
                  "no data found"
                )}
              </div>
            </div>
          )}
        </div>
        <div className="btn-episode">
          {(
            <button
              className="episode-btn"
              onClick={() => navigate(`/podcast/${id}/episode`)}
            >
              Create Episode
            </button>
          )}
        </div>
      </div>

      <div>
      {audio && (
        <Audio audioSrc={audio} image={podcast.displayImg} />
      )}
        
      </div>
    </div>
  );
}

export default PodcastDetail;
