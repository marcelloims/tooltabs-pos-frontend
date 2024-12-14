"use client";
import AddButton from "@/components/assets/addButton";
import Gird from "@/components/assets/department_per_position/grid";
import React, { useEffect, useState } from "react";

const department_per_positionPerPositionPage = () => {
    const [handlerClick, setAddHandlerClick] = useState("");
    const [columns, setColumns] = useState([
        "department_name",
        "position_name",
        "grade_level",
    ]);
    const urlFetch = "/department_per_position/fetch";
    const urlDelete = "/department_per_position/delete/";

    useEffect(() => {
        setAddHandlerClick("/main/department_per_position/");
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
                                        Welcome! this is Department Per Position
                                        page
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
        </div>
    );
};

export default department_per_positionPerPositionPage;
