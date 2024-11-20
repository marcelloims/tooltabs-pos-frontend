"use client";
import axios from "@/lib/axios";
import {
    faEdit,
    faTrash,
    faArrowUpLong,
    faArrowDownLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import LoaderTreeCircles from "./loaderTreeCircles";

type propsType = {
    urlFetch: string;
    columns: any;
};

interface Response {
    code: number;
    response: Entity;
    status: string;
}

interface Entity {
    current_page: number;
    data: [];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: [];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
}

const Gird = (props: propsType) => {
    // for route
    const router = useRouter();

    // State
    const [loading, setLoading] = useState(false);
    const [fetchResponse, setFetchResponse] = useState<Response>();
    const [perPage, setPerPage] = useState(2);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState([]);

    // Props
    const { urlFetch, columns } = props;

    // Format Font UpperCase
    let formatColumnTable: string[] = columns.map((column: any) => {
        let data = column.toString();
        let upper = data.slice(0, 1).toUpperCase();
        let lower = data.slice(1).toLowerCase();
        let formatColumn = upper + lower;
        return formatColumn;
    });

    formatColumnTable.unshift("No");
    formatColumnTable.push("Action");

    const fetchData = async (
        perPage: any,
        search: any,
        columns: any,
        paging?: any,
        sorting?: any
    ) => {
        try {
            setLoading(true);

            const dataResponse = await axios.get(!paging ? urlFetch : paging, {
                params: {
                    perPage,
                    search,
                    columns,
                    sorting,
                },
            });

            setLoading(false);
            setFetchResponse(dataResponse.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {}, [fetchResponse]);

    useEffect(() => {
        fetchData(perPage, search, columns);
    }, []);

    return (
        <div className="table-responsive mt-3">
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Data Office</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <div className="float-lleft" id="perPage">
                            <label>
                                Show{" "}
                                <select
                                    name="perPage"
                                    value={perPage}
                                    aria-controls="example"
                                    className=""
                                    onChange={(event: any) => {
                                        setPerPage(event.target.value);
                                        fetchData(
                                            event.target.value,
                                            search,
                                            columns
                                        );
                                    }}
                                >
                                    <option value="2">2</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>{" "}
                                entries
                            </label>
                        </div>
                        <div id="search" className="float-right">
                            <label>
                                Search:
                                <input
                                    name="search"
                                    type="text"
                                    className="form-control"
                                    style={{ color: "#0a2d3d" }}
                                    placeholder="Keyword"
                                    onChange={(event: any) => {
                                        setSearch(event.target.value);
                                        fetchData(
                                            perPage,
                                            event.target.value,
                                            columns
                                        );
                                    }}
                                    value={search}
                                />
                            </label>
                        </div>
                        {loading ? (
                            <LoaderTreeCircles />
                        ) : (
                            <table className="table table-bordered verticle-middle table-responsive-sm">
                                <thead>
                                    <tr className="text-center">
                                        {formatColumnTable.map(
                                            (column: any, i: any) => (
                                                <th
                                                    scope="col"
                                                    key={i}
                                                    className="text-nowrap"
                                                    onClick={() => {
                                                        if (!sort) {
                                                            let dataSort: any =
                                                                ["asc", column];
                                                            setSort(dataSort);
                                                            fetchData(
                                                                perPage,
                                                                search,
                                                                columns,
                                                                null,
                                                                dataSort
                                                            );
                                                        }

                                                        if (sort[0] === "asc") {
                                                            let dataSort: any =
                                                                [
                                                                    "desc",
                                                                    column,
                                                                ];
                                                            setSort(dataSort);
                                                            fetchData(
                                                                perPage,
                                                                search,
                                                                columns,
                                                                null,
                                                                dataSort
                                                            );
                                                        } else {
                                                            let dataSort: any =
                                                                ["asc", column];
                                                            setSort(dataSort);
                                                            fetchData(
                                                                perPage,
                                                                search,
                                                                columns,
                                                                null,
                                                                dataSort
                                                            );
                                                        }
                                                    }}
                                                >
                                                    {column}
                                                    {" " + sort.length}
                                                    {column != "No" &&
                                                        column != "Action" &&
                                                        sort.length != 0 &&
                                                        sort[0] === "asc" &&
                                                        sort[1] === column && (
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faArrowUpLong
                                                                }
                                                                className="mr-1"
                                                            />
                                                        )}
                                                    {column != "No" &&
                                                        column != "Action" &&
                                                        sort.length != 0 &&
                                                        sort[0] === "desc" &&
                                                        sort[1] === column && (
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faArrowDownLong
                                                                }
                                                                className="mr-1"
                                                            />
                                                        )}
                                                </th>
                                            )
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="justify-content-center">
                                    {fetchResponse?.response.data.map(
                                        (data: any, i: number) => (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{data.code}</td>
                                                <td>{data.name}</td>
                                                <td>{data.email}</td>
                                                <td>{data.phone}</td>
                                                <td className="text-nowrap">
                                                    <FontAwesomeIcon
                                                        icon={faEdit}
                                                        className="btn btn-sm btn-warning mr-1"
                                                    />
                                                    <FontAwesomeIcon
                                                        icon={faTrash}
                                                        className="btn btn-sm btn-danger ml-1"
                                                    />
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <nav className="mt-3">
                        <div style={{ float: "right" }}>
                            {fetchResponse?.response.to} of{" "}
                            {fetchResponse?.response.total} entries
                        </div>
                        <div
                            className="pagination pagination-gutter pagination-primary no-bg"
                            style={{ float: "right" }}
                        >
                            {fetchResponse?.response.links.map(
                                (per_page: any, id: number) => (
                                    <li
                                        key={id}
                                        className={
                                            per_page.active === true
                                                ? "page-item active"
                                                : "page-item"
                                        }
                                    >
                                        <a
                                            className="page-link"
                                            onClick={() => {
                                                fetchData(
                                                    perPage,
                                                    search,
                                                    columns,
                                                    per_page.url
                                                );
                                            }}
                                            // href={per_page.url}
                                        >
                                            {per_page.label}
                                        </a>
                                    </li>
                                )
                            )}
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Gird;
