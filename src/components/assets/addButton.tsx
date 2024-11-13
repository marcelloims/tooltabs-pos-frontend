"use client";
import { useRouter } from "next/navigation";
import React from "react";

type propsType = {
    urlRoute: string;
};

const AddButton = (props: propsType) => {
    // for route
    const router = useRouter();

    // passing props
    const { urlRoute } = props;

    const handleClick = () => {
        router.push(urlRoute);
    };

    return (
        <div>
            <button
                type="button"
                className="btn light btn-primary"
                onClick={handleClick}
            >
                Add Data
            </button>
        </div>
    );
};

export default AddButton;
