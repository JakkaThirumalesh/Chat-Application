import { useState, useEffect } from "react";
import { db, auth } from "../config/firebase";
import { format } from "date-fns";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import "../styles/Chat.css";

export const Chat = ({ room, userDetails }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        messages.push({
          ...data,
          id: doc.id,
          createdAt: data.createdAt ? data.createdAt.toDate() : null, // Convert Timestamp to Date
        });
      });

      setMessages(messages);
    });
    return () => unsubscribe();
  }, [room]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage("");
  };
  console.log(userDetails);

  return (
    <div className="chat-app">
      <div className="header">
        <h2>Welcome to: {room}</h2>
      </div>
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <div className="user">
              {message.user}: {message.text}
            </div>
            {message.createdAt && (
              <div className="timestamp">
                {format(message.createdAt, "hh:mm a")}
              </div>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          className="new-message-input"
          placeholder="Type your message here..."
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};
