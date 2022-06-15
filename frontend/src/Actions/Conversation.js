import axios from "axios";

export const getConversation = (user) => async (dispatch) => {
    try {
      dispatch({
        type: "conversationRequest",
      });
  
    const { data } = await axios.get('/api/v1/conversations/' + user._id);
      dispatch({
        type: "conversationSuccess",
        payload: data.conversations,
      });
    } catch (error) {
      dispatch({
        type: "conversationFailure",
        payload: error.response.data.message,
      });
    }
  };

  export const createConversation = (senderId, receiverId) => async (dispatch) =>{
    try{
      dispatch({
        type: "createConversationRequest",
        
      });
      const {data} = await axios.post('/api/v1/conversations',{senderId,receiverId});
      
      dispatch({
      type: "createConversationSuccess",
      payload: data.conversation,
    });
    }catch(error){
      dispatch({
        type: "createConversationFailure",
        payload: error.response.data.message,
      });
    }
    
  }
  export const get2ConversationUsers = (firstUserId, secondUserId) => async (dispatch) =>{
    try{
      dispatch({
        type: "get2ConversationUsersRequest",
        
      });
      const {data} = await axios.get(`/api/v1/conversations/find/${firstUserId}/${secondUserId}`);
      
      dispatch({
      type: "get2ConversationUsersSuccess",
      payload: data.conversation,
    });
    }catch(error){
      dispatch({
        type: "get2ConversationUsersFailure",
        payload: error.response.data.message,
      });
    }
    
  }