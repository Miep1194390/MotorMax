import React, { useState, useEffect } from "react";
import { collection, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";
import { Link } from 'react-router-dom';
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

  useEffect(() => {
    const unsubscribe = onSnapshot(meetingsCollectionRef, (snapshot) => {
      setMeetings(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const createMeeting = async () => {
    await addDoc(meetingsCollectionRef, {
      title: newTitle,
      description: newDescription,
      location: newLocation,
      start_date: newStartDate,
      end_date: newEndDate,
      time: newTime,
    });
      
    setNewTitle("");
    setNewDescription("");
    setNewLocation("");
    setNewStartDate("");
    setNewEndDate("");
    setNewTime("");
  };

  const deleteMeeting = async (id) => {
    const meetingDoc = doc(db, "meetings", id);
    await deleteDoc(meetingDoc);
  };

  return (
    <div className="container-fluid maak-container">
      <div className="row">
        <div className="col-lg-3">
          <div className="sidebar-maak">
            <Link to="/">TERUG</Link>
            <input placeholder="Titel" value={newTitle} onChange={(event) => setNewTitle(event.target.value)}></input>
            <input placeholder="Beschrijving" value={newDescription} onChange={(event) => setNewDescription(event.target.value)}></input>
            <input placeholder="Locatie" value={newLocation} onChange={(event) => setNewLocation(event.target.value)}></input>
            <input placeholder="Start datum" value={newStartDate} onChange={(event) => setNewStartDate(event.target.value)}></input>
            <input placeholder="Eind datum" value={newEndDate} onChange={(event) => setNewEndDate(event.target.value)}></input>
            <input placeholder="Tijdstip" value={newTime} onChange={(event) => setNewTime(event.target.value)}></input>
            <button className="sidebar-maak-button" onClick={createMeeting}>Meeting aanmaken</button>
          </div>
        </div>
        <div className="col-lg-9">
          <div className="meetings">
            {meetings.map((meeting) => {
              return (
                <div key={meeting.id} className="maak-container_item mx-3 my-3 col-xxl-11">
                  <h2>Titel: {meeting.title}</h2>
                  <p>Beschrijving: {meeting.description}</p>
                  <p>Locatie: {meeting.location}</p>
                  <p>Start datum: {meeting.start_date}</p>
                  <p>Eind datum: {meeting.end_date}</p>
                  <p>Tijdstip: {meeting.time}</p>
                  <div className="d-flex justify-content-end">
                    <button className="verwijder-post-button" onClick={() => deleteMeeting(meeting.id)}>Verwijder meeting</button>
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
