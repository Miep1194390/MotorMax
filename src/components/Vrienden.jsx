import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { Link } from "react-router-dom";

function Vrienden() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);

  const user = localStorage.getItem("uid");

  const searchFirestore = async () => {
    setSearchResults([]);

    const q = query(
      collection(db, "users"),
      where("displayName", "==", searchInput)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setSearchResults((prevResults) => [
          ...prevResults,
          { id: doc.id, ...doc.data() },
        ]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const sendFriendRequest = async (recipientId) => {
    const senderId = user;
    const status = "pending";

    try {
      await addDoc(collection(db, "friendRequests"), {
        recipientId,
        senderId,
        status,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFriendRequests = async () => {
    const q = query(
      collection(db, "friendRequests"),
      where("recipientId", "==", user),
      where("status", "==", "pending")
    );

    try {
      const querySnapshot = await getDocs(q);
      const requests = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFriendRequests(requests);
    } catch (error) {
      console.log("Error fetching friend requests:", error);
    }
  };

  const acceptFriendRequest = async (request) => {
    const requestDocRef = doc(db, "friendRequests", request.id);

    try {
      await updateDoc(requestDocRef, { status: "accepted" });
      console.log("Friend request accepted successfully");
      setFriendRequests((prevRequests) =>
        prevRequests.filter((r) => r.id !== request.id)
      );

      setFriends((prevFriends) => [
        ...prevFriends,
        { id: request.senderId, ...request },
      ]);
    } catch (error) {
      console.log("Error accepting friend request:", error);
    }
  };

  const denyFriendRequest = async (request) => {
    const requestDocRef = doc(db, "friendRequests", request.id);

    try {
      await updateDoc(requestDocRef, { status: "denied" });
      console.log("Friend request denied successfully");
      setFriendRequests((prevRequests) =>
        prevRequests.filter((r) => r.id !== request.id)
      );
    } catch (error) {
      console.log("Error denying friend request:", error);
    }
  };

  const fetchFriends = async () => {
    const q = query(
      collection(db, "friendRequests"),
      where("status", "==", "accepted"),
      where("recipientId", "==", user)
    );

    try {
      const querySnapshot = await getDocs(q);
      const acceptedRequests = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          senderId: data.senderId,
          status: data.status,
          displayName: "",
          email: "",
        };
      });

      const friendRequests = acceptedRequests.map(async (request) => {
        const friendDocRef = doc(db, "users", request.senderId);
        const friendDocSnapshot = await getDoc(friendDocRef);

        if (friendDocSnapshot.exists()) {
          const friendData = friendDocSnapshot.data();
          request.displayName = friendData.displayName;
          request.email = friendData.email;
        }

        return request;
      });

      const updatedRequests = await Promise.all(friendRequests);

      setFriends(updatedRequests);
    } catch (error) {
      console.log("Error fetching friends:", error);
    }
  };

  useEffect(() => {
    fetchFriendRequests();
    fetchFriends();
  }, []);

  return (
    <div className="container-fluid maak-container">
      <div className="row">
        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3">
          <div className="sidebar-vrienden">
            <Link to="/">TERUG</Link>
            <input
              className="mt-4"
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search..."
            />
            <button onClick={searchFirestore} className="mt-3">
              Search
            </button>
          </div>
        </div>
        <div className="col-xxl-9 col-xl-9 col-lg-9 col-md-9">
          <div className="meetings">
            {searchResults.map((result) => (
              <div key={result.id}>
                <p>Name: {result.displayName}</p>
                <p>Email: {result.email}</p>
                <button onClick={() => sendFriendRequest(result.id)}>
                  Send Friend Request
                </button>
                <hr />
              </div>
            ))}
          </div>

          {friendRequests.map((request) => (
            <div key={request.id}>
              <p>Id: {request.senderId}</p>
              <button onClick={() => acceptFriendRequest(request)}>
                Accept
              </button>
              <button onClick={() => denyFriendRequest(request)}>Deny</button>
              <hr />
            </div>
          ))}

          <h2>Friends</h2>
          {friends.map((friend) => (
            <div key={friend.id}>
              <p>Id: {friend.senderId}</p>
              <p>Name: {friend.displayName}</p>
              <p>Email: {friend.email}</p>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Vrienden;
