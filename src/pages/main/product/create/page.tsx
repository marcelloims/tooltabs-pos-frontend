"use client";
import BackButton from "@/components/assets/backButton";
import axios from "@/lib/axios";
import { getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";
import "../../../../app/myStyle.css";
import SelectedCategori from "@/components/assets/selectedCategory";
import SelectedType from "@/components/assets/selectedType";
import SelectedActivation from "@/components/assets/selectedActivation";

const CreateProductPage = () => {
    // ************* ROUTE *************
    const router = useRouter();
    const pathName = usePathname();

    // Satup Title Per-Page
    let pageTitle = String(pathName).split("/");

    // ************* STATE *************
    const [loading, setLoading] = useState(false);
    const [fetchCategoryResponse, setFetchCategoryResponse] = useState("");
    const [fetchTypeResponse, setFetchTypeResponse] = useState("");
    const [category_id, setCategory] = useState("");
    const [type_id, setType] = useState("");
    const [validateCategory, setValidateCategory] = useState("");
    const [validateType, setValidateType] = useState("");
    // ************* Selected Component End *************
    const userEmail = getCookie("email");
    const [pcode, setPcode] = useState("");
    const [name, setName] = useState("");
    const [unit, setUnit] = useState("");
    const [brand_code, setBrandCode] = useState("");
    const [hight_cm, setHightCm] = useState("");
    const [width_cm, setWidthCm] = useState("");
    const [long_cm, setLongCm] = useState("");
    const [tax, setTax] = useState("");
    const [status, setStatus] = useState("");
    // ************* STATE VALIDATION *************
    const [validatePcode, setValidatePcode] = useState("");
    const [validateName, setValidateName] = useState("");
    const [validateUnit, setValidateUnit] = useState("");
    const [validateBrandCode, setValidateBrandCode] = useState("");
    const [validateHightCm, setValidateHightCm] = useState("");
    const [validateWidthCm, setValidateWidthCm] = useState("");
    const [validateLongCm, setValidateLongCm] = useState("");
    const [validateTax, setValidateTax] = useState("");
    const [validateStatus, setValidateStatus] = useState("");

    // ************* API *************
    const fetchCategory = async () => {
        try {
            setLoading(true);
            const dataResponse = await axios.get("/category/getAll");
            setFetchCategoryResponse(dataResponse.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchType = async () => {
        try {
            setLoading(true);
            const dataResponse = await axios.get("/type/getAll");
            setFetchTypeResponse(dataResponse.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios
            .post("/product/store", {
                category_id,
                type_id,
                pcode,
                name,
                unit,
                brand_code,
                hight_cm,
                width_cm,
                long_cm,
                tax,
                status,
                userEmail,
            })
            .then((response) => {
                Swal.fire({
                    title: "Data " + pageTitle[2],
                    text: response.data.message,
                    icon: response.data.status,
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.push("/main/product");
                    }
                });
            })
            .catch((error) => {
                setValidateCategory(error.response.data.request.category_id);
                setValidateType(error.response.data.request.type_id);
                setValidatePcode(error.response.data.request.pcode);
                setValidateName(error.response.data.request.name);
                setValidateUnit(error.response.data.request.unit);
                setValidateBrandCode(error.response.data.request.brand_code);
                setValidateHightCm(error.response.data.request.hight_cm);
                setValidateWidthCm(error.response.data.request.width_cm);
                setValidateLongCm(error.response.data.request.long_cm);
                setValidateTax(error.response.data.request.tax);
                setValidateStatus(error.response.data.request.status);
            });
    };

    // ************* FUNCTION *************
    const handleSelectedCategory = (data: any) => {
        setCategory(data);
    };

    const handleSelectedType = (data: any) => {
        setType(data);
    };

    const handleSelectedStatus = (data: any) => {
        setStatus(data);
    };

    // ************* HOOK *************
    useEffect(() => {}, [loading, fetchCategoryResponse, category_id]);

    useEffect(() => {
        fetchCategory();
        fetchType();
    }, []);
    return (
        <div className="content-body">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <strong>Form add {pageTitle[2]}</strong>
                                <BackButton />
                            </div>
                            <div className="card-body">
                                <div className="basic-form">
                                    <Form onSubmit={handleSubmit}>
                                        <div className="form-row">
                                            <Form.Group className="form-group col-md-6">
                                                <SelectedCategori
                                                    getCategoryId={
                                                        handleSelectedCategory
                                                    }
                                                    validateCategory={
                                                        validateCategory
                                                    }
                                                    defaultValue={category_id}
                                                    dataCategory={
                                                        fetchCategoryResponse
                                                    }
                                                    isLoading={loading}
                                                />
                                            </Form.Group>
                                            <Form.Group className="form-group col-md-6">
                                                <SelectedType
                                                    getTypeId={
                                                        handleSelectedType
                                                    }
                                                    validateType={validateType}
                                                    defaultValue={type_id}
                                                    dataType={fetchTypeResponse}
                                                    isLoading={loading}
                                                />
                                            </Form.Group>
                                            <Form.Group className="form-group col-md-6">
                                                <Form.Label>Pcode</Form.Label>
                                                {validatePcode && (
                                                    <p className="validation-custom">
                                                        {validatePcode}
                                                    </p>
                                                )}
                                                <Form.Control
                                                    type="text"
                                                    className={
                                                        "bg-text-custom " +
                                                        (validatePcode
                                                            ? "is-invalid"
                                                            : "")
                                                    }
                                                    placeholder="Input code pcode"
                                                    style={{ color: "#0a2d3d" }}
                                                    value={pcode}
                                                    onChange={(event) =>
                                                        setPcode(
                                                            event.target.value
                                                        )
                                                    }
                                                />
                                            </Form.Group>
                                            <Form.Group className="form-group col-md-6">
                                                <Form.Label>Name</Form.Label>
                                                {validateName && (
                                                    <p className="validation-custom">
                                                        {validateName}
                                                    </p>
                                                )}
                                                <Form.Control
                                                    type="text"
                                                    className={
                                                        "bg-text-custom " +
                                                        (validateName
                                                            ? "is-invalid"
                                                            : "")
                                                    }
                                                    placeholder="Input code name"
                                                    style={{ color: "#0a2d3d" }}
                                                    value={name}
                                                    onChange={(event) =>
                                                        setName(
                                                            event.target.value
                                                        )
                                                    }
                                                />
                                            </Form.Group>
                                            <Form.Group className="form-group col-md-6">
                                                <Form.Label>Unit</Form.Label>
                                                {validateUnit && (
                                                    <p className="validation-custom">
                                                        {validateUnit}
                                                    </p>
                                                )}
                                                <Form.Control
                                                    type="text"
                                                    className={
                                                        "bg-text-custom " +
                                                        (validateUnit
                                                            ? "is-invalid"
                                                            : "")
                                                    }
                                                    placeholder="Input code unit"
                                                    style={{ color: "#0a2d3d" }}
                                                    value={unit}
                                                    onChange={(event) =>
                                                        setUnit(
                                                            event.target.value
                                                        )
                                                    }
                                                />
                                            </Form.Group>
                                            <Form.Group className="form-group col-md-6">
                                                <Form.Label>
                                                    Brand Code
                                                </Form.Label>
                                                {validateBrandCode && (
                                                    <p className="validation-custom">
                                                        {validateBrandCode}
                                                    </p>
                                                )}
                                                <Form.Control
                                                    type="text"
                                                    className={
                                                        "bg-text-custom " +
                                                        (validateBrandCode
                                                            ? "is-invalid"
                                                            : "")
                                                    }
                                                    placeholder="Input code brand code"
                                                    style={{ color: "#0a2d3d" }}
                                                    value={brand_code}
                                                    onChange={(event) =>
                                                        setBrandCode(
                                                            event.target.value
                                                        )
                                                    }
                                                />
                                            </Form.Group>
                                            <Form.Group className="form-group col-md-6">
                                                <Form.Label>
                                                    Height (cm)
                                                </Form.Label>
                                                {validateHightCm && (
                                                    <p className="validation-custom">
                                                        {validateHightCm}
                                                    </p>
                                                )}
                                                <Form.Control
                                                    type="text"
                                                    className={
                                                        "bg-text-custom " +
                                                        (validateHightCm
                                                            ? "is-invalid"
                                                            : "")
                                                    }
                                                    placeholder="Input code Height"
                                                    style={{ color: "#0a2d3d" }}
                                                    value={hight_cm}
                                                    onChange={(event) =>
                                                        setHightCm(
                                                            event.target.value
                                                        )
                                                    }
                                                />
                                            </Form.Group>
                                            <Form.Group className="form-group col-md-6">
                                                <Form.Label>
                                                    Width (cm)
                                                </Form.Label>
                                                {validateWidthCm && (
                                                    <p className="validation-custom">
                                                        {validateWidthCm}
                                                    </p>
                                                )}
                                                <Form.Control
                                                    type="text"
                                                    className={
                                                        "bg-text-custom " +
                                                        (validateWidthCm
                                                            ? "is-invalid"
                                                            : "")
                                                    }
                                                    placeholder="Input code Width"
                                                    style={{ color: "#0a2d3d" }}
                                                    value={width_cm}
                                                    onChange={(event) =>
                                                        setWidthCm(
                                                            event.target.value
                                                        )
                                                    }
                                                />
                                            </Form.Group>
                                            <Form.Group className="form-group col-md-6">
                                                <Form.Label>
                                                    Long (cm)
                                                </Form.Label>
                                                {validateLongCm && (
                                                    <p className="validation-custom">
                                                        {validateLongCm}
                                                    </p>
                                                )}
                                                <Form.Control
                                                    type="text"
                                                    className={
                                                        "bg-text-custom " +
                                                        (validateLongCm
                                                            ? "is-invalid"
                                                            : "")
                                                    }
                                                    placeholder="Input code long"
                                                    style={{ color: "#0a2d3d" }}
                                                    value={long_cm}
                                                    onChange={(event) =>
                                                        setLongCm(
                                                            event.target.value
                                                        )
                                                    }
                                                />
                                            </Form.Group>
                                            <Form.Group className="form-group col-md-6">
                                                <Form.Label>Tax (%)</Form.Label>
                                                {validateTax && (
                                                    <p className="validation-custom">
                                                        {validateTax}
                                                    </p>
                                                )}
                                                <Form.Control
                                                    type="text"
                                                    className={
                                                        "bg-text-custom " +
                                                        (validateTax
                                                            ? "is-invalid"
                                                            : "")
                                                    }
                                                    placeholder="Input code tax"
                                                    style={{ color: "#0a2d3d" }}
                                                    value={tax}
                                                    onChange={(event) =>
                                                        setTax(
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

export default CreateProductPage;
