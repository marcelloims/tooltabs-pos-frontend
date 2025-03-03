"use client";
import BackButton from "@/components/assets/backButton";
import axios from "@/lib/axios";
import { formatToCurrency } from "@/lib/customFunction";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type propsType = {
    productId: string;
};

interface Response<T> {
    code: number;
    response: ResponseFood;
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

const FoodDetailPage = (props: propsType) => {
    // ************* ROUTE *************
    const public_path = "http://127.0.0.1:8000/product/";
    // for route
    const router = useRouter();
    const pathName = usePathname();

    // destructuring props
    const { productId } = props;

    // ************* STATE *************
    const [fetchFood, setFetchFood] = useState<Response<ResponseFood>>();
    const [loading, setLoading] = useState(false);

    // Satup Title Per-Page
    let pageTitle = String(pathName).split("/");

    // ************* STATE *************
    const fetchDetailFoodMenu = async () => {
        try {
            setLoading(true);

            const dataResponse = await axios.get(`/pos/getFood/` + productId);
            setFetchFood(dataResponse.data);

            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {}, [loading, fetchFood]);

    useEffect(() => {
        fetchDetailFoodMenu();
    }, []);

    return (
        <div>
            <div className="content-body">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header">
                                    <strong>
                                        Welcome! this is Detail Food Menu{" "}
                                    </strong>
                                    <BackButton />
                                </div>
                                <div className="card-body">
                                    <div className="col-xl-12">
                                        <div
                                            id="carouselExampleIndicators"
                                            className="carousel slide"
                                            data-ride="carousel"
                                        >
                                            <ol className="carousel-indicators">
                                                <li
                                                    data-target="#carouselExampleIndicators"
                                                    data-slide-to="0"
                                                    className=""
                                                ></li>
                                                <li
                                                    data-target="#carouselExampleIndicators"
                                                    data-slide-to="1"
                                                    className=""
                                                ></li>
                                                <li
                                                    data-target="#carouselExampleIndicators"
                                                    data-slide-to="2"
                                                    className="active"
                                                ></li>
                                            </ol>
                                            <div className="carousel-inner">
                                                <div className="carousel-item">
                                                    <img
                                                        className="d-block w-100"
                                                        src={
                                                            public_path +
                                                            String(
                                                                fetchFood
                                                                    ?.response
                                                                    .image1
                                                            )
                                                        }
                                                        alt="First slide"
                                                    />
                                                </div>
                                                <div className="carousel-item">
                                                    <img
                                                        className="d-block w-100"
                                                        src={
                                                            public_path +
                                                            String(
                                                                fetchFood
                                                                    ?.response
                                                                    .image3
                                                            )
                                                        }
                                                        alt="Second slide"
                                                    />
                                                </div>
                                                <div className="carousel-item active">
                                                    <img
                                                        className="d-block w-100"
                                                        src={
                                                            public_path +
                                                            String(
                                                                fetchFood
                                                                    ?.response
                                                                    .image2
                                                            )
                                                        }
                                                        alt="Third slide"
                                                    />
                                                </div>
                                            </div>
                                            <a
                                                className="carousel-control-prev"
                                                href="#carouselExampleIndicators"
                                                data-slide="prev"
                                            >
                                                <span className="carousel-control-prev-icon"></span>{" "}
                                                <span className="sr-only">
                                                    Previous
                                                </span>{" "}
                                            </a>
                                            <a
                                                className="carousel-control-next"
                                                href="#carouselExampleIndicators"
                                                data-slide="next"
                                            >
                                                <span className="carousel-control-next-icon"></span>
                                                <span className="sr-only">
                                                    Next
                                                </span>
                                            </a>
                                        </div>
                                        <div className="card-header">
                                            <h5 className="card-title">
                                                {fetchFood?.response.name} |{" "}
                                                {formatToCurrency(
                                                    String(
                                                        fetchFood?.response
                                                            .price
                                                    )
                                                )}
                                            </h5>
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text">
                                                {
                                                    fetchFood?.response
                                                        .description
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row"></div>
                </div>
            </div>
        </div>
    );
};

export default FoodDetailPage;
