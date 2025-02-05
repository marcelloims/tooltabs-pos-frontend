import React from "react";

export const formatPageTitle = (column: string) => {
    let pageTitle = column.split("_");

    pageTitle.map((row) => {
        row = String(row).charAt(0).toUpperCase() + String(row).slice(1);
    });
    return pageTitle.join(" ");
};

export const formatToCurrency = (value: string) => {
    var number_string = value.toString(),
        sisa = number_string.length % 3,
        rupiah = number_string.substr(0, sisa),
        ribuan = number_string.substr(sisa).match(/\d{3}/g);

    if (ribuan) {
        let separator = sisa ? "." : "";
        rupiah += separator + ribuan.join(".");
    }

    return "Rp. " + rupiah;
};

export const numberFormat = (value: string) => {
    var number_string = value.toString(),
        sisa = number_string.length % 3,
        rupiah = number_string.substr(0, sisa),
        ribuan = number_string.substr(sisa).match(/\d{3}/g);

    if (ribuan) {
        let separator = sisa ? "." : "";
        rupiah += separator + ribuan.join(".");
    }

    return rupiah;
};

export const formatColumnTable = (columns: []) => {
    let formatColumnTable: string[] = columns.map((column: []) => {
        let data = column.toString();
        let pageTitle = String(data).split("_");

        let upperFirst = pageTitle[0].slice(0, 1).toUpperCase();
        let lowerFirst = pageTitle[0].slice(1).toLowerCase();
        let first = upperFirst + lowerFirst;

        let upperSecond = pageTitle[1]?.slice(0, 1).toUpperCase();
        let lowerSecond = pageTitle[1]?.slice(1).toLowerCase();
        let second = upperSecond + lowerSecond ? upperSecond + lowerSecond : "";

        let upperTrird = pageTitle[2]?.slice(0, 1).toUpperCase();
        let lowerTrird = pageTitle[2]?.slice(1).toLowerCase();
        let trird = upperTrird + lowerTrird ? upperTrird + lowerTrird : "";

        let formatColumnName = first + " " + second + " " + trird;
        return formatColumnName;
    });
    formatColumnTable.unshift("No");
    formatColumnTable.push("Action");

    return formatColumnTable;
};
