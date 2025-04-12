"use client";
import React, { useEffect, useState } from "react";
import ItemCart from "./ItemCart";
import axios from "@/lib/axios";
import { Form } from "react-bootstrap";
import { getCookie } from "cookies-next";
import { CartProvider } from "react-use-cart";
import CartPage from "./Cart";

interface Response<T> {
    code: number;
    response: T[];
    status: string;
}

interface ResponseFood {
    id: number;
    pcode: string;
    name: string;
    description: string;
    unit: string;
    tax: number;
    status: string;
    office_id: number;
    price: string;
    service_charge: number;
    commission: number;
    image1: string;
    image2: string;
    image3: string;
}

const PosPage = () => {
    // ************* ROUTE *************
    const public_path = "http://127.0.0.1:8000/product/";

    // ************* STATE *************
    const [fetchMenu, setFetchMenu] = useState<Response<ResponseFood>>();
    const [category_id, setCategoryId] = useState(1);
    const [loading, setLoading] = useState(false);
    const [fetchCategoryResponse, setFetchCategoryResponse] =
        useState<Response<ResponseFood>>();
    const [search, setSearch] = useState("");

    // Satup Variable
    let tenantId = getCookie("tenant_id");
    let officeId = getCookie("office_id");

    // ************* FUNCTION *************
    const fetchFirstMenu = async () => {
        try {
            setLoading(true);

            const dataResponse = await axios.post(`/pos/getFood`, {
                officeId,
                category_id,
            });
            setFetchMenu(dataResponse.data);

            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCategory = async () => {
        try {
            setLoading(true);

            const dataResponse = await axios.get(`/pos/getCategory`, {
                params: {
                    tenantId,
                    officeId,
                },
            });
            setFetchCategoryResponse(dataResponse.data);

            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const changeMenu = async (category_id: string) => {
        try {
            setLoading(true);

            const dataResponse = await axios.post(`/pos/getFood`, {
                officeId,
                category_id,
            });
            setFetchMenu(dataResponse.data);

            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const searchMenu = async (keyword: string) => {
        try {
            setLoading(true);

            const dataResponse = await axios.post(`/pos/searchFood`, {
                keyword,
                officeId,
            });
            setFetchMenu(dataResponse.data);

            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        console.log(search, "test");
    }, [loading, fetchMenu, category_id, fetchCategoryResponse, search]);

    useEffect(() => {
        fetchCategory();
        fetchFirstMenu();
    }, []);
    return (
        <CartProvider>
            <div>
                <div className="content-body">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-7">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="card">
                                            <div className="card-header">
                                                <strong>
                                                    Welcome! this is POS Menu
                                                </strong>
                                            </div>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-6">
                                                        <Form.Group>
                                                            <Form.Label>
                                                                Category Menu
                                                            </Form.Label>
                                                            <Form.Select
                                                                value={
                                                                    category_id
                                                                }
                                                                onChange={(
                                                                    event: any
                                                                ) => {
                                                                    setCategoryId(
                                                                        event
                                                                            .target
                                                                            .value
                                                                    );
                                                                    changeMenu(
                                                                        event
                                                                            .target
                                                                            .value
                                                                    );
                                                                }}
                                                                className="mb-3"
                                                                style={{
                                                                    color: "#0a2d3d",
                                                                }}
                                                            >
                                                                {fetchCategoryResponse?.response.map(
                                                                    (
                                                                        category,
                                                                        i
                                                                    ) => (
                                                                        <option
                                                                            key={
                                                                                i
                                                                            }
                                                                            value={
                                                                                category.id
                                                                            }
                                                                        >
                                                                            {
                                                                                category.name
                                                                            }
                                                                        </option>
                                                                    )
                                                                )}
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </div>
                                                    <div className="col-6">
                                                        <Form.Group>
                                                            <Form.Label>
                                                                Search
                                                            </Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                className={
                                                                    "bg-text-custom "
                                                                }
                                                                placeholder="Search your menu"
                                                                style={{
                                                                    color: "#0a2d3d",
                                                                }}
                                                                value={search}
                                                                onChange={(
                                                                    event: any
                                                                ) => {
                                                                    setSearch(
                                                                        event
                                                                            .target
                                                                            .value
                                                                    );
                                                                    searchMenu(
                                                                        event
                                                                            .target
                                                                            .value
                                                                    );
                                                                }}
                                                            />
                                                        </Form.Group>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row py-2">
                                    {fetchMenu?.response.map((menu) => (
                                        <ItemCart
                                            key={menu.id}
                                            id={menu.id}
                                            image1={public_path + menu.image1}
                                            name={menu.name}
                                            price={menu.price}
                                            item={menu}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="col-5">
                                <CartPage />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CartProvider>
    );
};

export default PosPage;
