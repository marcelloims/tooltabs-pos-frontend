"use client";
import { useRouter } from "next/navigation";
import React from "react";

const BackButton = () => {
    // for route
    const router = useRouter();

    const handleClick = () => {
        router.back();
    };
    return (
        <div>
            <button
                type="button"
                className="btn light btn-secondary"
                onClick={handleClick}
            >
                Back
            </button>
        </div>
    );
};

export default BackButton;
