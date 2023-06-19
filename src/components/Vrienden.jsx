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
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { Link } from "react-router-dom";

function Vrienden() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);

  const user = localStorage.getItem("uid");

  // Function to search Firestore collection
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
      console.log("Error getting documents: ", error);
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
      console.log("Friend request sent successfully");
    } catch (error) {
      console.log("Error sending friend request: ", error);
    }
  };

  const fetchFriendRequests = async () => {
    const q = query(
      collection(db, "friendRequests"),
      where("recipientId", "==", user)
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
      // Optionally, you can remove the request from the friendRequests state.
      setFriendRequests((prevRequests) =>
        prevRequests.filter((r) => r.id !== request.id)
      );
    } catch (error) {
      console.log("Error accepting friend request:", error);
    }
  };

  const denyFriendRequest = async (request) => {
    const requestDocRef = doc(db, "friendRequests", request.id);

    try {
      await updateDoc(requestDocRef, { status: "denied" });
      console.log("Friend request denied successfully");
      // Optionally, you can remove the request from the friendRequests state.
      setFriendRequests((prevRequests) =>
        prevRequests.filter((r) => r.id !== request.id)
      );
    } catch (error) {
      console.log("Error denying friend request:", error);
    }
  };

  useEffect(() => {
    fetchFriendRequests();
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
              <p>Name: {request.senderId}</p>
              <button onClick={() => acceptFriendRequest(request)}>
                Accept
              </button>
              <button onClick={() => denyFriendRequest(request)}>Deny</button>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Vrienden;
