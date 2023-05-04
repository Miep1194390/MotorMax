import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase.js";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

const Feed = () => {

    const [meetings, setMeetings] = useState([]);
    const meetingsCollectionRef = collection(db, "meetings");

    useEffect(() => {

        const getMeetings = async () => {
            const data = await getDocs(meetingsCollectionRef);
            setMeetings(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getMeetings();

    }, []);

    return (
        <div id="feed" className="feed-container container-fluid">
            <div className="feed-intro d-flex align-items-center flex-column">
                <h2 className="pt-5">Alle huidige meetings</h2>
                <p className="m-0">Hieronder vind je alle meetings die ingepland staan</p>
                <p className="m-0">klik op de meeting voor meer informatie.</p>
            </div>
            <div className="row pt-5">
                    
                {meetings.map((meeting) => {
                        return (
                            <div className="feed-container_item col-12 col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 text-center">
                                <h1>Titel: {meeting.title}</h1>
                                <p>Beschrijving: {meeting.description}</p>
                                <p>Locatie: {meeting.location}</p>
                                <p>Start datum: {meeting.start_date}</p>
                                <p>Eind datum: {meeting.end_date}</p>
                                <p>Tijdstip: {meeting.time}</p>
                            </div>
                        )
                    })}
            </div>
        </div>
    );
}

export default Feed;