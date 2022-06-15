import { createReducer } from "@reduxjs/toolkit";
const initialState = {};

export const conversationReducer = createReducer(initialState, {
    conversationRequest: (state) => {
      state.loading = true;
    },
    conversationSuccess: (state, action) => {
      state.loading = false;
      state.conversations = action.payload;
    },
    conversationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  });

  export const createConversationReducer = createReducer(initialState,{
    createConversationRequest: (state) => {
      state.loading = true;
    },
    createConversationSuccess: (state, action) => {
      state.loading = false;
      state.conversations = action.payload;
    },
    createConversationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  });

  export const get2ConversationUsersReducer = createReducer(initialState,{
    get2ConversationUsersRequest: (state) => {
      state.loading = true;
    },
    get2ConversationUsersSuccess: (state, action) => {
      state.loading = false;
      state.conversations = action.payload;
    },
    get2ConversationUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  })