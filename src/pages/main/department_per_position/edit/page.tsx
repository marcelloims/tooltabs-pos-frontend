"use client";
import BackButton from "@/components/assets/backButton";
import axios from "@/lib/axios";
import { getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";
import "../../../../app/myStyle.css";
import SelectedPosition from "@/components/assets/selectedPosition";
import SelectedGrade from "@/components/assets/selectedGrade";
import SelectedDepartment from "@/components/assets/selectedDepartment";
import SelectedOffice from "@/components/assets/selectedOffice";
import { formatColumnName } from "@/lib/customFunction";

type propsType = {
    departmentPerPositionId: string;
};

const EditDepartmentPerPositionPage = (props: propsType) => {
    // ************* Route *************
    const router = useRouter();
    const pathName = usePathname();

    // ************* destructuring props *************
    const { departmentPerPositionId } = props;

    // Satup Title Per-Page
    let pageTitle = String(pathName).split("/");

    // ************* STATE *************
    const [loading, setLoading] = useState(false);
    const [id, setDepartmentPerPosition] = useState(null);
    const [office_id, setOffice] = useState(null);
    const [department_id, setDepartment] = useState(null);
    const [position_id, setPosition] = useState(null);
    const [grade_id, setGrade] = useState(null);
    const [fetchOfficeResponse, setFetchOfficeResponse] = useState(null);
    const [fetchDepartmentResponse, setFetchDepartmentResponse] =
        useState(null);
    const [fetchPositionResponse, setFetchPositionResponse] = useState(null);
    const [fetchGradeResponse, setFetchGradeResponse] = useState(null);
    const [validateOffice, setValidateOffice] = useState("");
    const [validateDepartment, setValidateDepartment] = useState("");
    const [validatePosition, setValidatePosition] = useState("");
    const [validateGrade, setValidateGrade] = useState("");
    const userEmail = getCookie("email");

    // ************* API *************
    const fetchEdit = async () => {
        try {
            const dataResponse = await axios.get(
                `/department_per_position/edit/${departmentPerPositionId}`
            );
            setDepartmentPerPosition(dataResponse.data.response.id);
            setOffice(dataResponse.data.response.office_id);
            setDepartment(dataResponse.data.response.department_id);
            setPosition(dataResponse.data.response.position_id);
            setGrade(dataResponse.data.response.grade_id);
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

    const fetchDepartment = async () => {
        try {
            setLoading(true);

            const dataResponse = await axios.get("/department/getAll");

            setFetchDepartmentResponse(dataResponse.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchPosition = async () => {
        try {
            setLoading(true);

            const dataResponse = await axios.get("/position/getAll");

            setFetchPositionResponse(dataResponse.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchGrade = async () => {
        try {
            setLoading(true);

            const dataResponse = await axios.get("/grade/getAll");

            setFetchGradeResponse(dataResponse.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    // ************* Function *************

    const handleSelectedOffice = (data: any) => {
        setOffice(data);
    };

    const handleSelectedDepartment = (data: any) => {
        setDepartment(data);
    };

    const handleSelectedPosition = (data: any) => {
        setPosition(data);
    };

    const handleSelectedGrade = (data: any) => {
        setGrade(data);
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios
            .put("/department_per_position/update", {
                id,
                office_id,
                department_id,
                position_id,
                grade_id,
                userEmail,
            })
            .then((response) => {
                Swal.fire({
                    title: "Data " + formatColumnName(pageTitle[2]),
                    text: response.data.message,
                    icon: response.data.status,
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.push("/main/department_per_position");
                    }
                });
            })
            .catch((error) => {
                setValidateOffice(error.response.data.request.office_id);
                setValidateDepartment(
                    error.response.data.request.department_id
                );
                setValidatePosition(error.response.data.request.position_id);
                setValidateGrade(error.response.data.request.grade_id);
            });
    };

    // ************* Hook *************
    useEffect(() => {}, [
        loading,
        office_id,
        department_id,
        position_id,
        grade_id,
        fetchOfficeResponse,
        fetchDepartmentResponse,
        fetchPositionResponse,
        fetchGradeResponse,
        validateOffice,
        validateDepartment,
        validatePosition,
        validateGrade,
    ]);

    useEffect(() => {
        fetchEdit();
        fetchOffice();
        fetchDepartment();
        fetchPosition();
        fetchGrade();
    }, []);

    return (
        <div className="content-body">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <strong>
                                    Form Edit {formatColumnName(pageTitle[2])}
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
                                                <SelectedDepartment
                                                    getDepartmentId={
                                                        handleSelectedDepartment
                                                    }
                                                    validateDepartment={
                                                        validateDepartment
                                                    }
                                                    defaultValue={department_id}
                                                    dataDepartment={
                                                        fetchDepartmentResponse
                                                    }
                                                    isLoading={loading}
                                                />
                                            </Form.Group>
                                            <Form.Group className="form-group col-md-6">
                                                <SelectedPosition
                                                    getPositionId={
                                                        handleSelectedPosition
                                                    }
                                                    validatePosition={
                                                        validatePosition
                                                    }
                                                    defaultValue={position_id}
                                                    dataPosition={
                                                        fetchPositionResponse
                                                    }
                                                    isLoading={loading}
                                                />
                                            </Form.Group>
                                            <Form.Group className="form-group col-md-6">
                                                <SelectedGrade
                                                    getGradeId={
                                                        handleSelectedGrade
                                                    }
                                                    validateGrade={
                                                        validateGrade
                                                    }
                                                    defaultValue={grade_id}
                                                    dataGrade={
                                                        fetchGradeResponse
                                                    }
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

export default EditDepartmentPerPositionPage;
