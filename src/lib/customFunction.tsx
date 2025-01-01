import React from "react";

export const formatColumnName = (column: string) => {
    let str = "";

    let pageTitle = column.split("_");

    pageTitle.map((row) => {
        row = String(row).charAt(0).toUpperCase() + String(row).slice(1);
    });
    return pageTitle.join(" ");

    // let upperFirst = pageTitle[0].slice(0, 1).toUpperCase();
    // let lowerFirst = pageTitle[0].slice(1).toLowerCase();
    // let first = upperFirst + lowerFirst;

    // let upperSecond = pageTitle[1]?.slice(0, 1).toUpperCase();
    // let lowerSecond = pageTitle[1]?.slice(1).toLowerCase();
    // let second = upperSecond + lowerSecond ? upperSecond + lowerSecond : "";

    // let upperTrird = pageTitle[2]?.slice(0, 1).toUpperCase();
    // let lowerTrird = pageTitle[2]?.slice(1).toLowerCase();
    // let trird = upperTrird + lowerTrird ? upperTrird + lowerTrird : "";

    // let formatColumnName = first + " " + second + " " + trird;
    // return formatColumnName;
};
