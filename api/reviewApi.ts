import { AxiosInstance } from 'axios';
import { HttpClient } from './axiosInstance';
import { IFormValue } from '@/components/review/createReviewForm';

export interface IReview {
    id?: number;
    attributes: {
        isActive: boolean;
        text: string;
        ownerEmail: string;
        createdAt?: Date;
        updatedAt?: Date;
    }
}

export class ReviewApi {
    private static instance: ReviewApi | null = null;
    private httpInstance: AxiosInstance;
    private constructor() {
        this.httpInstance = HttpClient.getAuthorizedInstance();
    }

    public static getInstance(): ReviewApi {
        if (this.instance) return this.instance;
        this.instance = new ReviewApi();
        return this.instance;
    }
    async getUserReviews() {
        return (await this.httpInstance.get('/reviews')).data.data;
    }
    async createReview(data: IFormValue) {
        return (await this.httpInstance.post('/reviews', {data: data})).data.data;
    }
    async deleteReview(id: number) {
        return (await this.httpInstance.delete(`/reviews/${id}`)).data.data;
    }
    async updateReview(id: number, data: IFormValue) {
        return (await this.httpInstance.put(`/reviews/${id}`, {data: data})).data.data;
    }
}
