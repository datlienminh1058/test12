import { Typography } from '@mui/material';
import axios from 'axios';
import { use } from 'bcrypt/promises';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../Actions/User';
import './Conversation.css'

export default function Conversation({ conversation, currentUser }) {

  const {users} = useSelector((state) => state.user);
  // const setUser = ([]);
  const [user, setUser] = useState([]);


  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser?._id);

    const getUser = async () => {
      try {
        const res = await axios.get('/api/v1/user/' + users?._id);
        setUser(res.data);
      }

      catch (err) {
        console.error(err);
      }
    }
    // getUser();
  }, [currentUser, conversation]);

  return (
    <div className="">
      
      
              {/* <img
              className="conversationImg"
              src={user.avatar?.url}
              alt='' />
              <span className="conversationName">{user.name}</span>
               */}
      
    </div>
  )
}

