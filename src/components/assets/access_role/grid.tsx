"use client";
import axios from "@/lib/axios";
import {
    faEdit,
    faTrash,
    faArrowUpLong,
    faArrowDownLong,
    faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import LoaderTreeCircles from "../loaderTreeCircles";
import Swal from "sweetalert2";
import { getCookie } from "cookies-next";
import { formatColumnTable, formatPageTitle } from "@/lib/customFunction";

type propsType = {
    urlFetch: string;
    urlDelete: string;
    columns: any;
    urlRoute: string;
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

const Grid = (props: propsType) => {
    // for route
    const router = useRouter();
    const pathName = usePathname();

    // State
    const [loading, setLoading] = useState(false);
    const [fetchResponse, setFetchResponse] = useState<Response>();
    const [perPage, setPerPage] = useState(10);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState([]);
    const [pagination, setPagination] = useState("");

    // Satup Title Per-Page
    let pageTitle = String(pathName).split("/");
    let userTenantId = getCookie("tenant_id");

    // Props
    const { urlFetch, urlDelete, columns, urlRoute } = props;

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
                    pagination,
                    sorting,
                    userTenantId,
                },
            });

            setLoading(false);
            setFetchResponse(dataResponse.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handlerDelete = async (dataId: any) => {
        const swalWithBootstrapButtons = await Swal.mixin({
            customClass: {
                cancelButton: "btn btn-danger",
                confirmButton: "btn btn-success",
            },
            buttonsStyling: false,
        });
        swalWithBootstrapButtons
            .fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    axios
                        .delete(urlDelete + dataId)
                        .then((response) => {
                            Swal.fire({
                                title: "Data " + formatPageTitle(pageTitle[2]),
                                text: response.data.message,
                                icon: response.data.status,
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    fetchData(perPage, search, columns);
                                }
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire({
                        title: "Cancelled",
                        text: "Your file is safe!",
                        icon: "error",
                    });
                }
            });
    };

    useEffect(() => {}, [fetchResponse]);

    useEffect(() => {
        fetchData(perPage, search, columns);
    }, []);

    return (
        <div className="table-responsive mt-3">
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">
                        Data {formatPageTitle(pageTitle[2])}
                    </h4>
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
                                    <option value="10">10</option>
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
                                            columns,
                                            null,
                                            sort
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
                                        {formatColumnTable(columns).map(
                                            (column: any, i: any) => (
                                                <th
                                                    scope="col"
                                                    key={i}
                                                    className="text-nowrap"
                                                    onClick={() => {
                                                        if (
                                                            column === "No" ||
                                                            column ===
                                                                "Office Name" ||
                                                            column === "Action"
                                                        ) {
                                                            return;
                                                        } else {
                                                            if (!sort) {
                                                                let dataSort: any =
                                                                    [
                                                                        "asc",
                                                                        column,
                                                                    ];
                                                                setSort(
                                                                    dataSort
                                                                );
                                                                fetchData(
                                                                    perPage,
                                                                    search,
                                                                    columns,
                                                                    pagination,
                                                                    dataSort
                                                                );
                                                            }

                                                            if (
                                                                sort[0] ===
                                                                "asc"
                                                            ) {
                                                                let dataSort: any =
                                                                    [
                                                                        "desc",
                                                                        column,
                                                                    ];
                                                                setSort(
                                                                    dataSort
                                                                );
                                                                fetchData(
                                                                    perPage,
                                                                    search,
                                                                    columns,
                                                                    pagination,
                                                                    dataSort
                                                                );
                                                            } else {
                                                                let dataSort: any =
                                                                    [
                                                                        "asc",
                                                                        column,
                                                                    ];
                                                                setSort(
                                                                    dataSort
                                                                );
                                                                fetchData(
                                                                    perPage,
                                                                    search,
                                                                    columns,
                                                                    pagination,
                                                                    dataSort
                                                                );
                                                            }
                                                        }
                                                    }}
                                                >
                                                    {formatPageTitle(column)}{" "}
                                                    {column != "No" &&
                                                        column !=
                                                            "Office Name" &&
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
                                                        column !=
                                                            "Office Name" &&
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
                                                <td className="text-center">
                                                    {i + 1}
                                                </td>
                                                <td>{data.permission_name}</td>
                                                <td>{data.office_name}</td>
                                                <td className="text-nowrap text-center">
                                                    <FontAwesomeIcon
                                                        icon={faEdit}
                                                        className="btn btn-sm btn-warning mr-1"
                                                        onClick={() => {
                                                            router.push(
                                                                urlRoute +
                                                                    "edit/" +
                                                                    data.id
                                                            );
                                                        }}
                                                    />
                                                    <FontAwesomeIcon
                                                        icon={faTrash}
                                                        className="btn btn-sm btn-danger ml-1"
                                                        onClick={() => {
                                                            handlerDelete(
                                                                data.id
                                                            );
                                                        }}
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
                                                setPagination(per_page.url);
                                                fetchData(
                                                    perPage,
                                                    search,
                                                    columns,
                                                    per_page.url,
                                                    sort
                                                );
                                            }}
                                            dangerouslySetInnerHTML={{
                                                __html: per_page.label,
                                            }}
                                        ></a>
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

export default Grid;
