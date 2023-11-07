import axios, {AxiosInstance} from "axios";
import { parseCookies } from "nookies";

const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export class HttpClient {
    private static baseInstance: AxiosInstance | null = null;
    private static authorizedInstance: AxiosInstance | null = null;

    public static getBaseInstance(): AxiosInstance {
        if (this.baseInstance) return this.baseInstance;
        this.baseInstance = axios.create({
            baseURL: backUrl,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return this.baseInstance;
    }

    public static getAuthorizedInstance(): AxiosInstance {
        if (this.authorizedInstance) return this.authorizedInstance;
        const { jwt } = parseCookies();
        return this.updateAuthorizedInstance(jwt);
    }

    public static updateAuthorizedInstance(jwt: string | undefined) {
        this.authorizedInstance = axios.create({
            baseURL: backUrl,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
        });
        return this.authorizedInstance;
    }
}