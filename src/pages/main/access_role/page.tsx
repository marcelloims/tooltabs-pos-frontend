"use client";
import Gird from "@/components/assets/access_role/grid";
import AddButton from "@/components/assets/addButton";
import React, { useEffect, useState } from "react";

const AccessRolePage = () => {
    // State
    const [handlerClick, setAddHandlerClick] = useState("");
    const [columns, setColumns] = useState(["permission_name", "office_name"]);
    const urlFetch = "/access_role/fetch";
    const urlDelete = "/access_role/delete/";

    useEffect(() => {
        setAddHandlerClick("/main/access_role/");
    });

    return (
        <div className="content-body">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <strong>
                                    Welcome! this is access role page
                                </strong>
                            </div>
                            <div className="card-body">
                                <AddButton urlRoute={handlerClick} />
                                <Gird
                                    urlFetch={urlFetch}
                                    urlDelete={urlDelete}
                                    columns={columns}
                                    urlRoute={handlerClick}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccessRolePage;
