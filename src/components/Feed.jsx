import React, { useState, useEffect } from "react";
import { db } from "../firebase.js";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import Sidebar from "./Sidebar.jsx";

const Feed = () => {
  const [meetings, setMeetings] = useState([]);
  const meetingsCollectionRef = collection(db, "meetings");
  const [users, setUsers] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

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

  const handleSearchInputChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const filteredMeetings = meetings.filter((meeting) => {
    return meeting.title.toLowerCase().includes(searchKeyword.toLowerCase());
  });

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
        <div className="row">
          <div className="">
            <input
              className="feed-search"
              type="text"
              placeholder="Meeting zoeken..."
              name="zoeken"
              id="zoeken"
              value={searchKeyword}
              onChange={handleSearchInputChange}
            />
          </div>
        </div>

        <div className="row d-flex justify-content-center">
          <div className="row d-flex justify-content-center">
              <div className="feed-container">
                {filteredMeetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="feed-item-container mx-3 my-3 col-6"
                  >
                    <div className="meeting-info">
                      <div className="d-flex">
                        <img className="profielpic" src="" alt="" />
                        <p className="mt-2 ms-3">Gebruiker</p>
                      </div>
                      {meeting.backgroundImage && (
                        <img
                          className="meeting-img"
                          src={meeting.backgroundImage}
                          alt=""
                        />
                      )}
                      <div className="p-1">
                        <h4>{meeting.title}</h4>
                        <p>{meeting.description}</p>
                        <p className="p-0 m-0">Locatie: {meeting.location}</p>
                        <p className="p-0 m-0">
                          Start datum: {meeting.start_date}
                        </p>
                        <p className="p-0 m-0">
                          Eind datum: {meeting.end_date}
                        </p>
                        <p className="p-0 m-0">Tijdstip: {meeting.time}</p>
                        <hr />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
