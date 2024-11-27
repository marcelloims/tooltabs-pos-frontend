"use client";
import BackButton from "@/components/assets/backButton";
import axios from "@/lib/axios";
import { getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";
import "../../../../app/myStyle.css";

const CreateOfficePage = () => {
    // for route
    const router = useRouter();
    const pathName = usePathname();

    // Satup Title Per-Page
    let pageTitle = String(pathName).split("/");

    // this state
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [validateName, setValidateName] = useState("");
    const [validateCode, setValidateCode] = useState("");
    const [validateEmail, setValidateEmail] = useState("");
    const [validatePhone, setValidatePhone] = useState("");
    const [validateAddress, setValidateAddress] = useState("");
    const userEmail = getCookie("email");

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios
            .post("/office/store", {
                name,
                code,
                email,
                phone,
                address,
                userEmail,
            })
            .then((response) => {
                Swal.fire({
                    title: "Data " + pageTitle[2],
                    text: response.data.message,
                    icon: response.data.status,
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.push("/main/office");
                    }
                });
            })
            .catch((error) => {
                setValidateName(error.response.data.request.name);
                setValidateCode(error.response.data.request.code);
                setValidateEmail(error.response.data.request.email);
                setValidatePhone(error.response.data.request.phone);
                setValidateAddress(error.response.data.request.address);
            });
    };

    useEffect(() => {}, [name, code, email, phone, address]);
    return (
        <div className="content-body">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <strong>Form Add {pageTitle[2]}</strong>
                                <BackButton />
                            </div>
                            <div className="card-body">
                                <div className="basic-form">
                                    <Form onSubmit={handleSubmit}>
                                        <div className="form-row">
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
                                                    placeholder="Input name office"
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
                                                <Form.Label>Code</Form.Label>
                                                {validateCode && (
                                                    <p className="validation-custom">
                                                        {validateCode}
                                                    </p>
                                                )}
                                                <Form.Control
                                                    type="text"
                                                    className={
                                                        "bg-text-custom " +
                                                        (validateCode
                                                            ? "is-invalid"
                                                            : "")
                                                    }
                                                    placeholder="Input code office"
                                                    style={{ color: "#0a2d3d" }}
                                                    value={code}
                                                    onChange={(event) =>
                                                        setCode(
                                                            event.target.value
                                                        )
                                                    }
                                                />
                                            </Form.Group>
                                            <Form.Group className="form-group col-md-6">
                                                <Form.Label>Email</Form.Label>
                                                {validateEmail && (
                                                    <p className="validation-custom">
                                                        {validateEmail}
                                                    </p>
                                                )}
                                                <Form.Control
                                                    type="Email"
                                                    className={
                                                        "bg-text-custom " +
                                                        (validateEmail
                                                            ? "is-invalid"
                                                            : "")
                                                    }
                                                    placeholder="Input email office"
                                                    style={{ color: "#0a2d3d" }}
                                                    value={email}
                                                    onChange={(event) =>
                                                        setEmail(
                                                            event.target.value
                                                        )
                                                    }
                                                />
                                            </Form.Group>
                                            <Form.Group className="form-group col-md-6">
                                                <Form.Label>
                                                    Telphone
                                                </Form.Label>
                                                {validatePhone && (
                                                    <p className="validation-custom">
                                                        {validatePhone}
                                                    </p>
                                                )}
                                                <Form.Control
                                                    type="text"
                                                    className={
                                                        "bg-text-custom " +
                                                        (validatePhone
                                                            ? "is-invalid"
                                                            : "")
                                                    }
                                                    placeholder="021xxx"
                                                    style={{ color: "#0a2d3d" }}
                                                    value={phone}
                                                    onChange={(event) =>
                                                        setPhone(
                                                            event.target.value
                                                        )
                                                    }
                                                />
                                            </Form.Group>
                                            <Form.Group className="form-group col-md-6">
                                                <Form.Label>Address</Form.Label>
                                                {validateAddress && (
                                                    <p className="validation-custom">
                                                        {validateAddress}
                                                    </p>
                                                )}
                                                <textarea
                                                    className={
                                                        "form-control bg-text-custom " +
                                                        (validateAddress
                                                            ? "is-invalid"
                                                            : "")
                                                    }
                                                    rows={4}
                                                    id="comment"
                                                    style={{ color: "#0a2d3d" }}
                                                    value={address}
                                                    onChange={(event) =>
                                                        setAddress(
                                                            event.target.value
                                                        )
                                                    }
                                                ></textarea>
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

export default CreateOfficePage;
