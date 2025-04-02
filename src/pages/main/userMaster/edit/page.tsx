"use client";
import BackButton from "@/components/assets/backButton";
import axios from "@/lib/axios";
import { getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";
import "../../../../app/myStyle.css";
import LoaderTreeCircles from "@/components/assets/loaderTreeCircles";

type propsType = {
    typeId: string;
};

const EditTypePage = (props: propsType) => {
    // for route
    const router = useRouter();
    const pathName = usePathname();

    // destructuring props
    const { typeId } = props;

    // Satup Title Per-Page
    let pageTitle = String(pathName).split("/");

    // this state
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [validateName, setValidateName] = useState("");
    const [validateCode, setValidateCode] = useState("");
    const userEmail = getCookie("email");

    // Function
    const fetchEdit = async () => {
        try {
            setLoading(true);

            const dataResponse = await axios.get(`/type/edit/${typeId}`);
            setId(dataResponse.data.response[0].id);
            setCode(dataResponse.data.response[0].code);
            setName(dataResponse.data.response[0].name);

            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios
            .put("/type/update", {
                id,
                name,
                code,
                userEmail,
            })
            .then((response) => {
                Swal.fire({
                    title: "Data " + pageTitle[2],
                    text: response.data.message,
                    icon: response.data.status,
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.push("/main/type");
                    }
                });
            })
            .catch((error) => {
                setValidateCode(error.response.data.request.code);
                setValidateName(error.response.data.request.name);
            });
    };

    // Hook
    useEffect(() => {
        fetchEdit();
    }, []);

    useEffect(() => {}, [code, name]);

    return (
        <div className="content-body">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <strong>Form Edit {pageTitle[2]}</strong>
                                <BackButton />
                            </div>
                            <div className="card-body">
                                {loading ? (
                                    <LoaderTreeCircles />
                                ) : (
                                    <div className="basic-form">
                                        <Form onSubmit={handleSubmit}>
                                            <div className="form-row">
                                                <Form.Group className="form-group col-md-6">
                                                    <Form.Control
                                                        type="hidden"
                                                        className="form-control"
                                                        placeholder="Input name type"
                                                        style={{
                                                            color: "#0a2d3d",
                                                        }}
                                                        value={id}
                                                        onChange={(event) =>
                                                            setName(
                                                                event.target
                                                                    .value
                                                            )
                                                        }
                                                    />
                                                    <Form.Label>
                                                        Name
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
                                                        placeholder="Input name type"
                                                        style={{
                                                            color: "#0a2d3d",
                                                        }}
                                                        value={name}
                                                        onChange={(event) =>
                                                            setName(
                                                                event.target
                                                                    .value
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
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditTypePage;
