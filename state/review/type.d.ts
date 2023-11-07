import { IReview } from '@/api/reviewApi';
import { IUser } from '@/interfaces';

export type ReviewState = {
    reviews: IReview[];
    isSuccess: boolean;
    isLoading: boolean;
    isError: boolean;
};
