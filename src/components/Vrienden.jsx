import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../firebase';
import { Link } from 'react-router-dom';



function Vrienden() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const user = localStorage.getItem("uid");

  // Function to search Firestore collection
  const searchFirestore = async () => {
    setSearchResults([]);

    const q = query(collection(db, "users"), where("displayName", "==", searchInput));
    
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

    // set uid into const senderId
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

  return (
    <div className="container-fluid maak-container">
      <div className="row">
        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3">
          <div className="sidebar-vrienden">
            <Link to="/">TERUG</Link>
            <input
              className='mt-4'
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search..."
              />
              <button onClick={searchFirestore} className='mt-3' >Search</button>
            </div>
          </div>
          

            <div className="col-xxl-9 col-xl-9 col-lg-9 col-md-9">
              <div className='meetings'>
                {searchResults.map((result) => (
                  <div key={result.id}>
                    <p>Name: {result.displayName}</p>
                    <p>Email: {result.email}</p>
                    <button onClick={() => sendFriendRequest(result.id)}>Send Friend Request</button>
                    <hr />
                  </div>
                ))}
              </div>
            </div>
        </div>
      </div>
  );
}

export default Vrienden;
