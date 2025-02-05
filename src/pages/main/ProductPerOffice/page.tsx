"use client";
import AddButton from "@/components/assets/addButton";
import Gird from "@/components/assets/product_per_office/grid";
import React, { useEffect, useState } from "react";

const ProductPerOfficePage = () => {
    // State
    const [handlerClick, setAddHandlerClick] = useState("");
    const [columns, setColumns] = useState([
        "office_code",
        "pcode",
        "name",
        "unit",
        "price",
        "status",
    ]);
    const urlFetch = "/product_per_office/fetch";
    const urlDelete = "/product_per_office/delete/";

    useEffect(() => {
        setAddHandlerClick("/main/product_per_office/");
    });
    return (
        <div className="content-body">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <strong>
                                    Welcome! this is product per office page
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

export default ProductPerOfficePage;
