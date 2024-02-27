import React, { useState } from "react";
import "../Css/imageLoad.css"

function ImageLoad({ accept, id, fileHandlefnc, text }) {
  const [fileselected, setFileselected] = useState("");
  const onchange = (e) => {
    console.log(e.target.files)
    setFileselected(e.target.files[0].name);
    fileHandlefnc(e.target.files[0]);
  };
  return (
    <div>
      <div className="imageLoad">
        <label htmlFor={id} className={fileselected ? "selectefile": "noSelected"}>
          {fileselected ? `The file ${fileselected} has selected` : text}
        </label>
        <input type="file" accept={accept} onChange={onchange} id={id} style={{display:"none"}} />
      </div>
    </div>
  );
}

export default ImageLoad;
