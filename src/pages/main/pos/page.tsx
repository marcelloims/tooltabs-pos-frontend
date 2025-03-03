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
    const [qtyOrder, setQtyOrder] = useState(0);
    const [loading, setLoading] = useState(false);

    // Satup Variable
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

    useEffect(() => {}, [loading, fetchMenu, category_id, qtyOrder]);

    useEffect(() => {
        fetchFirstMenu();
    }, []);
    return (
        <CartProvider>
            <div>
                <div className="content-body">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-8">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="card">
                                            <div className="card-header">
                                                <strong>
                                                    Welcome! this is POS Menu
                                                </strong>
                                            </div>
                                            <div className="card-body">
                                                <div className="col-6">
                                                    <Form.Label>
                                                        Category Menu
                                                    </Form.Label>
                                                    <Form.Select
                                                        value={category_id}
                                                        onChange={(
                                                            event: any
                                                        ) => {
                                                            setCategoryId(
                                                                event.target
                                                                    .value
                                                            );
                                                            changeMenu(
                                                                event.target
                                                                    .value
                                                            );
                                                        }}
                                                        style={{
                                                            color: "#0a2d3d",
                                                        }}
                                                    >
                                                        <option value="1">
                                                            Food
                                                        </option>
                                                        <option value="2">
                                                            Beverage
                                                        </option>
                                                        <option value="3">
                                                            Jiuce
                                                        </option>
                                                        <option value="4">
                                                            Dessert
                                                        </option>
                                                    </Form.Select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row py-4">
                                    {fetchMenu?.response.map((menu) => (
                                        <ItemCart
                                            id={menu.id}
                                            image1={public_path + menu.image1}
                                            name={menu.name}
                                            price={menu.price}
                                            item={menu}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="col-4">
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
