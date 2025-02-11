"use client";
import axios from "@/lib/axios";
import { formatToCurrency } from "@/lib/customFunction";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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

const FoodPage = () => {
    // ************* ROUTE *************
    const public_path = "http://127.0.0.1:8000/product/";
    // for route
    const router = useRouter();
    const pathName = usePathname();

    // ************* STATE *************
    const [fetchFood, setFetchFood] = useState<Response<ResponseFood>>();
    const [office_id, setOfficeId] = useState("");
    const [loading, setLoading] = useState(false);

    // Satup Title Per-Page
    let pageTitle = String(pathName).split("/");
    let officeCode = String(pageTitle[2]);
    let categoryName = String(pageTitle[3]);

    // ************* STATE *************
    const fetchFoodMenu = async () => {
        try {
            setLoading(true);

            const dataResponse = await axios.post(`/pos/getFood`, {
                officeCode,
                categoryName,
            });
            setFetchFood(dataResponse.data);

            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {}, [loading, fetchFood, office_id]);

    useEffect(() => {
        fetchFoodMenu();
    }, []);

    return (
        <div>
            <div className="content-body">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header">
                                    <strong>Welcome! this is Food Menu</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {fetchFood?.response.map((food, i: number) => (
                            <div
                                className="card mr-3 ml-3"
                                style={{ width: "24rem" }}
                                key={i}
                            >
                                <img
                                    src={public_path + food.image1}
                                    className="card-img-top"
                                    alt="..."
                                    style={{
                                        width: "300px",
                                        height: "300px",
                                        margin: "auto",
                                        marginTop: "30px",
                                    }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <b>{food.name}</b>
                                    </h5>
                                    <h5 className="card-title">
                                        {formatToCurrency(food.price)}
                                    </h5>
                                    <a
                                        href={"/pos/sgv/food/detail/" + food.id}
                                        className="btn btn-sm btn-primary mr-1"
                                    >
                                        Detail
                                    </a>
                                    <a
                                        href="#"
                                        className="btn btn-sm btn-success"
                                    >
                                        Add to Cart
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodPage;
