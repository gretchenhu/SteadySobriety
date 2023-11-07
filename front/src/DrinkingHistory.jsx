import React, { useState, useEffect } from "react";

const DrinkingHistory = ({ loggedInUser }) => {
  const [logHistory, setLogHistory] = useState([]);

  useEffect(() => {
    const fetchLogHistory = async () => {
      if (loggedInUser) {
        try {
          const response = await fetch(`/sober-log/${loggedInUser}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();

          if (response.ok) {
            const sortedHistory = data.userLogHistory.sort(
              (a, b) => new Date(a.date) - new Date(b.date)
            );
            setLogHistory(sortedHistory);
          } else {
            throw new Error(data.error || "Failed to fetch log history.");
          }
        } catch (error) {
          console.error("Error fetching log history:", error);
        }
      }
    };

    fetchLogHistory();
  }, [loggedInUser]);

  return (
    <div>
      <h2>Drinking History</h2>
      <ul>
        {logHistory.map((log, index) => (
          <li key={index}>{new Date(log.date).toLocaleDateString()}</li>
        ))}
      </ul>
    </div>
  );
};

export default DrinkingHistory;