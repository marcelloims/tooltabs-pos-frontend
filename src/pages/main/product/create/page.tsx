"use client";
import BackButton from "@/components/assets/backButton";
import axios from "@/lib/axios";
import { getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";
import "../../../../app/myStyle.css";
import SelectedCategori from "@/components/assets/selectedCategory";
import SelectedType from "@/components/assets/selectedType";
import SelectedActivation from "@/components/assets/selectedActivation";

const CreateProductPage = () => {
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
    const [fetchCategoryResponse, setFetchCategoryResponse] = useState("");
    const [fetchTypeResponse, setFetchTypeResponse] = useState("");
    const [category_id, setCategory] = useState("");
    const [type_id, setType] = useState("");
    const [validateCategory, setValidateCategory] = useState("");
    const [validateType, setValidateType] = useState("");
    // ************* Selected Component End *************
    const [userEmail, setUserEmail] = useState(String(getCookie("email")));
    const [pcode, setPcode] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
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
    const [validateDescription, setValidateDescription] = useState("");
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

        //define formData
        const formData = new FormData();

        //append data to "formData"
        formData.append("category_id", category_id);
        formData.append("type_id", type_id);
        formData.append("pcode", pcode);
        formData.append("name", name);
        formData.append("description", description);
        formData.append("unit", unit);
        formData.append("brand_code", brand_code);
        formData.append("hight_cm", hight_cm);
        formData.append("width_cm", width_cm);
        formData.append("long_cm", long_cm);
        formData.append("tax", tax);
        formData.append("status", status);
        formData.append("image1", image1Value);
        formData.append("image2", image2Value);
        formData.append("image3", image3Value);
        formData.append("userEmail", userEmail);

        await axios
            .post("/product/store", formData, {
                headers: { "Content-Type": "multipart/form-data" },
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
                setValidateDescription(error.response.data.request.description);
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
        fetchCategoryResponse,
        category_id,
        type_id,
        pcode,
        name,
        description,
        unit,
        brand_code,
        hight_cm,
        width_cm,
        long_cm,
        tax,
        status,
        userEmail,
        validateCategory,
        validateType,
        validatePcode,
        validateName,
        validateDescription,
        validateUnit,
        validateBrandCode,
        validateHightCm,
        validateWidthCm,
        validateLongCm,
        validateTax,
        validateStatus,
    ]);

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
                                                <Form.Label>
                                                    Pcode{" "}
                                                    <span className="text-red">
                                                        *
                                                    </span>
                                                </Form.Label>
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
                                                <Form.Label>
                                                    Name{" "}
                                                    <span className="text-red">
                                                        *
                                                    </span>
                                                </Form.Label>
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
                                                    placeholder="Input product name"
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
                                                <Form.Label>
                                                    Description
                                                </Form.Label>
                                                {validateDescription && (
                                                    <p className="validation-custom">
                                                        {validateDescription}
                                                    </p>
                                                )}
                                                <Form.Control
                                                    type="text"
                                                    className={
                                                        "bg-text-custom " +
                                                        (validateDescription
                                                            ? "is-invalid"
                                                            : "")
                                                    }
                                                    placeholder="Input decription"
                                                    style={{ color: "#0a2d3d" }}
                                                    value={description}
                                                    onChange={(event) =>
                                                        setDescription(
                                                            event.target.value
                                                        )
                                                    }
                                                />
                                            </Form.Group>
                                            <Form.Group className="form-group col-md-6">
                                                <Form.Label>
                                                    Unit{" "}
                                                    <span className="text-red">
                                                        *
                                                    </span>
                                                </Form.Label>
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
                                        <div className="form-row">
                                            <Form.Group className="form-group col-md-4">
                                                <Form.Label>Image 1</Form.Label>
                                                {image1 ? (
                                                    <img
                                                        src={URL.createObjectURL(
                                                            image1
                                                        )}
                                                        style={{
                                                            width: "300px",
                                                            height: "300px",
                                                        }}
                                                        alt="image-1"
                                                        onClick={
                                                            handleImageClick1
                                                        }
                                                    />
                                                ) : (
                                                    <img
                                                        src="/static/assets/images/foto-upload.jpg"
                                                        alt="image-1"
                                                        onClick={
                                                            handleImageClick1
                                                        }
                                                    />
                                                )}
                                                <Form.Control
                                                    type="file"
                                                    style={{
                                                        color: "#0a2d3d",
                                                        display: "none",
                                                    }}
                                                    onChange={(event: any) => {
                                                        const imageData =
                                                            event.target
                                                                .files[0];

                                                        if (
                                                            !imageData.type.match(
                                                                "image.*"
                                                            )
                                                        ) {
                                                            setImage1Value("");

                                                            return;
                                                        }
                                                        setImage1(imageData);
                                                        setImage1Value(
                                                            imageData
                                                        );
                                                    }}
                                                    ref={inputRef1}
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
