import React, { useState, useEffect } from "react";
import { db } from "../firebase.js";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import Sidebar from "./Sidebar.jsx";

const Feed = () => {
    const [meetings, setMeetings] = useState([]);
    const meetingsCollectionRef = collection(db, "meetings");
    const [profilePictures, setProfilePictures] = useState([]);

    useEffect(() => {
        const getMeetings = async () => {
            const data = await getDocs(meetingsCollectionRef);
            console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            setMeetings(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        const getProfilePictures = async () => {
            const data = await getDocs(collection(db, "users"));
            const profiles = data.docs.map((doc) => doc.data());
            setProfilePictures(profiles);
        };

        const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
            const profiles = snapshot.docs.map((doc) => doc.data());
            setProfilePictures(profiles);
        });

        getMeetings();
        getProfilePictures();

        return () => {
            unsubscribe(); 
        };
    }, []);

    return (
        <div className="d-flex">
            <Sidebar />
            <div id="feed" className="feed-container container-fluid p-0">
                <div className="row py-4">
                    {profilePictures.map((profile) => (
                        <div key={profile.id} className="col-1">
                            <div className="vrienden-feed">
                                <div className="vrienden-profiel">
                                    <img className="border border-3 border-black-subtle rounded-circle w-100 h-100" src={profile.profilePicture} alt="profiel" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="row d-flex justify-content-center">
                    {meetings.map((meeting) => (
                        <div key={meeting.id} className="feed-container_item mx-3 my-3 col-6">
                            <h2>Titel: {meeting.title}</h2>
                            <p>Beschrijving: {meeting.description}</p>
                            <p>Locatie: {meeting.location}</p>
                            <p>Start datum: {meeting.start_date}</p>
                            <p>Eind datum: {meeting.end_date}</p>
                            <p>Tijdstip: {meeting.time}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Feed;
