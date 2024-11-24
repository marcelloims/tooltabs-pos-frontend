"use client";
import BackButton from "@/components/assets/backButton";
import axios from "@/lib/axios";
import { getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";
import "../../../../app/myStyle.css";

type propsType = {
    officeId: string;
};

const DetailOfficePage = (props: propsType) => {
    // for route
    const router = useRouter();
    const pathName = usePathname();

    // destructuring props
    const { officeId } = props;

    // this state
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    // Function
    const fetchDetail = async () => {
        try {
            const dataResponse = await axios.get(`/office/detail/${officeId}`);
            setId(dataResponse.data.response[0].id);
            setCode(dataResponse.data.response[0].code);
            setName(dataResponse.data.response[0].name);
            setEmail(dataResponse.data.response[0].email);
            setPhone(dataResponse.data.response[0].phone);
            setAddress(dataResponse.data.response[0].address);
        } catch (error) {
            console.log(error);
        }
    };

    // Hook
    useEffect(() => {
        fetchDetail();
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
                                    <Form>
                                        <div className="form-row">
                                            <Form.Group className="form-group col-md-6">
                                                <Form.Control
                                                    type="hidden"
                                                    placeholder="Input name office"
                                                    style={{ color: "#0a2d3d" }}
                                                    value={id}
                                                />
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Input name office"
                                                    style={{ color: "#0a2d3d" }}
                                                    value={name}
                                                    readOnly
                                                />
                                            </Form.Group>
                                            <Form.Group className="form-group col-md-6">
                                                <Form.Label>Code</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Input code office"
                                                    style={{ color: "#0a2d3d" }}
                                                    value={code}
                                                    readOnly
                                                />
                                            </Form.Group>
                                            <Form.Group className="form-group col-md-6">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                    type="Email"
                                                    placeholder="Input email office"
                                                    style={{ color: "#0a2d3d" }}
                                                    value={email}
                                                    readOnly
                                                />
                                            </Form.Group>
                                            <Form.Group className="form-group col-md-6">
                                                <Form.Label>
                                                    Telphone
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="021xxx"
                                                    style={{ color: "#0a2d3d" }}
                                                    value={phone}
                                                    readOnly
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
                                                    readOnly
                                                ></textarea>
                                            </Form.Group>
                                        </div>
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

export default DetailOfficePage;
