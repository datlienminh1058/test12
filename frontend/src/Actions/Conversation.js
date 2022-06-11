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