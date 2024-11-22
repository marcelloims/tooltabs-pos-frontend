"use client";
import BackButton from "@/components/assets/backButton";
import axios from "@/lib/axios";
import { getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";

type propsType = {
    officeId: string;
};

const EditPage = (props: propsType) => {
    // for route
    const router = useRouter();
    const pathName = usePathname();

    // destructuring props
    const { officeId } = props;

    // Satup Title Per-Page
    let pageTitle = String(pathName).split("/");

    // this state
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const userEmail = getCookie("email");

    // Function
    const fetchEdit = async () => {
        try {
            const dataResponse = await axios.get(`/office/edit/${officeId}`);
            setId(dataResponse.data.response[0].id);
            setCode(dataResponse.data.response[0].code);
            setName(dataResponse.data.response[0].name);
            setEmail(dataResponse.data.response[0].email);
            setPhone(dataResponse.data.response[0].phone);
            setAddress(dataResponse.data.response[0].address);

            // setFetchResponse(dataResponse.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios
            .put("/office/update", {
                id,
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
                console.log(error);
            });
    };

    // Hook
    useEffect(() => {
        fetchEdit();
    }, []);

    useEffect(() => {}, [name, code, email, phone, address]);

    return (
        <div className="content-body">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <strong>Form Edit Office</strong>
                                <BackButton />
                            </div>
                            <div className="card-body">
                                <div className="basic-form">
                                    <Form onSubmit={handleSubmit}>
                                        <div className="form-row">
                                            <Form.Group className="form-group col-md-6">
                                                <Form.Control
                                                    type="hidden"
                                                    className="form-control"
                                                    placeholder="Input name office"
                                                    style={{ color: "#0a2d3d" }}
                                                    value={id}
                                                    onChange={(event) =>
                                                        setName(
                                                            event.target.value
                                                        )
                                                    }
                                                />
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    className="form-control"
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
                                                <Form.Control
                                                    type="text"
                                                    className="form-control"
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
                                                <Form.Control
                                                    type="Email"
                                                    className="form-control"
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
                                                <Form.Control
                                                    type="text"
                                                    className="form-control"
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
                                                <textarea
                                                    className="form-control"
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

export default EditPage;
