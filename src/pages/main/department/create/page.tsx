"use client";
import BackButton from "@/components/assets/backButton";
import axios from "@/lib/axios";
import { getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import React, { SyntheticEvent, useState } from "react";
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";
import "../../../../app/myStyle.css";

const CreateDepartmentPage = () => {
    // for route
    const router = useRouter();
    const pathName = usePathname();

    // Satup Title Per-Page
    let pageTitle = String(pathName).split("/");

    // this state
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [validateCode, setValidateCode] = useState("");
    const [validateName, setValidateName] = useState("");
    const userEmail = getCookie("email");
    const userTenantId = getCookie("tenant_id");
    const userOfficeId = getCookie("office_id");

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios
            .post("/department/store", {
                code,
                name,
                userEmail,
                userTenantId,
                userOfficeId,
            })
            .then((response) => {
                Swal.fire({
                    title: "Data " + pageTitle[2],
                    text: response.data.message,
                    icon: response.data.status,
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.push("/main/department");
                    }
                });
            })
            .catch((error) => {
                setValidateCode(error.response.data.request.code);
                setValidateName(error.response.data.request.name);
            });
    };
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
                                                    placeholder="Input code department"
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
                                                    placeholder="Input name department"
                                                    style={{ color: "#0a2d3d" }}
                                                    value={name}
                                                    onChange={(event) =>
                                                        setName(
                                                            event.target.value
                                                        )
                                                    }
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

export default CreateDepartmentPage;
