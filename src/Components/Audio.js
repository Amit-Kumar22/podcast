import React, { useRef, useState, useEffect } from "react";
import { FaPauseCircle } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { FaVolumeHigh } from "react-icons/fa6";
import { IoVolumeMuteSharp } from "react-icons/io5";
import "../Css/Audio.css";

function Audio({ audioSrc, image }) {
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setISMute] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);

  const handleDuration = (e) => {
    setCurrentTime(e.target.value);
    audioRef.current.currentTime = e.target.value;
  };
  

  const handlevolume = (e) => {
    setVolume(e.target.value);
    audioRef.current.volume = e.target.value;
  };

  const Playing = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const mute = () => {
    if (isMute) {
      setISMute(false);
    } else {
      setISMute(true);
    }
  };

  

  useEffect(() => {
    const audio = audioRef.current;
    if(audio){
      audio.addEventListener("timeppdate", handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    }
    }
  },[]);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const formatData = (time) => {
    const minute = Math.floor(time / 60);
    const second = Math.floor(time % 60);
    return `${minute}.${second < 10 ? "0" : ""}${second}`;
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!isMute) {
      audioRef.current.volume = 1;
      setVolume(1);
    } else {
      audioRef.current.volume = 0;
      setVolume(1);
    }
  }, [isMute]);

  return (
    <div>
      <div className="audio-container">
        <div className="logo">
          <img src={image} />
        </div>
        <audio ref={audioRef} src={audioSrc}  />
       <div className="duration">
          <p onClick={Playing} className="play-btn">
            {isPlaying ? <FaPauseCircle /> : <FaPlayCircle />}
          </p>
          <p>{formatData(currentTime)}</p>
          <input
            type="range"
            max={duration}
            value={currentTime}
            onChange={handleDuration}
            step={0.01}
            className="change"
          />
          <p>-{formatData(duration-currentTime)}</p>
        </div>
        <div className="volume">
          <p onClick={mute}>
            {isMute ? <IoVolumeMuteSharp /> : <FaVolumeHigh />}
          </p>
          <input
            type="range"
            value={volume}
            max={1}
            min={0}
            step={0.01}
            onChange={handlevolume}
          />
        </div>
       </div>
      </div>
  );
}

export default Audio;
