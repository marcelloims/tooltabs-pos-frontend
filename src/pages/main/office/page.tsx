"use client";
import AddButton from "@/components/assets/addButton";
import Gird from "@/components/assets/grid";
import React, { use, useEffect, useState } from "react";

const OfficePage = () => {
    // State
    const [handlerClick, setAddHandlerClick] = useState("");
    const [columns, setColumns] = useState(["code", "name", "email", "phone"]);
    const urlFetch = "/office/fetch";
    const urlDelete = "/office/delete/";

    useEffect(() => {
        setAddHandlerClick("/main/office/");
    });

    return (
        <div className="content-body">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <strong>Welcome!</strong>
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

export default OfficePage;
