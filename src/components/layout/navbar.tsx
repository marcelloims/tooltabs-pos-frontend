"use client";
import React, { SyntheticEvent, useState } from "react";
import axios from "../../lib/axios";
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

    const proceedLogout = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios
            .post("/auth/logout")
            .then((response) => {
                Swal.fire({
                    title: "Thank you so much for using the apps",
                    text: response.data.message,
                    icon: "success",
                }).then((result) => {
                    if (result.isConfirmed) {
                        deleteCookie("department_per_position_id");
                        deleteCookie("token");
                        deleteCookie("user_id");
                        router.push("/");
                    }
                });
            })
            .catch((error) => {
                console.log(getCookie("token"));

                console.log(error);
            });
    };

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
                                        : splitPageTitle[1].toUpperCase()}
                                </div>
                            </div>
                            <div
                                style={{
                                    width: "100%",
                                    backgroundColor: "#000000",
                                }}
                            ></div>
                            <ul className="navbar-nav header-right">
                                <ul className="navbar-nav header-right float right">
                                    <li className="nav-item dropdown header-profile">
                                        <a
                                            className="nav-link"
                                            href="#"
                                            role="button"
                                            data-toggle="dropdown"
                                        >
                                            <i
                                                className="fa fa-cog fa-2x"
                                                aria-hidden="true"
                                            ></i>
                                            <div className="header-info">
                                                <span className="text-black">
                                                    <strong>Username</strong>
                                                </span>
                                                <p className="fs-12 mb-0">
                                                    Email User
                                                </p>
                                            </div>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <a
                                                onClick={proceedLogout}
                                                className="dropdown-item ai-icon"
                                            >
                                                <svg
                                                    id="icon-logout"
                                                    className="text-danger"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                                    <polyline points="16 17 21 12 16 7"></polyline>
                                                    <line
                                                        x1="21"
                                                        y1="12"
                                                        x2="9"
                                                        y2="12"
                                                    ></line>
                                                </svg>
                                                <span className="ml-2">
                                                    Logout{" "}
                                                </span>
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Navbar;
