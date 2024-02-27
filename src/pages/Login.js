import React, { useState, useEffect } from "react";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword} from "firebase/auth";
import { useDispatch } from "react-redux";
import { getDoc,doc } from "firebase/firestore";
import { auth, database, storage } from "../firebaseConfig";
import { BiLoaderCircle } from "react-icons/bi";
import "../App.css";
import { getData } from "../Slice/Slice";

const  Login = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handlelogin = async() => {
    try{
      setLoading(true)
      const crendential = await signInWithEmailAndPassword(auth, email, password)
      const user = crendential.user;
      console.log("users", user)
      const userdoc = await getDoc(doc(database, "Amit", user.uid))
      const userData = userdoc.data()
      dispatch(getData({
        name:name,
        email:user.email,
        uid:user.uid
      }))
      navigate("/profile")
    }
    
    catch(e){
      console.log("error",e)
    }
    setLoading(false)
   
    const login = async(e)=>{
  
    }
    
  }

  return (
    <div className="main">
      <div className="container">
        <div className="signup">
          <div className="login2">
            <h2>PodCast</h2>
            <div className="name">
              <input
                type="email"
                name="task"
                value={email}
                id="name"
                placeholder="Email..."
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>

            <div className="password">
              <input
              name="password"
                type={visible ? "text" : "password"}
                value={password}
                id="pass"
                placeholder="Password.."
                onChange={(e)=>setPassword(e.target.value)}
              />
              <div className="class" onClick={() => setVisible(!visible)}>
                {visible ? <BsEye /> : <BsEyeSlash />}
              </div>
            </div>
            <button onClick={handlelogin}>{loading ? <BiLoaderCircle />:"Log in"}</button>
            <div className="forget">Forget Password?</div>
          </div>
          <div className="login3">
            <div>
              Dont'nt Have an Account? <NavLink to="/">Sign Up</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
