"use client";
import React, { SyntheticEvent, useState } from "react";
import Swal from "sweetalert2";
import { useRouter, usePathname } from "next/navigation";
import { deleteCookie, getCookie } from "cookies-next";

const Navbar = () => {
    // For routing
    const router = useRouter();
    const pathName = usePathname();

    // Satup Title Per-Page
    let pageTitle = String(pathName).split("/");
    let splitPageTitle = pageTitle[2].split("_");

    return (
        <>
            <div className="nav-header">
                <a href="/main/dashboard" className="brand-logo">
                    <img
                        className="logo-abbr"
                        src="/static/assets/images/logo-tooltabs-icon.png"
                        alt=""
                    />
                    <img
                        className="logo-compact"
                        src="/static/assets/images/logo-tooltabs-text-2.png"
                        alt=""
                    />
                    <img
                        className="brand-title"
                        src="/static/assets/images/logo-tooltabs-text-2.png"
                        alt=""
                    />
                </a>
                <div className="nav-control">
                    <div className="hamburger">
                        <span className="line"></span>
                        <span className="line"></span>
                        <span className="line"></span>
                    </div>
                </div>
            </div>
            <div className="header">
                <div className="header-content">
                    <nav className="navbar navbar-expand">
                        <div className="collapse navbar-collapse justify-content-between">
                            <div className="header-left">
                                <div className="dashboard_bar text-nowrap">
                                    {splitPageTitle[0].toUpperCase() + " "}
                                    {splitPageTitle[1] === undefined
                                        ? ""
                                        : splitPageTitle[1].toUpperCase() + " "}
                                    {splitPageTitle[2] === undefined
                                        ? ""
                                        : splitPageTitle[2].toUpperCase()}
                                </div>
                            </div>
                            <div
                                style={{
                                    width: "100%",
                                    backgroundColor: "#000000",
                                }}
                            ></div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Navbar;
