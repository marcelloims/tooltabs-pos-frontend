"use client";
import BackButton from "@/components/assets/backButton";
import axios from "@/lib/axios";
import { getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";
import "../../../../app/myStyle.css";
import SelectedActivation from "@/components/assets/selectedActivation";
import SelectedOffice from "@/components/assets/selectedOffice";
import SelectedProduct from "@/components/assets/selectedProduct";
import { formatPageTitle } from "@/lib/customFunction";

type propsType = {
    productPerOfficeId: string;
};

const EditProductPerOfficePage = (props: propsType) => {
    // ************* ROUTE *************
    const router = useRouter();
    const pathName = usePathname();

    // destructuring props
    const { productPerOfficeId } = props;

    // Satup Title Per-Page
    let pageTitle = String(pathName).split("/");

    // ************* STATE *************
    const [loading, setLoading] = useState(false);
    const [fetchOfficeResponse, setFetchOfficeResponse] = useState("");
    const [fetchProductResponse, setFetchProductResponse] = useState("");
    const [dataHeader, setDataHeader] = useState<any>();
    // ************* Selected Component End *************
    const userEmail = getCookie("email");
    const [id, setProductPerOfficeid] = useState(productPerOfficeId);
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
    const fetchEdit = async () => {
        try {
            const dataResponse = await axios.get(
                `/product_per_office/edit/${productPerOfficeId}`
            );

            console.log(dataResponse.data.response, "test");

            setDataHeader(dataResponse.data.response);
            setOffice(dataResponse.data.response.office_id);
            setProduct(dataResponse.data.response.product_id);
            setPrice(dataResponse.data.response.price);
            setServiceCharge(dataResponse.data.response.service_charge);
            setCommission(dataResponse.data.response.commission);
            setStatus(dataResponse.data.response.product_per_office_status);
        } catch (error) {
            console.log(error);
        }
    };

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
            .put("/product_per_office/update", {
                id,
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

    // ************* HOOK *************
    useEffect(() => {
        console.log(status, "status");
    }, [
        loading,
        id,
        fetchOfficeResponse,
        fetchProductResponse,
        dataHeader,
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
    ]);

    useEffect(() => {
        fetchEdit();
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
                                    Form edit {formatPageTitle(pageTitle[2])}
                                </strong>
                                <BackButton />
                            </div>
                            <div className="card-body">
                                <div className="card-header alert alert-primary alert-dismissible fade show">
                                    <strong>Data Product</strong>
                                </div>
                                <div className="card-body alert alert-primary alert-dismissible fade show mb-3 mt-3">
                                    <div className="row">
                                        <Form.Group className="form-group col-md-3">
                                            <Form.Label
                                                style={{ color: "#0a2d3d" }}
                                            >
                                                Pcode
                                            </Form.Label>
                                            <div
                                                className="alert alert-light alert-dismissible fade show"
                                                style={{ color: "#0a2d3d" }}
                                            >
                                                {dataHeader?.product_pcode}
                                            </div>
                                        </Form.Group>
                                        <Form.Group className="form-group col-md-9">
                                            <Form.Label
                                                style={{ color: "#0a2d3d" }}
                                            >
                                                Product Name
                                            </Form.Label>
                                            <div
                                                className="alert alert-light alert-dismissible fade show"
                                                style={{ color: "#0a2d3d" }}
                                            >
                                                {dataHeader?.product_name}
                                            </div>
                                        </Form.Group>
                                        <Form.Group className="form-group col-md-3">
                                            <Form.Label
                                                style={{ color: "#0a2d3d" }}
                                            >
                                                Unit
                                            </Form.Label>
                                            <div
                                                className="alert alert-light alert-dismissible fade show"
                                                style={{ color: "#0a2d3d" }}
                                            >
                                                {dataHeader?.product_unit}
                                            </div>
                                        </Form.Group>
                                        <Form.Group className="form-group col-md-3">
                                            <Form.Label
                                                style={{ color: "#0a2d3d" }}
                                            >
                                                Category
                                            </Form.Label>
                                            <div
                                                className="alert alert-light alert-dismissible fade show"
                                                style={{ color: "#0a2d3d" }}
                                            >
                                                {dataHeader?.category_name}
                                            </div>
                                        </Form.Group>
                                        <Form.Group className="form-group col-md-3">
                                            <Form.Label
                                                style={{ color: "#0a2d3d" }}
                                            >
                                                Type
                                            </Form.Label>
                                            <div
                                                className="alert alert-light alert-dismissible fade show"
                                                style={{ color: "#0a2d3d" }}
                                            >
                                                {dataHeader?.type_name}
                                            </div>
                                        </Form.Group>
                                        <Form.Group className="form-group col-md-3">
                                            <Form.Label
                                                style={{ color: "#0a2d3d" }}
                                            >
                                                Product Status
                                            </Form.Label>
                                            <div
                                                className="alert alert-light alert-dismissible fade show"
                                                style={{ color: "#0a2d3d" }}
                                            >
                                                {dataHeader?.product_status}
                                            </div>
                                        </Form.Group>
                                        <Form.Group className="form-group col-md-3">
                                            <Form.Label
                                                style={{ color: "#0a2d3d" }}
                                            >
                                                Height (cm)
                                            </Form.Label>
                                            <div
                                                className="alert alert-light alert-dismissible fade show"
                                                style={{ color: "#0a2d3d" }}
                                            >
                                                {dataHeader?.product_hight_cm}
                                            </div>
                                        </Form.Group>
                                        <Form.Group className="form-group col-md-3">
                                            <Form.Label
                                                style={{ color: "#0a2d3d" }}
                                            >
                                                Width (cm)
                                            </Form.Label>
                                            <div
                                                className="alert alert-light alert-dismissible fade show"
                                                style={{ color: "#0a2d3d" }}
                                            >
                                                {dataHeader?.product_width_cm}
                                            </div>
                                        </Form.Group>
                                        <Form.Group className="form-group col-md-3">
                                            <Form.Label
                                                style={{ color: "#0a2d3d" }}
                                            >
                                                Long (cm)
                                            </Form.Label>
                                            <div
                                                className="alert alert-light alert-dismissible fade show"
                                                style={{ color: "#0a2d3d" }}
                                            >
                                                {dataHeader?.product_long_cm}
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>
                                <hr className="mb-3 mt-3" />
                                <div className="card-header alert alert-primary alert-dismissible fade show">
                                    <strong>
                                        Edit {formatPageTitle(pageTitle[2])}
                                    </strong>
                                </div>
                                <Form onSubmit={handleSubmit}>
                                    <div className="form-row">
                                        <Form.Group className="form-group col-md-6">
                                            <SelectedOffice
                                                getOfficeId={
                                                    handleSelectedOffice
                                                }
                                                validateOffice={validateOffice}
                                                defaultValue={office_id}
                                                dataOffice={fetchOfficeResponse}
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
                                            <Form.Label>Price</Form.Label>
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
                                                    setPrice(event.target.value)
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
    );
};

export default EditProductPerOfficePage;
