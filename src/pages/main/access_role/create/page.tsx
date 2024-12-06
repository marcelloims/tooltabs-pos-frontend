"use client";
import BackButton from "@/components/assets/backButton";
import axios from "@/lib/axios";
import { getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import "../../../../app/myStyle.css";

interface Response {
    code: number;
    response: [];
    status: string;
}

const CreateAccessRolePage = () => {
    // for route
    const router = useRouter();
    const pathName = usePathname();

    // Satup Title Per-Page
    let pageTitle = String(pathName).split("/");
    let splitPageTitle = pageTitle[2].split("_");

    // this state
    const [loading, setLoading] = useState(false);
    const [fetchResponseMenu, setFetchResponseMenu] = useState<Response>();
    const [name, setName] = useState("");
    const [validateName, setValidateName] = useState("");
    const userEmail = getCookie("email");

    const fetchDataMenu = async () => {
        try {
            setLoading(true);

            const dataResponse = await axios.get("/access_role/get_menu");

            setLoading(false);
            setFetchResponseMenu(dataResponse.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios
            .post("/access_role/store", {
                name,
                userEmail,
            })
            .then((response) => {
                Swal.fire({
                    title: "Data " + pageTitle[2],
                    text: response.data.message,
                    icon: response.data.status,
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.push("/main/position");
                    }
                });
            })
            .catch((error) => {
                setValidateName(error.response.data.request.name);
            });
    };

    useEffect(() => {
        console.log(fetchResponseMenu?.response);
    }, [fetchResponseMenu]);

    useEffect(() => {
        fetchDataMenu();
    }, []);

    return (
        <div className="content-body">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <strong>
                                    Form add {splitPageTitle[0] + " "}
                                    {splitPageTitle[1] === undefined
                                        ? ""
                                        : splitPageTitle[1]}
                                </strong>
                                <BackButton />
                            </div>
                            <div className="card-body">
                                <div className="basic-form">
                                    <Form onSubmit={handleSubmit}>
                                        <div className="form-row">
                                            <Form.Group className="form-group col-md-12">
                                                <Form.Label>
                                                    Role Name
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
                                                    placeholder="Input role name"
                                                    style={{ color: "#0a2d3d" }}
                                                    value={name}
                                                    onChange={(event) =>
                                                        setName(
                                                            event.target.value
                                                        )
                                                    }
                                                />
                                            </Form.Group>
                                            <h3 className="font-weight-bold text-nowrap col-12 mt-5 mb-5">
                                                Configuration Access List*
                                            </h3>
                                            {fetchResponseMenu?.response
                                                .filter(
                                                    (menu: any) =>
                                                        !menu.submenu &&
                                                        menu.name !=
                                                            "Dashboard" &&
                                                        menu.name !=
                                                            "Back to Main" &&
                                                        menu.name !=
                                                            "Go to Configuration"
                                                )
                                                .map((menu: any, i: any) => (
                                                    <Form.Group
                                                        className="form-group col-md-2 ml-5 text-nowrap"
                                                        key={i}
                                                    >
                                                        <Form.Label className="font-weight-bold">
                                                            # {menu.name}
                                                        </Form.Label>
                                                        <hr
                                                            style={{
                                                                border: "3px solid",
                                                            }}
                                                        />
                                                        {fetchResponseMenu?.response
                                                            .filter(
                                                                (
                                                                    submenu: any
                                                                ) =>
                                                                    submenu.submenu ==
                                                                    menu.id
                                                            )
                                                            .map(
                                                                (
                                                                    submenu: any,
                                                                    subIndex: any
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            subIndex
                                                                        }
                                                                    >
                                                                        <Row>
                                                                            <Col className="mt-2">
                                                                                <Form.Check
                                                                                    className={
                                                                                        "bg-text-custom " +
                                                                                        (validateName
                                                                                            ? "is-invalid"
                                                                                            : "")
                                                                                    }
                                                                                    style={{
                                                                                        color: "#0a2d3d",
                                                                                    }}
                                                                                    value=""
                                                                                    onChange={(
                                                                                        event
                                                                                    ) =>
                                                                                        setName(
                                                                                            event
                                                                                                .target
                                                                                                .value
                                                                                        )
                                                                                    }
                                                                                />
                                                                                <i className="mr-2"></i>
                                                                                <strong>
                                                                                    {
                                                                                        submenu.name
                                                                                    }
                                                                                </strong>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>
                                                                )
                                                            )}
                                                    </Form.Group>
                                                ))}
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

export default CreateAccessRolePage;
