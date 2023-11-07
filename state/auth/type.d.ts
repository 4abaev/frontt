

type User = {
    id: string;
    username: string;
    email: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    subscriptions: Subscriptions[];
};

type AuthState = {
    user: User | null;
    error: string | undefined;
    isSuccess: boolean;
    isLoading: boolean;
    isError: boolean;
    isAuth: boolean;
};

namespace UserAPI {
    type SignupForm = {
        username: string;
        email: string;
        password: string;
    };
    type SigninForm = {
        identifier: string;
        password: string;
    };
}
