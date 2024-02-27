import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import { BiLoaderCircle } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import { auth, database, storage } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import "../Css/SignUp.css";
import { setDoc, doc, addDoc, collection } from "firebase/firestore";
import { getData } from "../Slice/Slice";
import { toast } from "react-toastify";
import ImageLoad from "../Components/ImageLoad";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function SingUp() {
  const [visible, setVisible] = useState(false);
  const [bannerImage, setBannerImage] = useState("");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();

    if (password.length >= 7 && bannerImage ) {
      setLoading(true);
      try {
        const crendential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = crendential.user;
        console.log("users", user);

        const bannerImageRef = ref(storage, `users/${auth.currentUser.uid}/${Date.now}`)
        await uploadBytes(bannerImageRef, bannerImage)
        const bannerImageUrl = await getDownloadURL(bannerImageRef)

        await setDoc(doc(database, "users", user.uid), {
          name: name,
          email: user.email,
          bannerImageUrl:user.bannerImageUrl,
          uid: user.uid,
          createddBy:auth.currentUser.uid
          
        });
       

        dispatch(
          getData({
            name:name,
            email:user.email,
            uid:user.uid,
            bannerImageUrl:user.bannerImageUrl,
            createddBy:auth.currentUser.uid
            
          })
        );
        toast.success("user has been created");
        navigate("/login");
      } catch (e) {
        console.log("error", e);
      }
      setLoading(false);
    } else {
      toast.error("password must be greater than 8 digit");
    }
  };
  const displayHandle = (file) => {
    setBannerImage(file);
    alert("file has been selected")
  };

  return (
    <div>
      <div className="container">
        <div className="signup">
          <form className="login2 signup2" method="POST">
            <h2 className="insta">Sign Up</h2>
            <div className="name">
              <input
                type="email"
                name="email"
                value={email}
                id="email"
                placeholder="Email..."
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="name">
              <input
                type="text"
                name="Fullname"
                value={name}
                id="name"
                placeholder="Full Name..."
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="name">
              <input
                type="text"
                name="userName"
                value={username}
                id="name"
                placeholder="Username..."
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="password">
              <input
                type={visible ? "text" : "password"}
                value={password}
                name="password"
                id="pass"
                placeholder="Password.."
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="class" onClick={() => setVisible(!visible)}>
                {visible ? <BsEye /> : <BsEyeSlash />}
              </div>
            </div>
            <ImageLoad
        accept={"image/*"}
        id="display-Image"
        fileHandlefnc={displayHandle}
        text={"DisplayImage"}
      />
            <br></br>
            <button onClick={handle}>
              {loading ? <BiLoaderCircle /> : "signup"}
            </button>
          </form>
          <div className="login3 signup3">
            <div>
              Have an Account? <NavLink to="login">Log In</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingUp;
