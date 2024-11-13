"use client";
import AddButton from "@/components/assets/addButton";
import React, { useEffect, useState } from "react";

const OfficePage = () => {
    // State
    const [addHandlerClick, setAddHandlerClick] = useState("");

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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OfficePage;
