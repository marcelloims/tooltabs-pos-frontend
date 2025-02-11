"use client";
import "../../globals.css";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { getCookie } from "cookies-next";
import Header from "@/components/posLayout/sgv/header";
import Navbar from "@/components/posLayout/sgv/navbar";
import Sidebar from "@/components/posLayout/sgv/sidebar";
import MyScript from "@/components/posLayout/sgv/script";
import Footer from "@/components/posLayout/sgv/footer";

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
        }
    }, []);

    return (
        <html lang="en">
            <body suppressHydrationWarning={true}>
                <div id="main-wrapper">
                    <Header />
                    <Navbar />
                    <Sidebar />
                    {children}
                    <Footer />
                    <MyScript />
                </div>
            </body>
        </html>
    );
}
