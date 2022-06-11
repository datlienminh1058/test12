import axios from "axios";
import { useContext, useEffect, useState } from "react";
import "./ChatOnline.css";
import {getAllUsers} from '../../Actions/User'
import { useDispatch, useSelector } from "react-redux";
import User from "../User/User"
import { Button, Typography } from "@mui/material";

const ChatOnline = ({onlineUsers, currentId, setCurrentChat}) => {
  const [friends, setFriends] = useState([]);
  const {users} = useSelector((state) => state.allUsers);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(`/api/v1/user/friends/${currentId}`);
      setFriends(res.data);
    };

    getFriends();
  }, [currentId]);
  

  useEffect(() => {
    setOnlineFriends(Object.values(friends).filter((f) => onlineUsers.includes(f._id)));
    
  }, [friends, onlineUsers]);
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(`/api/v1/conversations/find/${currentId}/${user?._id}`);
      setCurrentChat(res.data);
    } catch (error) {
      console.log(error);
    }
  }
    return (
    <div className="chatOnline">
      
      {
        users && users.length > 0 ? (
          users.map((onlineFriend) => (
          <div className="chatOnlineFriend"onClick={() => handleClick(onlineFriend)} >
            <div className="chatOnlineImgContainer"> 
              <img 
                className="chatOnlineImg"
                key={onlineFriend?._id}
                src={onlineFriend.avatar?.url}
                alt=""
              />
              <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">{onlineFriend.name}</span>
            
          </div>
      ))) : (
        <Typography>No</Typography>
      )}
    </div>
  );
}
export default ChatOnline