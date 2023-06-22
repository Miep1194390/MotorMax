import React, { useState, useEffect } from "react";
import { collection, onSnapshot, addDoc, deleteDoc, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "../css/App.scss";
import { db } from "../firebase";

const Maak = () => {
  const meetingsCollectionRef = collection(db, "meetings");

  const [meetings, setMeetings] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newStartDate, setNewStartDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [editingMeetingId, setEditingMeetingId] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(meetingsCollectionRef, (snapshot) => {
      setMeetings(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    const userDoc = doc(db, "users", localStorage.getItem("uid"));
    const userSnapshot = await getDoc(userDoc);

    if (userSnapshot.exists()) {
      setCurrentUser(userSnapshot.data());
    } else {
      await setDoc(userDoc, { uid: localStorage.getItem("uid") });
      setCurrentUser({ uid: localStorage.getItem("uid") });
    }
  };

  const createMeeting = async () => {
    if (!currentUser || !currentUser.uid) {
      console.log("Current user or UID is undefined");
      return;
    }

    const meetingData = {
      title: newTitle,
      description: newDescription,
      location: newLocation,
      start_date: newStartDate,
      end_date: newEndDate,
      time: newTime,
      uid: currentUser.uid,
    };

    if (imageFile) {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      const downloadURL = await getDownloadURL(storageRef);
      meetingData.backgroundImage = downloadURL;
    }

    if (editingMeetingId) {
      const meetingDoc = doc(db, "meetings", editingMeetingId);
      await updateDoc(meetingDoc, meetingData);
      setEditingMeetingId(null);
    } else {
      await addDoc(meetingsCollectionRef, meetingData);
    }

    setNewTitle("");
    setNewDescription("");
    setNewLocation("");
    setNewStartDate("");
    setNewEndDate("");
    setNewTime("");
    setImageFile(null);
  };

  const deleteMeeting = async (id) => {
    const meetingDoc = doc(db, "meetings", id);
    await deleteDoc(meetingDoc);
  };

  const editMeeting = async (id) => {
    const meetingToEdit = meetings.find((meeting) => meeting.id === id);
    if (meetingToEdit) {
      setNewTitle(meetingToEdit.title);
      setNewDescription(meetingToEdit.description);
      setNewLocation(meetingToEdit.location);
      setNewStartDate(meetingToEdit.start_date);
      setNewEndDate(meetingToEdit.end_date);
      setNewTime(meetingToEdit.time);
      setEditingMeetingId(id);
    }
  };

  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <div className="container-fluid maak-container">
      <div className="row">
        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3">
          <div className="sidebar-maak">
            <Link to="/">TERUG</Link>
            <input type="text" placeholder="Titel" value={newTitle} onChange={(event) => setNewTitle(event.target.value)} />
            <input type="text" placeholder="Beschrijving" value={newDescription} onChange={(event) => setNewDescription(event.target.value)} />
            <input type="text" placeholder="Locatie" value={newLocation} onChange={(event) => setNewLocation(event.target.value)} />
            <input type="date" placeholder="Start datum" value={newStartDate} onChange={(event) => setNewStartDate(event.target.value)} min={currentDate} />
            <input type="date" placeholder="Eind datum" value={newEndDate} onChange={(event) => setNewEndDate(event.target.value)} min={currentDate} />
            <input type="time" placeholder="Tijdstip" value={newTime} onChange={(event) => setNewTime(event.target.value)} />
            <input type="file" onChange={(event) => setImageFile(event.target.files[0])} />
            <button className="sidebar-maak-button" onClick={createMeeting}>
              {editingMeetingId ? "Vergadering bijwerken" : "Meeting aanmaken"}
            </button>
          </div>
        </div>

        <div className="feed-item-container mx-3 my-3 col-6">
          <div className="meetings">
            {meetings
              .filter((meeting) => meeting.uid === currentUser?.uid)
              .map((meeting) => {
                return (
                  <div key={meeting.id} className="maak-container_item mx-3 my-3 col-xxl-11">
                    <div className="post-content">
                      <div className="post-body">
                        <h2>{meeting.title}</h2>
                        <p>{meeting.description}</p>
                        <p>Locatie: {meeting.location}</p>
                        <p>Start datum: {meeting.start_date}</p>
                        <p>Eind datum: {meeting.end_date}</p>
                        <p>Tijdstip: {meeting.time}</p>
                      </div>
                      <div className="post-actions">
                        <button className="verwijder-post-button" onClick={() => deleteMeeting(meeting.id)}>Verwijder meeting</button>
                        <button className="bewerk-post-button" onClick={() => editMeeting(meeting.id)}>Bewerk meeting</button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maak;
