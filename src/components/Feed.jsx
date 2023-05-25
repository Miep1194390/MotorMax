import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";
import Sidebar from "./Sidebar.jsx";

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
        <div className="d-flex">
            <Sidebar></Sidebar>
        <div id="feed" className="feed-container container-fluid p-0">

                <div className="row d-flex justify-content-center pt-5">
                    <h1 className="text-center">Feed</h1>
                {meetings.map((meeting) => {
                    return (
                        <div key={meeting.id} className="feed-container_item mx-3 my-3 col-6">
                            <h2>Titel: {meeting.title}</h2>
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
        </div>
    );
}

export default Feed;