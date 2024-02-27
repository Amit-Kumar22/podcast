import React, { useState } from "react";
import ImageLoad from "../Components/ImageLoad";
import { database, storage } from "../firebaseConfig";
import { auth } from "../firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";

function Episode() {
  const { id } = useParams();
  const [description, setDescription] = useState("");
  const [episodeName, setEpisodeName] = useState("");
  const [audioFile, setAudioFile] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const audioFileHandle = (file2) => {
    setAudioFile(file2);
  };

  const handle = async () => {
    setLoading(true);
    if (description && episodeName && audioFile) {
      try {
        const audioRef = ref(
          storage,
          `podcast/${auth.currentUser.uid}/${Date.now}`
        );
        await uploadBytes(audioRef, audioFile);
        const audioURL = await getDownloadURL(audioRef);

        const episodeData = {
          episodeName: episodeName,
          description: description,
          audioFile: audioURL,
        //   createddBy: auth.currentUser.uid,
        };

        const docref = await addDoc(
          collection(database, "podcast", id, "episode"),
          episodeData
        );
        navigate(`/podcast/${id}`);
        setAudioFile("");
        setEpisodeName("");
        setDescription("");
      } catch (error) {
        alert("error");
        setLoading(false);
      }
    } else {
      alert("some error");
      setLoading(false);
    }
  };

  return (
    <div>
      <p className="heading">Create Episode</p>
      <div className="desc">
        <input
          type="text"
          name="episodeName"
          value={episodeName}
          placeholder="episodeName.."
          onChange={(e) => setEpisodeName(e.target.value)}
        />
      </div>
      <div className="desc">
        <input
          type="text"
          name="description"
          value={description}
          placeholder="description..."
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <ImageLoad
        accept={"audio/*"}
        id="Audio-file-input"
        fileHandlefnc={audioFileHandle}
        text={"Audio File Upload"}
      />

      {/* <div>
        <label htmlFor="AudioFile">Audio File Upload</label>
        <input
          type="file"
          id="AudioFile"
          value={audioFile}
          onChange={audioFileHandle}
          style={{ display: "none" }}
        />
      </div> */}

      <div className="button">
        <button onClick={handle}>
          {loading ? "loading..." : "Create Episode"}
        </button>
      </div>
    </div>
  );
}

export default Episode;
