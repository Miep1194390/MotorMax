import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

const Settings = () => {
  const [displayName, setDisplayName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

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
          await updateDoc(userRef, {
            displayName: displayName,
            isPrivate,
          });
          console.log("Privacy instellingen aangepast.");
          setFeedbackMessage("Instellingen succesvol opgeslagen!");
        } else {
          const newUser = {
            displayName: displayName,
            isPrivate,
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
        <button onClick={saveSettings} className="settings-page__button">
          Verzenden
        </button>
        {feedbackMessage && (
          <p className="settings-page__feedback">{feedbackMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Settings;
