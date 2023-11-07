import { createAsyncThunk } from '@reduxjs/toolkit';
import { IReview, ReviewApi } from '@/api/reviewApi';
import { IFormValue } from '@/components/review/createReviewForm';


const reviewApi = ReviewApi.getInstance();

export const getReviewByUserId = createAsyncThunk<IReview[], string>('reviews/get', async function (_, thunkAPI) {
    try {
        const res = await reviewApi.getUserReviews();
        return thunkAPI.fulfillWithValue(res);
    } catch (err) {
        return err;
    }
});

export const createReview = createAsyncThunk<IReview, IFormValue>('review/create', async function (data, thunkAPI) {
    try {
        const res = await reviewApi.createReview(data);
        return thunkAPI.fulfillWithValue(res);
    } catch (err) {
        return err;
    }
});

export const updateReview = createAsyncThunk<IReview, {id: number, formValue: IFormValue}>('review/updata', async function ({id, formValue}, thunkAPI) {
    try {
        const res = await reviewApi.updateReview(id, formValue);
        return thunkAPI.fulfillWithValue(res);
    } catch (err) {
        return err;
    }
});

export const deleteReview = createAsyncThunk<IReview, number>('review/delete', async function (data, thunkAPI) {
    try {
        const res = await reviewApi.deleteReview(data);
        return thunkAPI.fulfillWithValue(res);
    } catch (err) {
        return err;
    }
});
