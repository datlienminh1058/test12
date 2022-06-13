import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import Dropdown from 'react-dropdown';
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { createNewPost } from "../../Actions/Post";
import { loadUser } from "../../Actions/User";
import "./NewPost.css";
import './DayPicker.css'
import moment from "moment";
import {DatePicker, Space} from 'antd'

const {RangePicker} = DatePicker

const NewPost = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [detail, setDetail] = useState("");
  const [to, setTo] = useState("");
  const [from, setFrom] = useState();
  const [carName, setCarName] = useState("");
  const { loading, error, message } = useSelector((state) => state.like);
  const [money,setMoney] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();


  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(createNewPost(caption, image, detail, to, from,money, carName));
    dispatch(loadUser());
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message, alert]);

  function selectTimeslots(values) {
    // setTo(moment(values[0]));
    setTo(moment(values[0]).format('MMM DD yyyy'))
    // setFrom(moment(values[1]));
    setFrom(moment(values[1]).format('MMM DD yyyy'))

    }

    
  return (
    
    <div className="newPost">
      <form className="newPostForm" onSubmit={submitHandler}>
        <Typography variant="h3">New Post</Typography>

        {image && <img src={image} alt="post" />}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <input
          type="text"
          placeholder="Caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ten xe"
          value={carName}
          onChange={(e) => setCarName(e.target.value)}
        />
        <input
        type="text"
        placeholder="Detail..."
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
        />
        <input
          type="number"
          placeholder="Tien Te"
          value={money}
          onChange={(e) => setMoney(e.target.value)}
        />
        

        <Space direction="vertical" size={12}>Thoi gian cho thue
        <RangePicker format='MMM DD yyyy HH:mm' onChange={selectTimeslots} />
        </Space>
        
        <Button disabled={loading} type="submit">
          Post
        </Button>
      </form>
    </div>
  );
};

export default NewPost;