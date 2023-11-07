import { createSlice } from "@reduxjs/toolkit";
import { ReviewState } from "./type";
import * as reviewActions from "./action";

const initialState: ReviewState = {
  reviews: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
};

export const reviewSlice = createSlice({
  initialState,
  name: "review",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(reviewActions.createReview.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(reviewActions.createReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(reviewActions.createReview.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(reviewActions.getReviewByUserId.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(reviewActions.getReviewByUserId.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(reviewActions.getReviewByUserId.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(reviewActions.deleteReview.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(reviewActions.deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter((review) => {
          return review.id !== action.payload.id;
        });
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(reviewActions.deleteReview.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(reviewActions.updateReview.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(reviewActions.updateReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.map((review) => {
          if (review.id === action.payload.id) {
            return action.payload
          }
          return review;
        });
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(reviewActions.updateReview.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      });
  },
});
