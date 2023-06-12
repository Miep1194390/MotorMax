import React, { useEffect, useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const Login = () => {
  const [username, setUsername] = useState("");
  const navigateTo = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName);
        localStorage.setItem("email", user.email);
        navigateTo("/feed"); // Redirect to /feed if already logged in
      } else {
        setUsername("");
        localStorage.removeItem("email");
      }
    });

    return () => unsubscribe();
  }, [navigateTo]);

  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("Gebruikersinformatie:", user);
        localStorage.setItem("username", user.displayName);
        localStorage.setItem("email", user.email);
        navigateTo("/feed");

        const db = getFirestore();
        const usersCollection = collection(db, "users");
        const userDoc = doc(usersCollection, user.uid);

        const userData = {
          displayName: user.displayName,
          email: user.email,
          profilePicture: user.photoURL,
          // Add any additional user data you want to store in Firestore
        };

        setDoc(userDoc, userData)
          .then(() => {
            console.log("User document created in Firestore");
          })
          .catch((error) => {
            console.error("Error creating user document in Firestore:", error);
          });
      })
      .catch((error) => {
        console.error("Fout bij aanmelden:", error);
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUsername("");
        localStorage.removeItem("email");
      })
      .catch((error) => {
        console.error("Fout bij uitloggen:", error);
      });
  };

  return (
    <div className="d-flex align-items-center vh vw">
      <div className="container-fluid">
        <div className="row">
          <div className="content-right col-6 d-flex justify-content-center">
            <img src="../src\img\logo1.png" alt="" />
          </div>
          <div className="content-left col-6 d-flex justify-content-center flex-column">
            <h1 className="text-center">MotorMax</h1>
            <br />
            <button className="" onClick={() => handleClick(provider)}>
              <p>Inloggen met Google</p>
            </button>
            <br />
            <button className="" onClick={() => handleClick(provider)}>
              <p>Inloggen met Microsoft</p>
            </button>
            <br />
            <hr />
            <p className="p-0 m-0">Geen account?</p>
            <br />
            <button className="" onClick={handleClick}>
              <p>Registreren met Google</p>
            </button>
            <br />
            <button className="" onClick={handleClick}>
              <p>Registreren met Microsoft</p>
            </button>
            <br />
            <p className="p-0 m-0">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
              praesentium laborum enim reiciendis recusandae laboriosam suscipit
              molestias! Earum nobis, quo blanditiis magnam est magni explicabo
              quam tempora deleniti, natus illo?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
