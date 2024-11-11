import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import axios from "../lib/axios";
import { log } from "console";

export const useAuth = () => {
    const router = useRouter();

    // Loading
    const [isLoading, setIsLoading] = useState(true);

    // User
    const {
        data: user,
        error,
        mutate,
    } = useSWR("/api/auth/profile", () => axios.get("/api/auth/profile"))
        .then((response) => response.data.data)
        .catch((error) => {
            console.log(error);
        });

    // CSRF
    const csrf = () => axios.get("test");

    // Login

    // Logout
    return {
        user,
        csrf,
        isLoading,
        login,
        logout,
    };
};
