import React from "react";
import { RotatingLines } from "react-loader-spinner";

const LoaderRotatingLines = () => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100hv",
            }}
        >
            <RotatingLines
                visible={true}
                height="50"
                width="50"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
};

export default LoaderRotatingLines;
