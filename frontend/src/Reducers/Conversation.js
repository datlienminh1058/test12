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