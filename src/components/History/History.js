import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import "./index.css";

const History = () => {
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://weatherbackend-wgog.onrender.com/history",
          {
            headers: { Authorization: token },
          }
        );
        setHistory(res.data.history);
      } catch (error) {
        setMessage("Error fetching history");
      }
    };

    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://weatherbackend-wgog.onrender.com/history/${id}`,
        {
          headers: { Authorization: token },
        }
      );
      setHistory(history.filter((entry) => entry.id !== id));
      setMessage("Entry deleted");
    } catch (error) {
      setMessage("Error deleting entry");
    }
  };

  return (
    <div className="history-container">
      <h2>Search History</h2>
      {message && <p className="history-message">{message}</p>}
      {history.length === 0 ? (
        <h1 className="no-history">No History found</h1>
      ) : (
        <ul className="history-list">
          {history.map((entry) => (
            <li key={entry.id} className="history-item">
              <span className="spanel">
                {entry.location} - {new Date(entry.timestamp).toLocaleString()}
              </span>
              <button
                onClick={() => handleDelete(entry.id)}
                className="history-delete-button"
              >
                <MdDelete className="delete" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
