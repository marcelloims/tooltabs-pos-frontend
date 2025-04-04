"use client";
import AddButton from "@/components/assets/addButton";
import Grid from "@/components/assets/user_master/grid";
import React, { useEffect, useState } from "react";

const UserMasterPage = () => {
    const [handlerClick, setAddHandlerClick] = useState("");
    const [columns, setColumns] = useState(["name", "email", "telephone", "activated"]);
    const urlFetch = "/user_master/fetch";
    const urlDelete = "/user_master/delete/";

    useEffect(() => {
        setAddHandlerClick("/main/user_master/");
    });
    return (
        <div>
            <div className="content-body">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header">
                                    <strong>Welcome! this is user master page</strong>
                                </div>
                                <div className="card-body">
                                    <AddButton urlRoute={handlerClick} />
                                    <Grid
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
        </div>
    );
};

export default UserMasterPage;
