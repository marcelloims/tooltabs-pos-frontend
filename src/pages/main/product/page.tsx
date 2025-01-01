"use client";
import AddButton from "@/components/assets/addButton";
import Gird from "@/components/assets/product/grid";
import React, { useEffect, useState } from "react";

const ProductPage = () => {
    // State
    const [handlerClick, setAddHandlerClick] = useState("");
    const [columns, setColumns] = useState(["pcode", "name", "status"]);
    const urlFetch = "/product/fetch";
    const urlDelete = "/product/delete/";

    useEffect(() => {
        setAddHandlerClick("/main/product/");
    });
    return (
        <div className="content-body">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <strong>Welcome! this is product page</strong>
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

export default ProductPage;
