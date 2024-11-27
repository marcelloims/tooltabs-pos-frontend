import React from "react";
import { ThreeCircles } from "react-loader-spinner";

const LoaderTreeCircles = () => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100hv",
                marginTop: "100px",
            }}
        >
            <ThreeCircles
                visible={true}
                height="100"
                width="100"
                color="#3babb6"
                ariaLabel="three-circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
};

export default LoaderTreeCircles;
