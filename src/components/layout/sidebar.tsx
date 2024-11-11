"use client";
import axios from "@/lib/axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faCircleChevronRight,
    faBuilding,
    faLandmark,
    faUserTie,
    faLock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCookie } from "cookies-next";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Sidebar = () => {
    const [counter, setCounter] = useState(1);
    const [menus, setMenus] = useState([]);
    const [menus1, setMenus1] = useState([]);
    const [menus2, setMenus2] = useState([]);
    const [submenus, setSubmenus] = useState([]);
    const [expand, setExpand] = useState(false);

    const changeMenu = () => {
        if (counter === 1) {
            setCounter(2);
        } else {
            setCounter(1);
        }
    };

    const getSubMenu = (menuId: any) => {
        if (!expand) {
            setExpand(true);
            let submenu = menus
                .filter((menu: any) => menu.submenu == menuId)
                .map((menu) => menu)
                .sort((a: any, b: any) => a.sequent - b.sequent);
            setSubmenus(submenu);
        } else {
            setExpand(false);
        }
    };

    useEffect(() => {
        library.add(
            faCircleChevronRight,
            faBuilding,
            faLandmark,
            faUserTie,
            faLock
        );
        // Get data menu from table menu
        async function getMenus() {
            // Filter menu by user login

            const response = await axios.get(
                `/menu/fetch/${getCookie("department_per_position_id")}`
            );

            setMenus(
                response.data.response
                    .map((menu: any) => menu)
                    .sort((a: any, b: any) => a.sequent - b.sequent)
            );

            setMenus1(
                response.data.response
                    .filter((menu: any) => menu.sequent.substring(0, 1) === "1")
                    .map((menu: any) => menu)
                    .sort((a: any, b: any) => a.sequent - b.sequent)
            );

            setMenus2(
                response.data.response
                    .filter((menu: any) => menu.sequent.substring(0, 1) === "2")
                    .map((menu: any) => menu)
                    .sort((a: any, b: any) => a.sequent - b.sequent)
            );
        }
        getMenus();
    }, []);

    useEffect(() => {}, [
        setCounter,
        setMenus,
        setMenus1,
        setMenus2,
        setSubmenus,
        setExpand,
    ]);

    return (
        <>
            <div className="deznav">
                <div className="deznav-scroll">
                    <ul className="metismenu" id="menu">
                        {counter === 1 &&
                            menus1.map((menu: any, i) =>
                                menu.name === "Go to Configuration" ? (
                                    <li key={i}>
                                        <Link
                                            href="#"
                                            className="ai-icon"
                                            aria-expanded="false"
                                            onClick={changeMenu}
                                        >
                                            <i
                                                className={menu.icon}
                                                style={{ color: "#0a2e3d" }}
                                            ></i>
                                            <span className="nav-text">
                                                {menu.name}
                                            </span>
                                        </Link>
                                    </li>
                                ) : (
                                    <li key={i}>
                                        <Link
                                            href={menu.url}
                                            className="ai-icon"
                                            aria-expanded="false"
                                        >
                                            <i
                                                className={menu.icon}
                                                style={{ color: "#0a2e3d" }}
                                            ></i>
                                            <span className="nav-text">
                                                {menu.name}
                                            </span>
                                        </Link>
                                    </li>
                                )
                            )}

                        {counter === 2 &&
                            menus2.map((menu: any, i) =>
                                menu.name === "Back to Main" ? (
                                    <li key={i}>
                                        <Link
                                            href="#"
                                            className="ai-icon"
                                            aria-expanded="false"
                                            onClick={changeMenu}
                                        >
                                            <i
                                                className={menu.icon}
                                                style={{ color: "#0a2e3d" }}
                                            ></i>
                                            <span className="nav-text">
                                                {menu.name}
                                            </span>
                                        </Link>
                                    </li>
                                ) : (
                                    !menu.submenu &&
                                    submenus.id === menu.submenus && (
                                        <li
                                            key={i}
                                            className={
                                                expand ? "mm-active" : ""
                                            }
                                        >
                                            <Link
                                                href="#"
                                                className={
                                                    expand
                                                        ? "has-arrow ai-icon"
                                                        : "has-arrow ai-icon"
                                                }
                                                aria-expanded={
                                                    expand ? "true" : "false"
                                                }
                                                onClick={() =>
                                                    getSubMenu(menu.id)
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={menu.icon}
                                                    style={{ color: "#0a2e3d" }}
                                                />

                                                <span className="nav-text">
                                                    {menu.name}
                                                </span>
                                            </Link>
                                            {expand && (
                                                <ul
                                                    aria-expanded="false"
                                                    className="mm-collapse mm-show"
                                                >
                                                    {submenus.map(
                                                        (submenu: any, i) => (
                                                            <li key={i}>
                                                                <Link
                                                                    href={
                                                                        submenu.url
                                                                    }
                                                                >
                                                                    <FontAwesomeIcon
                                                                        icon={
                                                                            submenu.icon
                                                                        }
                                                                        className="mr-2"
                                                                        style={{
                                                                            color: "#0a2e3d",
                                                                        }}
                                                                    />
                                                                    {
                                                                        submenu.name
                                                                    }
                                                                </Link>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            )}
                                        </li>
                                    )
                                )
                            )}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
