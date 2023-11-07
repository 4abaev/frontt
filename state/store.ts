import { bindActionCreators, combineReducers, configureStore } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import * as authActions from './auth/actions';
import * as reviewActions from './review/action';
import { authSlice } from './auth/slice';
import { reviewSlice } from './review/slice';

export const combineActions = {
    ...authActions,
    ...reviewActions,
};

export const store = configureStore({
    reducer: combineReducers({
        auth: authSlice.reducer,
        review: reviewSlice.reducer,
    }),
});

export const useAppSelector: TypedUseSelectorHook<RTK.RootState> = useSelector;

export function useAppDispatch() {
    return useDispatch<RTK.AppDispatch>();
}

export const useActions = () => {
    const dispatch = useDispatch();
    return useMemo(() => bindActionCreators(combineActions, dispatch), [dispatch]);
};
