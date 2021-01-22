import { Avatar } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./Chats.css";
import SearchIcon from "@material-ui/icons/Search";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { auth, db } from "./firebase";
import { Chat } from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./features/appSlice";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useHistory } from "react-router-dom";

export const Chats = () => {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const history = useHistory()
  const dispatch = useDispatch()
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);
   
  const  takeSnap =()=>{
    history.push('/')
  }

  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar
          src={user.profilePic}
          onClick={() => auth.signOut()}
          className="chats__avatar"
        />
        <div className="chats__search">
          <SearchIcon />
          <input placeholder="Friends" type="text" />
        </div>
        <ChatBubbleIcon className="chats__chatIcon" />
      </div>
      <div className="chats__posts">
        {posts.map(
          ({
            id,
            data: { profilePic, username, timestamp, imageUrl, read },
          }) => (
            <Chat
              id={id}
              key={id}
              username={username}
              timestamp={timestamp}
              imageUrl={imageUrl}
              read={read}
              profilePic={profilePic}
            />
          )
        )}
      </div>

      <RadioButtonUncheckedIcon onClick={takeSnap} className='chats__radiobutton' />
    </div>
  );
};
