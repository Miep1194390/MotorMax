import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { Link } from "react-router-dom";

const Settings = () => {
  const [displayName, setDisplayName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [Voertuig, setVoertuig] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setDisplayName(user.displayName);
      const userRef = doc(db, "users", user.uid);
      const fetchData = async () => {
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setIsPrivate(data.isPrivate);
          setVoertuig(data.Voertuig || "");
        }
      };
      fetchData();
    }
  }, []);

  const saveSettings = async () => {
    const user = auth.currentUser;

    if (user) {
      try {
        await updateProfile(user, { displayName });

        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const updatedData = { displayName };
          if (isPrivate) {
            updatedData.isPrivate = isPrivate;
          }
          if (Voertuig) {
            updatedData.Voertuig = Voertuig;
          }

          await updateDoc(userRef, updatedData);
          console.log("Privacy instellingen aangepast.");
          setFeedbackMessage("Instellingen succesvol opgeslagen!");
        } else {
          const newUser = {
            displayName,
            isPrivate,
            Voertuig,
          };
          await setDoc(userRef, newUser);
          console.log("Maakt nieuwe gebruiker aan in db.");
          setFeedbackMessage("Instellingen succesvol opgeslagen!");
        }

        setDisplayName(displayName);
        console.log("Naam aangepast.");
      } catch (error) {
        console.error("Error met updaten van instellingen:", error);
        setFeedbackMessage(
          "Er is een fout opgetreden bij het opslaan van de instellingen."
        );
      }
    }
  };

  return (
    <div>
      <div className="container-fluid maak-container">
        <div className="row">
          <div className="col-lg-3">
            <div className="sidebar">
              <Link to="/">TERUG</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="settings-page">
        <div className="settings-page-inner">
          <h1 className="settings-page__title">Profiel bewerken</h1>
          <div className="settings-page__form-group">
            <label htmlFor="displayName" className="settings-page__label">
              Gebruikersnaam:
            </label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="settings-page__input"
            />
          </div>
          <div className="settings-page__form-group">
            <label htmlFor="isPrivate" className="settings-page__label">
              Maak account prive:
            </label>
            <input
              type="checkbox"
              id="isPrivate"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="settings-page__checkbox"
            />
          </div>
          <div className="settings-page__form-group">
            <label htmlFor="Voertuig" className="settings-page__label">
              Voertuig:
            </label>
            <input
              type="text"
              id="Voertuig"
              value={Voertuig}
              onChange={(e) => setVoertuig(e.target.value)}
              className="settings-page__input"
            />
          </div>
          <button onClick={saveSettings} className="settings-page__button">
            Verzenden
          </button>
          {feedbackMessage && (
            <p className="settings-page__feedback">{feedbackMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
