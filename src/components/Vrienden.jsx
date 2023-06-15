import React, { useState } from "react";

const Vrienden = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const filteredUsers = users.filter(
      (user) =>
        user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredUsers);
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

      <div>
        {searchResults.map((user) => (
          <div key={user.uid}>
            <h3>{user.displayName}</h3>
            <p>Email: {user.email}</p>
            <img src={user.profilePicture} alt="Profile" />
            <button>Add Friend</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vrienden;
