import React, { useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const Vrienden = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const collectionRef = collection(db, "users");

  const handleSearch = async () => {
    try {
      const querySnapshot = await getDocs(
        query(
          collectionRef,
          where("displayName", "==", searchQuery),
          where("email", "==", searchQuery),
        )
      );

      console.log("Query Snapshot:", querySnapshot);
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push(doc.data());
        
      });

      setSearchResults(results);
    } catch (error) {
      console.error("Error searching for users:", error);
    }
  };

  return (
    <div>
      <h1>Vrienden</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((user) => (
            <li key={user.id}>
              <div>
                <strong>Name:</strong> {user.displayName}
              </div>
              <div>
                <strong>Email:</strong> {user.email}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No search results</p>
      )}
    </div>
  );
};

export default Vrienden;
