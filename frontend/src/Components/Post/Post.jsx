import { Avatar, Button, Typography, Dialog } from "@mui/material";
import React, { useEffect } from "react";
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./Post.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCommentOnPost,
  deletePost,
  likePost,
  updatePost,
} from "../../Actions/Post";
import { getFollowingPosts, getMyPosts, loadUser } from '../../Actions/User';
import User from "../User/User";
import CommentCard from "../CommentCard/CommentCard";
import moment from "moment";
import MobileScreenShareTwoToneIcon from '@mui/icons-material/MobileScreenShareTwoTone';
import { createConversation, get2ConversationUsers } from "../../Actions/Conversation";
import Messenger from "../../Components/Messenger/Messenger";
import {Col, DatePicker, Row, Space} from 'antd'
import 'antd/dist/antd.css';
import axios from "axios";
const {RangePicker} = DatePicker

const Post = ({
  postId,
  caption,
  detail,
  carName,
  money,to,from,timeSlots,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isDelete = false,
  isAccount = false,
  setCurrentChat,
}) => {
  const [liked, setLiked] = useState(false);
  const [likesUser, setLikesUser] = useState(false);
  const [commentValue, setCommentValue] = useState('');
  const [commentToggle, setCommentToggle] = useState(false);
  const [captionValue, setCaptionValue] = useState(caption);
  const [captionToggle, setCaptionToggle] = useState(false);
  const [detailValue, setDetailValue] = useState(detail);
  const [carNameValue, setCarNameValue] = useState(carName);
  const [moneyValue, setMoneyValue] = useState(money);
  // const [timeSlotsValue, setTimeSlotsValue] = useState(timeSlots);
  const [toValue, setToValue] = useState(to);
  const [fromValue, setFromValue] = useState(from);

  
 
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleLike = async () => {
    setLiked(!liked);

    await dispatch(likePost(postId));

    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
    }
  };

  const messageHandler = async (e) =>{
    e.preventDefault();
    await dispatch(createConversation(user._id,ownerId));
    await dispatch(get2ConversationUsers(user._id,ownerId));
    
  }

  const addCommentHandler = async (e) => {
    e.preventDefault();
    await dispatch(addCommentOnPost(postId, commentValue));

    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
    }
  };
  const updateCaptionHandler = (e) => {
    e.preventDefault();
    dispatch(updatePost(captionValue, postId, detailValue, carNameValue, moneyValue, toValue, fromValue));
    dispatch(getMyPosts());
  };

  const deletePostHandler = async () => {
    await dispatch(deletePost(postId));
    dispatch(getMyPosts());
    dispatch(loadUser());
  };
 

  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user._id) {
        setLiked(true);
      }
    });
  }, [likes, user._id]);


  function selectTimeslots(values) {
    // setTo(moment(values[0]));
    setToValue(moment(values[0]).format('MMM DD yyyy'))
    // setFrom(moment(values[1]));
    setFromValue(moment(values[1]).format('MMM DD yyyy'))

    }
  return (
    <div className="post">
      <div className="postHeader">
        {isAccount ? (
          <Button onClick={() => setCaptionToggle(!captionToggle)}>
            <MoreVert />
          </Button>
        ) : null}
        
      </div>

      <img src={postImage} alt="Post" />
      
      <div className="postDetails">
        <Avatar
          src={ownerImage}
          alt="User"
          sx={{
            height: "3vmax",
            width: "3vmax",
          }}
        />
        
        <Link to={`/user/${ownerId}`}>
          <Typography fontWeight={700}>{ownerName}</Typography>
        </Link>
        <Typography
          fontWeight={500}
          color="rgba(255, 99, 71, 1)"
          style={{ alignSelf: "center" }}
        >
          {caption}
        </Typography>
        <Typography
          fontWeight={500}
          color="rgba(0, 0, 0, 0.582)"
          style={{ alignSelf: "center" }}
          type="date"
        >
       
        </Typography>
  
      </div>
      <div className="d1">Tên xe:   {carName}</div>
      <div className="d1">Chi tiết về xe:   {detail}</div>
      <div class="d1">Giá thuê xe/Ngày:   {money} VND</div>
      <RangePicker />
      <div class="d1">Thời gian cho thuê:  {Object.values(timeSlots)}</div>
      <button
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          margin: "1vmax 2vmax",
        }}
        onClick={() => setLikesUser(!likesUser)}
        disabled={likes.length === 0 ? true : false}
      >
        <Typography>{likes.length} Likes</Typography>
      </button>

      <div className="postFooter">
        <Button onClick={handleLike}>
          {liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
        </Button>

        <Button onClick={() => setCommentToggle(!commentToggle)}>
          <ChatBubbleOutline />
        </Button>

        {isDelete ? (
          <Button onClick={deletePostHandler}>
            <DeleteOutline />
          </Button>
        ) : null}
        <Button onClick={messageHandler}> 
              <Link to={'/messenger'}><MobileScreenShareTwoToneIcon/></Link>
          </Button>
          
      </div>

      <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>
        <div className="DialogBox">
          <Typography variant="h4">Liked By</Typography>

          {likes.map((like) => (
            <User
              key={like._id}
              userId={like._id}
              name={like.name}
              avatar={like.avatar?.url}
            />
          ))}
        </div>
      </Dialog>

      <Dialog
        open={commentToggle}
        onClose={() => setCommentToggle(!commentToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Comments</Typography>

          <form className="commentForm" onSubmit={addCommentHandler}>
            <input
              type="text"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              placeholder="Comment Here..."
              required
            />

            <Button type="submit" variant="contained">
              Add
            </Button>
          </form>

          {comments.length > 0 ? (
            comments.map((item) => (
              <CommentCard
                userId={item.user._id}
                name={item.user.name}
                avatar={item.user.avatar?.url}
                comment={item.comment}
                commentId={item._id}
                key={item._id}
                postId={postId}
                isAccount={isAccount}
              />
            ))
          ) : (
            <Typography>No comments Yet</Typography>
          )}
        </div>
      </Dialog>

      <Dialog
        open={captionToggle}
        onClose={() => setCaptionToggle(!captionToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Update Caption</Typography>
            <form onSubmit={updateCaptionHandler} className="f1">
               Caption:
            <form className="commentForm" onSubmit={updateCaptionHandler}>
            
           <input
              type="text"
              value={captionValue}
              onChange={(e) => setCaptionValue(e.target.value)}
              placeholder="Caption Here..."
              required
            /> 
          </form>
          Detail:
          <form className="commentForm">
            
          <input
            type="text"
            value={detailValue}
            onChange={(e) => setDetailValue(e.target.value)}
            placeholder="Detail Here..."
            required
            
          />
            
          </form>
          Car name:
          <form className="commentForm" top={-50}>
          <input
            type="text"
            value={carNameValue}
            onChange={(e) => setCarNameValue(e.target.value)}
            placeholder="Car name here..."
            required
            
          />
          
          </form>
          Money:
          <form className="commentForm" >
          <input
            type="number"
            value={moneyValue}
            onChange={(e) => setMoneyValue(e.target.value)}
            placeholder="Money here..."
            required
            
          />
         
          </form>
          Thời gian cho thuê: 
          <form className="commentForm">
          
          <Space direction="vertical" size={12} >
        <RangePicker format='MMM DD yyyy' onChange={selectTimeslots} className="t1" />
        </Space>
          </form>
          <Button type="submit" variant="contained" className="dat">
              Update
            </Button>

          </form>
          
        </div>
      </Dialog>
      
    </div>
  );
};

export default Post;