"use client";
import AddButton from "@/components/assets/addButton";
import Grid from "@/components/assets/department/grid";
import React, { useEffect, useState } from "react";

const DepartmentPage = () => {
    const [handlerClick, setAddHandlerClick] = useState("");
    const [columns, setColumns] = useState(["code", "name"]);
    const urlFetch = "/department/fetch";
    const urlDelete = "/department/delete/";

    useEffect(() => {
        setAddHandlerClick("/main/department/");
    });
    return (
        <div>
            <div className="content-body">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header">
                                    <strong>
                                        Welcome! this is Department page
                                    </strong>
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

export default DepartmentPage;
