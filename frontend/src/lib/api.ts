import { axiosInstance } from "./axios";

export async function apiWrapper<T>(fn: () => Promise<T>) {
    try {
        const result = await fn();
        return [result, null] as const;
    } catch (error: any) {
        const message = error?.response?.data?.message || error?.message || "Unexpected error";
        return [null, message] as const;
    };
};

export const apiGet = <T>(url: string) => apiWrapper(() => axiosInstance.get<T>(url).then(res => res.data));
export const apiDelete = <T = any>(url: string) => apiWrapper(() => axiosInstance.delete<T>(url).then(res => res.data));