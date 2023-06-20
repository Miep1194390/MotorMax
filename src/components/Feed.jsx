import React, { useState, useEffect } from "react";
import { db } from "../firebase.js";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import Sidebar from "./Sidebar.jsx";

const Feed = () => {
  const [meetings, setMeetings] = useState([]);
  const meetingsCollectionRef = collection(db, "meetings");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getMeetings = async () => {
      const data = await getDocs(meetingsCollectionRef);
      setMeetings(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const getUsers = async () => {
      const data = await getDocs(collection(db, "users"));
      const usersData = data.docs.map((doc) => doc.data());
      setUsers(usersData);
    };

    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const usersData = snapshot.docs.map((doc) => doc.data());
      setUsers(usersData);
    });

    getMeetings();
    getUsers();

    return () => {
      unsubscribe();
    };
  }, []);

  const getUserById = (userId) => {
    return users.find((user) => user.id === userId);
  };

  const renderProfilePicture = (user) => {
    if (user.profilePicture) {
      return (
        <img
          className="border border-3 border-black-subtle rounded-circle w-100 h-100"
          src={user.profilePicture}
          alt="profiel"
        />
      );
    } else {
      return (
        <img
          className="border border-3 border-black-subtle rounded-circle w-100 h-100"
          src="https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg"
          alt="profiel"
        />  
      );
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div id="feed" className="feed-container container-fluid p-0">
        <div className="row py-4">
          {users.map((user) => (
            <div key={user.id} className="col-1">
              <div className="vrienden-feed">
                <div className="vrienden-profiel">
                  {renderProfilePicture(user)}
                </div>
                <p>{user.name}</p>
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
              <p>Aangemaakt door: {getUserById(meeting.userId)?.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
