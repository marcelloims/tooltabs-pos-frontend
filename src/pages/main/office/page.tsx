"use client";
import AddButton from "@/components/assets/addButton";
import Gird from "@/components/assets/grid";
import React, { use, useEffect, useState } from "react";

const OfficePage = () => {
    // State
    const [addHandlerClick, setAddHandlerClick] = useState("");
    const [columns, setColumns] = useState(["code", "name", "email", "phone"]);
    const urlFetch = "/office/fetch";

    useEffect(() => {
        setAddHandlerClick("/main/office/create");
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
                                <AddButton urlRoute={addHandlerClick} />
                                <Gird urlFetch={urlFetch} columns={columns} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OfficePage;
