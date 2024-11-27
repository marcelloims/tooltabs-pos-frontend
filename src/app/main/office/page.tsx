"use client";
import axios from "@/lib/axios";
import OfficePage from "@/pages/main/office/page";
import ReadOnlyPage from "@/pages/main/office/readOnly/page";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";

interface Response {
    code: number;
    response: Entity;
    status: string;
}

interface Entity {
    user_id: number;
    office_id: number;
    department_id: number;
    position_id: number;
    name: string;
    write: boolean;
    read: boolean;
}

const Office = () => {
    // State
    const [accessRole, setAccessRole] = useState<Response>();

    // function
    const permissionPerMenu = async () => {
        const responsePermissionPerMenu = await axios.get(
            `/access_role/permission_per_menu/${getCookie("user_id")}`
        );

        setAccessRole(responsePermissionPerMenu.data);
    };

    // Hook
    useEffect(() => {}, [accessRole]);

    useEffect(() => {
        permissionPerMenu();
    }, []);

    return (
        <div>
            {accessRole?.response.write == true &&
                accessRole?.response.read == false && <OfficePage />}

            {accessRole?.response.write == false &&
                accessRole?.response.read == true && <ReadOnlyPage />}
        </div>
    );
};

export default Office;
