import { useState } from "react";
import { Chat } from "./components/Chat.jsx";
import { Auth } from "./components/Auth.jsx";
import { AppWrapper } from "./components/AppWrapper";
import Cookies from "universal-cookie";
import "./App.css";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./config/firebase.js";

const cookies = new Cookies();

function ChatApp() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [isInChat, setIsInChat] = useState(null);
  const [room, setRoom] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUserDetails(result);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };
  if (!isAuth) {
    return (
      <AppWrapper
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        setIsInChat={setIsInChat}
      >
        <Auth setIsAuth={setIsAuth} signInWithGoogle={signInWithGoogle} />
      </AppWrapper>
    );
  }

  return (
    <AppWrapper isAuth={isAuth} setIsAuth={setIsAuth} setIsInChat={setIsInChat}>
      {!isInChat ? (
        <div className="room">
          <label> Type room name: </label>
          <input onChange={(e) => setRoom(e.target.value)} />
          <button
            onClick={() => {
              setIsInChat(true);
            }}
          >
            Enter Chat
          </button>
        </div>
      ) : (
        <Chat room={room} userDetails={userDetails.user} />
      )}
    </AppWrapper>
  );
}

export default ChatApp;
