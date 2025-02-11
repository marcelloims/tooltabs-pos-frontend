"use client";
import axios from "@/lib/axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faCircleChevronRight,
    faVials,
    faVial,
    faBuilding,
    faFlaskVial,
    faLandmark,
    faUserTie,
    faLock,
    faBuildingUser,
    faBowlRice,
    faFile,
    faCakeCandles,
    faGlassMartiniAlt,
    faGlassCheers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

    useEffect(() => {
        library.add(
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
            faCakeCandles,
            faGlassMartiniAlt,
            faGlassCheers
        );
    }, []);

    useEffect(() => {}, [counter, menus, expand, expandMenu]);

    return (
        <>
            <div className="deznav">
                <div className="deznav-scroll">
                    <ul className="metismenu" id="menu">
                        <li key="1">
                            <Link
                                href="/pos/sgv/food"
                                className="ai-icon"
                                aria-expanded="false"
                            >
                                <FontAwesomeIcon
                                    icon={faBowlRice}
                                    style={{
                                        color: "#0a2e3d",
                                    }}
                                />
                                <span className="nav-text">Food</span>
                            </Link>
                        </li>
                        <li key="2">
                            <Link
                                href="/pos/sgv/beverage"
                                className="ai-icon"
                                aria-expanded="false"
                            >
                                <FontAwesomeIcon
                                    icon={faGlassMartiniAlt}
                                    style={{
                                        color: "#0a2e3d",
                                    }}
                                />
                                <span className="nav-text">Beverage</span>
                            </Link>
                        </li>
                        <li key="3">
                            <Link
                                href="/pos/sgv/dessert"
                                className="ai-icon"
                                aria-expanded="false"
                            >
                                <FontAwesomeIcon
                                    icon={faCakeCandles}
                                    style={{
                                        color: "#0a2e3d",
                                    }}
                                />
                                <span className="nav-text">Dessert</span>
                            </Link>
                        </li>
                        <li key="4">
                            <Link
                                href="/pos/sgv/juice"
                                className="ai-icon"
                                aria-expanded="false"
                            >
                                <FontAwesomeIcon
                                    icon={faGlassCheers}
                                    style={{
                                        color: "#0a2e3d",
                                    }}
                                />
                                <span className="nav-text">Juice</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
