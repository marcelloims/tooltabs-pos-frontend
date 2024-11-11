"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DashboardPage = () => {
    // For Route
    const router = useRouter();

    // State

    useEffect(() => {}, []);

    return (
        <div className="content-body">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <strong>Welcome!</strong>
                            </div>
                            <div className="card-body">Dashboard Page </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
