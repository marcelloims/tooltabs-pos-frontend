"use client";
import { useRouter } from "next/navigation";
import LoginPage from "../pages/auth/LoginPage";
import { useEffect } from "react";
import { getCookie } from "cookies-next";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const token = getCookie("token");

        if (!token) {
            router.push("/");
        }
        // else {
        //     router.push("/main/dashboard");
        // }
    }, []);
    return (
        <div>
            <LoginPage />
        </div>
    );
}
