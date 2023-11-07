import { AxiosInstance } from "axios";
import { HttpClient } from "./axiosInstance";

export class AuthApi {
    private static instance: AuthApi | null = null;
    private authorizedInstance: AxiosInstance;
    private constructor() {
        this.authorizedInstance = HttpClient.getAuthorizedInstance();
    }

    public static getInstance(): AuthApi {
        if (this.instance) return this.instance;
        this.instance = new AuthApi();
        return this.instance;
    }
    public async getMe() {
        try {
            return (await this.authorizedInstance.get('/users/me')).data;
        } catch (error) {
            return null;
        }

    }
}
