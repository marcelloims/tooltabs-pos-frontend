"use client";
import axios from "@/lib/axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faDashboard,
    faCircleChevronRight,
    faVials,
    faCashRegister,
    faVial,
    faBuilding,
    faFlaskVial,
    faLandmark,
    faUserTie,
    faLock,
    faBuildingUser,
    faBowlRice,
    faFile,
    faGauge
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Response {
    code: number;
    response: [];
    status: string;
}

const Sidebar = () => {
    // For Route
    const router = useRouter();

    // State
    const [counter, setCounter] = useState(1);
    const [menus, setMenus] = useState([]);
    const [expand, setExpand] = useState(0);
    const [expandMenu, setExpandMenu] = useState(0);

    const changeMenu = () => {
        if (counter === 1) {
            setCounter(2);
        } else {
            setCounter(1);
        }
    };

    const getSubMenu = async (menuId: number, valueExpand: number) => {
        if (valueExpand === 0 && expand === 0) {
            let valueExpand = 1;
            await axios
                .put("/menu/update", {
                    menuId,
                    valueExpand,
                })
                .then((response) => {
                    setExpand(1);
                    setExpandMenu(menuId);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            let valueExpand = 0;
            await axios
                .put("/menu/update", {
                    menuId,
                    valueExpand,
                })
                .then((response) => {
                    setExpand(0);
                    setExpandMenu(menuId);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const resetMenu = async () => {
        let valueExpand = 0;
        let menuId = 0;
        let department_per_position_id = getCookie(
            "department_per_position_id"
        );
        await axios
            .put("/menu/update", {
                menuId,
                valueExpand,
                department_per_position_id,
            })
            .then((response) => {
                setExpand(0);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        library.add(
            faDashboard,
            faCashRegister,
            faCircleChevronRight,
            faBuilding,
            faLandmark,
            faFlaskVial,
            faUserTie,
            faLock,
            faBuildingUser,
            faVials,
            faVial,
            faBowlRice,
            faFile,
            faGauge
        );

        // reset menu if refresh page
        resetMenu();

        // Get data menu from table menu
        async function getMenus() {
            // Filter menu by user login

            try {
                const response = await axios.get(
                    `/menu/fetch/${getCookie("department_per_position_id")}`
                );

                setMenus(response.data.response);
            } catch (error) {
                console.log(error);
            }
        }
        getMenus();
    }, []);

    useEffect(() => { }, [counter, menus, expand, expandMenu]);

    return (
        <>
            <div className="deznav">
                <div className="deznav-scroll">
                    <ul className="metismenu" id="menu">
                        {counter === 1 &&
                            menus
                                .filter(
                                    (menu: any) =>
                                        menu.sequent.substring(0, 1) === "1"
                                )
                                .sort((a: any, b: any) => a.sequent - b.sequent)
                                .map((menu: any, i) =>
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
                                    ) : menu.submenus.length > 0 ? (
                                        <li
                                            key={i}
                                            className={
                                                expand === 1 &&
                                                    expandMenu === menu.id
                                                    ? "mm-active"
                                                    : ""
                                            }
                                        >
                                            <Link
                                                href={menu.url ? menu.url : "#"}
                                                className={
                                                    expand === 1 &&
                                                        expandMenu === menu.id
                                                        ? "has-arrow ai-icon"
                                                        : "has-arrow ai-icon"
                                                }
                                                aria-expanded={
                                                    expand === 1 &&
                                                        expandMenu === menu.id
                                                        ? "true"
                                                        : "false"
                                                }
                                                onClick={() => {
                                                    if (!menu.url) {
                                                        getSubMenu(
                                                            menu.id,
                                                            menu.expand
                                                        );
                                                    }
                                                }}
                                            >
                                                <FontAwesomeIcon
                                                    icon={menu.icon}
                                                    style={{
                                                        color: "#0a2e3d",
                                                    }}
                                                />

                                                <span className="nav-text">
                                                    {menu.name}
                                                </span>
                                            </Link>
                                            {expand === 1 &&
                                                expandMenu === menu.id && (
                                                    <ul
                                                        aria-expanded="false"
                                                        className="mm-collapse mm-show"
                                                    >
                                                        {menu.submenus?.map(
                                                            (
                                                                submenu: any,
                                                                i: any
                                                            ) => (
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
                                    ) : (
                                        <li key={i}>
                                            <Link href={menu.url}>
                                                <FontAwesomeIcon
                                                    icon={menu.icon}
                                                    className="mr-2"
                                                    style={{
                                                        color: "#0a2e3d",
                                                    }}
                                                />
                                                {menu.name}
                                            </Link>
                                        </li>
                                    )
                                )}

                        {counter === 2 &&
                            menus
                                .filter(
                                    (menu: any) =>
                                        menu.sequent.substring(0, 1) === "2"
                                )
                                .sort((a: any, b: any) => a.sequent - b.sequent)
                                .map((menu: any, i) =>
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
                                        <li
                                            key={i}
                                            className={
                                                expand === 1 &&
                                                    expandMenu === menu.id
                                                    ? "mm-active"
                                                    : ""
                                            }
                                        >
                                            <Link
                                                href={menu.url ? menu.url : "#"}
                                                className={
                                                    expand === 1 &&
                                                        expandMenu === menu.id
                                                        ? "has-arrow ai-icon"
                                                        : "has-arrow ai-icon"
                                                }
                                                aria-expanded={
                                                    expand === 1 &&
                                                        expandMenu === menu.id
                                                        ? "true"
                                                        : "false"
                                                }
                                                onClick={() => {
                                                    if (!menu.url) {
                                                        getSubMenu(
                                                            menu.id,
                                                            menu.expand
                                                        );
                                                    }
                                                }}
                                            >
                                                <FontAwesomeIcon
                                                    icon={menu.icon}
                                                    style={{
                                                        color: "#0a2e3d",
                                                    }}
                                                />

                                                <span className="nav-text">
                                                    {menu.name}
                                                </span>
                                            </Link>
                                            {expand === 1 &&
                                                expandMenu === menu.id && (
                                                    <ul
                                                        aria-expanded="false"
                                                        className="mm-collapse mm-show"
                                                    >
                                                        {menu.submenus?.map(
                                                            (
                                                                submenu: any,
                                                                i: any
                                                            ) => (
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
                                )}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
