"use client";
import BackButton from "@/components/assets/backButton";
import axios from "@/lib/axios";
import { getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";
import "../../../../app/myStyle.css";
import SelectedActivation from "@/components/assets/selectedActivation";
import SelectedProduct from "@/components/assets/selectedProduct";
import SelectedOffice from "@/components/assets/selectedOffice";
import { formatPageTitle } from "@/lib/customFunction";

const CreateProductPerOfficePage = () => {
    // ************* Photo Config *************
    const inputRef1 = useRef<any>();
    const inputRef2 = useRef<any>();
    const inputRef3 = useRef<any>();

    // ************* ROUTE *************
    const router = useRouter();
    const pathName = usePathname();

    // Satup Title Per-Page
    let pageTitle = String(pathName).split("/");

    // ************* STATE *************
    const [loading, setLoading] = useState(false);
    const [image1, setImage1] = useState<any>();
    const [image2, setImage2] = useState<any>();
    const [image3, setImage3] = useState<any>();
    const [image1Value, setImage1Value] = useState<any>();
    const [image2Value, setImage2Value] = useState<any>();
    const [image3Value, setImage3Value] = useState<any>();
    const [fetchOfficeResponse, setFetchOfficeResponse] = useState("");
    const [fetchProductResponse, setFetchProductResponse] = useState("");
    // ************* Selected Component End *************
    const userEmail = getCookie("email");
    const [office_id, setOffice] = useState("");
    const [product_id, setProduct] = useState("");
    const [price, setPrice] = useState("");
    const [service_charge, setServiceCharge] = useState("");
    const [commission, setCommission] = useState("");
    const [status, setStatus] = useState("");
    // ************* STATE VALIDATION *************
    const [validateOffice, setValidateOffice] = useState("");
    const [validateProduct, setValidateProduct] = useState("");
    const [validatePrice, setValidatePrice] = useState("");
    const [validateServiceCharge, setValidateServiceCharge] = useState("");
    const [validateCommission, setValidateCommission] = useState("");
    const [validateStatus, setValidateStatus] = useState("");

    // ************* API *************
    const fetchOffice = async () => {
        try {
            setLoading(true);
            const dataResponse = await axios.get("/office/getAll");
            setFetchOfficeResponse(dataResponse.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const dataResponse = await axios.get("/product/getAll");
            setFetchProductResponse(dataResponse.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios
            .post("/product_per_office/store", {
                office_id,
                product_id,
                price,
                service_charge,
                commission,
                status,
                userEmail,
            })
            .then((response) => {
                Swal.fire({
                    title: "Data " + formatPageTitle(pageTitle[2]),
                    text: response.data.message,
                    icon: response.data.status,
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.push("/main/product_per_office");
                    }
                });
            })
            .catch((error) => {
                setValidateOffice(error.response.data.request.office_id);
                setValidateProduct(error.response.data.request.product_id);
                setValidatePrice(error.response.data.request.price);
                setValidateServiceCharge(
                    error.response.data.request.service_charge
                );
                setValidateCommission(error.response.data.request.commission);
                setValidateStatus(error.response.data.request.status);
            });
    };

    // ************* FUNCTION *************
    const handleSelectedOffice = (data: any) => {
        setOffice(data);
    };

    const handleSelectedProduct = (data: any) => {
        setProduct(data);
    };

    const handleSelectedStatus = (data: any) => {
        setStatus(data);
    };

    const handleImageClick1 = () => {
        inputRef1.current.click();
    };

    const handleImageClick2 = () => {
        inputRef2.current.click();
    };

    const handleImageClick3 = () => {
        inputRef3.current.click();
    };

    // ************* HOOK *************
    useEffect(() => {}, [
        loading,
        fetchOfficeResponse,
        fetchProductResponse,
        office_id,
        product_id,
        price,
        service_charge,
        price,
        commission,
        status,
        validateOffice,
        validateProduct,
        validatePrice,
        validateServiceCharge,
        validateCommission,
        validateStatus,
        image1,
        image2,
        image3,
        image1Value,
        image2Value,
        image3Value,
    ]);

    useEffect(() => {
        fetchOffice();
        fetchProduct();
    }, []);
    return (
        <div className="content-body">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <strong>
                                    Form add {formatPageTitle(pageTitle[2])}
                                </strong>
                                <BackButton />
                            </div>
                            <div className="card-body">
                                <div className="basic-form">
                                    <Form onSubmit={handleSubmit}>
                                        <div className="form-row">
                                            <Form.Group className="form-group col-md-6">
                                                <SelectedOffice
                                                    getOfficeId={
                                                        handleSelectedOffice
                                                    }
                                                    validateOffice={
                                                        validateOffice
                                                    }
                                                    defaultValue={office_id}
                                                    dataOffice={
                                                        fetchOfficeResponse
                                                    }
                                                    isLoading={loading}
                                                />
                                            </Form.Group>
                                            <Form.Group className="form-group col-md-6">
                                                <SelectedProduct
                                                    getProductId={
                                                        handleSelectedProduct
                                                    }
                                                    validateProduct={
                                                        validateProduct
                                                    }
                                                    defaultValue={product_id}
                                                    dataProduct={
                                                        fetchProductResponse
                                                    }
                                                    isLoading={loading}
                                                />
                                            </Form.Group>
                                            <Form.Group className="form-group col-md-6">
                                                <Form.Label>
                                                    Price{" "}
                                                    <span className="text-red">
                                                        *
                                                    </span>
                                                </Form.Label>
                                                {validatePrice && (
                                                    <p className="validation-custom">
                                                        {validatePrice}
                                                    </p>
                                                )}
                                                <Form.Control
                                                    type="number"
                                                    className={
                                                        "bg-text-custom " +
                                                        (validatePrice
                                                            ? "is-invalid"
                                                            : "")
                                                    }
                                                    placeholder="Input price (Number)"
                                                    style={{ color: "#0a2d3d" }}
                                                    value={price}
                                                    onChange={(event) =>
                                                        setPrice(
                                                            event.target.value
                                                        )
                                                    }
                                                />
                                            </Form.Group>
                                            <Form.Group className="form-group col-md-6">
                                                <Form.Label>
                                                    Service Charge (%)
                                                </Form.Label>
                                                {validateServiceCharge && (
                                                    <p className="validation-custom">
                                                        {validateServiceCharge}
                                                    </p>
                                                )}
                                                <Form.Control
                                                    type="number"
                                                    className={
                                                        "bg-text-custom " +
                                                        (validateServiceCharge
                                                            ? "is-invalid"
                                                            : "")
                                                    }
                                                    placeholder="Input service charge (Number)"
                                                    style={{ color: "#0a2d3d" }}
                                                    value={service_charge}
                                                    onChange={(event) =>
                                                        setServiceCharge(
                                                            event.target.value
                                                        )
                                                    }
                                                />
                                            </Form.Group>
                                            <Form.Group className="form-group col-md-6">
                                                <Form.Label>
                                                    Commission (%)
                                                </Form.Label>
                                                {validateCommission && (
                                                    <p className="validation-custom">
                                                        {validateCommission}
                                                    </p>
                                                )}
                                                <Form.Control
                                                    type="number"
                                                    className={
                                                        "bg-text-custom " +
                                                        (validateCommission
                                                            ? "is-invalid"
                                                            : "")
                                                    }
                                                    placeholder="Input commission (Number)"
                                                    style={{ color: "#0a2d3d" }}
                                                    value={commission}
                                                    onChange={(event) =>
                                                        setCommission(
                                                            event.target.value
                                                        )
                                                    }
                                                />
                                            </Form.Group>
                                            <Form.Group className="form-group col-md-6">
                                                <SelectedActivation
                                                    getActivationId={
                                                        handleSelectedStatus
                                                    }
                                                    validateActivation={
                                                        validateStatus
                                                    }
                                                    defaultValue={status}
                                                    isLoading={loading}
                                                />
                                            </Form.Group>
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-primary float-right"
                                        >
                                            Save
                                        </button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateProductPerOfficePage;
