import axios from "axios";
import { useContext, useEffect, useState } from "react";
import "./ChatOnline.css";
import {getAllUsers} from '../../Actions/User'
import { useDispatch, useSelector } from "react-redux";
import User from "../User/User"
import { Button, Typography } from "@mui/material";
import { createConversation, get2ConversationUsers } from "../../Actions/Conversation";

const ChatOnline = ({onlineUsers, currentId, setCurrentChat}) => {
  const [friends, setFriends] = useState([]);
  const {users} = useSelector((state) => state.allUsers);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(`/api/v1/user/${currentId}`);
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
      // const res = await dispatch(createConversation(currentId,user._id));

      setCurrentChat(res.data);
      // console.log(res.data);

      // const ress = await axios.get(`/api/v1/conversations/${res.data_id}`);
      // console.log(ress.data);
      // if((res.data) == null){
      //   const q = user?._id;
      //   const res = await axios.post(`/api/v1/conversations`,{q, currentId});
      //   setCurrentChat(res.data);
      //   console.log('hello');
      // } else{
      // const res = await axios.get(`/api/v1/conversations/find/${currentId}/${user?._id}`);
      // setCurrentChat(res.data);
      //   console.log('asdxcv');
      // }

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