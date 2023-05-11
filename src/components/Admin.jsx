import React from "react";
import Header from "./Header";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase.js";
import "../css/App.scss";
import { onSnapshot } from "firebase/firestore";

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

    useEffect(() => {

        const unsubscribe = onSnapshot(meetingsCollectionRef, (snapshot) => {
            setMeetings(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
        });

        return () => {
            unsubscribe();
        }
            
    }, [])

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
                        <div key={  meeting.id } className="feed-container_item col-12 col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 text-center">
                            <ul className="d-flex">
                                <li>Titel: {meeting.title}</li>
                                <li>Beschrijving: {meeting.description}</li>
                                <li>Locatie: {meeting.location}</li>
                                <li>Start datum: {meeting.start_date}</li>
                                <li>Eind datum: {meeting.end_date}</li>
                                <li>Tijdstip: {meeting.time}</li>
                                <button onClick={() => { deleteMeeting(meeting.id) }}>Verwijder meeting</button>
                            </ul>
                            
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Admin;