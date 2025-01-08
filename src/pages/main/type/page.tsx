"use client";
import AddButton from "@/components/assets/addButton";
import Grid from "@/components/assets/type/grid";
import React, { useEffect, useState } from "react";

const TypePage = () => {
    const [handlerClick, setAddHandlerClick] = useState("");
    const [columns, setColumns] = useState(["name"]);
    const urlFetch = "/type/fetch";
    const urlDelete = "/type/delete/";

    useEffect(() => {
        setAddHandlerClick("/main/type/");
    });
    return (
        <div>
            <div className="content-body">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header">
                                    <strong>Welcome! this is type page</strong>
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

export default TypePage;
