"use client";
import "../globals.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { getCookie } from "cookies-next";
import Navbar from "@/components/layout/navbar";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MyScript from "@/components/layout/script";
import Sidebar from "@/components/layout/sidebar";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    useEffect(() => {
        const token = getCookie("token");

        if (!token) {
            router.push("/");
        } else {
            router.push("/main/dashboard");
        }
    }, []);

    return (
        <html lang="en">
            <body suppressHydrationWarning={true}>
                <main>
                    <Header />
                    <Navbar />
                    <Sidebar />
                    {children}
                    <Footer />
                    <MyScript />
                </main>
            </body>
        </html>
    );
}
