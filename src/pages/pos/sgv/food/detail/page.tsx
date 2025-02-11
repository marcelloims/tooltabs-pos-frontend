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
                                    <strong>
                                        Welcome! this is Detail Food Menu{" "}
                                    </strong>
                                    <BackButton />
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
