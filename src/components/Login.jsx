import React, { useEffect, useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";


const Login = () => {
  const [username, setUsername] = useState("");
  const navigateTo = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName);
        localStorage.setItem("email", user.email);
        localStorage.setItem("uid", user.uid);
        navigateTo("/feed");
      } else {
        setUsername("");
        localStorage.removeItem("email");
      }
    });

    return () => unsubscribe();
  }, [navigateTo]);

  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        console.log("Gebruikersinformatie:", user);
        localStorage.setItem("username", user.displayName);
        localStorage.setItem("email", user.email);
        localStorage.setItem("uid", user.uid);

        const db = getFirestore();
        const usersCollection = collection(db, "users");
        const userDoc = doc(usersCollection, user.uid);

        const docSnap = await getDoc(userDoc);

        const userData = {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
          profilePicture: user.photoURL,
          Voertuig: "",
        };

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.isPrivate !== undefined) {
            userData.isPrivate = data.isPrivate;
          }
          if (data.Voertuig !== undefined) {
            userData.Voertuig = data.Voertuig;
          }
        }

        setDoc(userDoc, userData)
          .then(() => {
            console.log("User document succesvol aangemaakt in Firestore");
            navigateTo("/feed", { state: { userData } });
          })
          .catch((error) => {
            console.error("Error bij het maken van een user document:", error);
          });
      })
      .catch((error) => {
        console.error("Fout bij aanmelden:", error);
      });
  };


  return (
    <div className="container-fluid login-bg">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-9 login-box d-flex flex-column align-items-center justify-content-center text-center">
          <h1 className="text-white ">Inloggen</h1>
          <button className="login-button" onClick={() => handleClick(provider)}>
            Inloggen met Google
          </button>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
};
export default Login;
