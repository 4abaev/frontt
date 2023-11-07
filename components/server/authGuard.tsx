import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import { HttpClient } from '@/api/axiosInstance';
import { AuthApi } from '@/api/authApi';

export default async function AuthGuard({ children }: { children: React.ReactNode }) {
    const cookiesStore = cookies();
    const jwt = cookiesStore.get('jwt')?.value;
    HttpClient.updateAuthorizedInstance(jwt);
    const authApi = AuthApi.getInstance();

    const user = await authApi.getMe();
    if (!user) {
        redirect('/auth/login');
    }
    return <>{children}</>;
}
