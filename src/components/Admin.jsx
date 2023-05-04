import React from "react";
import Header from "./Header";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase.js";

const Admin = () => {

    const meetingsCollectionRef = collection(db, "meetings");

    const [meetings, setMeetings] = useState([]);
    const [NewTitle, setNewTitle] = useState("");
    const [NewDescription, setNewDescription] = useState("");
    const [NewLocation, setNewLocation] = useState("");
    const [NewStart_date, setNewStart_date] = useState("");
    const [NewEnd_date, setNewEnd_date] = useState("");
    const [Newtime, setNewTime] = useState("");

    useEffect(() => {

        const getMeetings = async () => {
            const data = await getDocs(meetingsCollectionRef);
            setMeetings(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getMeetings();

    }, []);

    const createMeeting = async () => {
        await addDoc(meetingsCollectionRef, { title: NewTitle, description: NewDescription, location: NewLocation, start_date: NewStart_date, end_date: NewEnd_date, time: Newtime })
    };

    const deleteMeeting = async (id) => {
        const meetingDoc = doc(db, "meetings", id);
        await deleteDoc(meetingDoc);
    };

    return (
        <div className="admin-container">
            <Header></Header>
            <input placeholder="Titel..." onChange={(event => setNewTitle(event.target.value))}></input>
            <input placeholder="Beschrijving..." onChange={(event => setNewDescription(event.target.value))}></input>
            <input placeholder="Locatie..." onChange={(event => setNewLocation(event.target.value))}></input>
            <input placeholder="Start datum..." onChange={(event => setNewStart_date(event.target.value))}></input>
            <input placeholder="Eind datum..." onChange={(event => setNewEnd_date(event.target.value))}></input>
            <input placeholder="Tijdstip..." onChange={(event => setNewTime(event.target.value))}></input>
            <button onClick={createMeeting}>Maak meeting</button>

            <div className="admin-meetings">
                {meetings.map((meeting) => {
                    return (
                        <div className="feed-container_item col-12 col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 text-center">
                            <h1>Titel: {meeting.title}</h1>
                            <p>Beschrijving: {meeting.description}</p>
                            <p>Locatie: {meeting.location}</p>
                            <p>Start datum: {meeting.start_date}</p>
                            <p>Eind datum: {meeting.end_date}</p>
                            <p>Tijdstip: {meeting.time}</p>
                            <button onClick={() => { deleteMeeting(meeting.id) }}>Verwijder meeting</button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Admin;