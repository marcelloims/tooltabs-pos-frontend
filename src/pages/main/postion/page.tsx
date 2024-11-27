"use client";
import AddButton from "@/components/assets/addButton";
import Gird from "@/components/assets/position/grid";
import React, { useEffect, useState } from "react";

const PositionPage = () => {
    // State
    const [handlerClick, setAddHandlerClick] = useState("");
    const [columns, setColumns] = useState(["code", "name"]);
    const urlFetch = "/position/fetch";
    const urlDelete = "/position/delete/";

    useEffect(() => {
        setAddHandlerClick("/main/position/");
    });
    return (
        <div className="content-body">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <strong>Welcome! this is position page</strong>
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

export default PositionPage;
