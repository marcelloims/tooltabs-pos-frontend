"use client";
import React, { SyntheticEvent, useEffect, useState } from "react";
import DataTable from "react-data-table-component";

type propsType = {
    fetch: any;
    columns: any;
};

const Table = (props: propsType) => {
    // State
    const [data, setData] = useState(null);
    const [search, setSearch] = useState(null);

    // Props
    const { fetch, columns } = props;

    const handleChange = (e: SyntheticEvent) => {};

    useEffect(() => {
        // setData(fetch.response.data.map((data: any) => data));
        console.log(columns, fetch);
    }, []);

    // const columns = [
    //     {
    //         name: "ID",
    //         selector: (row) => row.id,
    //         sortable: true,
    //     },
    //     {
    //         name: "Full Name",
    //         selector: (row) => row.fullName,
    //         sortable: true,
    //     },
    //     {
    //         name: "Height",
    //         selector: (row) => row.height,
    //         sortable: true,
    //     },
    //     {
    //         name: "Weight",
    //         selector: (row) => row.weight,
    //         sortable: true,
    //     },
    // ];

    // const rows = [
    //     {
    //         id: 1,
    //         fullName: "John Doe",
    //         height: "1.75m",
    //         weight: "89kg",
    //     },
    //     {
    //         id: 2,
    //         fullName: "Jane Doe",
    //         height: "1.64m",
    //         weight: "55kg",
    //     },
    //     {
    //         id: 3,
    //         fullName: "Sheera Maine",
    //         height: "1.69m",
    //         weight: "74kg",
    //     },
    //     {
    //         id: 4,
    //         fullName: "Sheera Maine",
    //         height: "1.69m",
    //         weight: "74kg",
    //     },
    //     {
    //         id: 5,
    //         fullName: "Sheera Maine",
    //         height: "1.69m",
    //         weight: "74kg",
    //     },
    //     {
    //         id: 6,
    //         fullName: "Sheera Maine",
    //         height: "1.69m",
    //         weight: "74kg",
    //     },
    //     {
    //         id: 7,
    //         fullName: "Sheera Maine",
    //         height: "1.69m",
    //         weight: "74kg",
    //     },
    //     {
    //         id: 8,
    //         fullName: "Sheera Maine",
    //         height: "1.69m",
    //         weight: "74kg",
    //     },
    //     {
    //         id: 9,
    //         fullName: "Sheera Maine",
    //         height: "1.69m",
    //         weight: "74kg",
    //     },
    //     {
    //         id: 10,
    //         fullName: "Sheera Maine",
    //         height: "1.69m",
    //         weight: "74kg",
    //     },
    //     {
    //         id: 11,
    //         fullName: "Sheera Maine",
    //         height: "1.69m",
    //         weight: "74kg",
    //     },
    //     {
    //         id: 12,
    //         fullName: "Sheera Maine",
    //         height: "1.69m",
    //         weight: "74kg",
    //     },
    //     {
    //         id: 13,
    //         fullName: "Sheera Maine",
    //         height: "1.69m",
    //         weight: "74kg",
    //     },
    //     {
    //         id: 14,
    //         fullName: "Sheera Maine",
    //         height: "1.69m",
    //         weight: "74kg",
    //     },
    //     {
    //         id: 15,
    //         fullName: "Sheera Maine",
    //         height: "1.69m",
    //         weight: "74kg",
    //     },
    // ];

    return (
        <>
            <div className="container my-5">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    style={{
                        width: "250px",
                        textAlign: "center",
                        float: "right",
                        color: "#0a2d3d",
                    }}
                    onChange={handleChange}
                />
                {/* <DataTable columns={columns} data={data} pagination /> */}
            </div>
        </>
    );
};

export default Table;
