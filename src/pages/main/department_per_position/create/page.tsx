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
import SelectedDepartment from "@/components/assets/selectedDepartment";
import SelectedOffice from "@/components/assets/selectedOffice";
import SelectedGrade from "@/components/assets/selectedGrade";

const CreateDepartmentPerPositionPage = () => {
    // ************* ROUTE *************
    const router = useRouter();
    const pathName = usePathname();

    // Satup Title Per-Page
    let pageTitle = String(pathName).split("/");

    // ************* STATE *************
    const [loading, setLoading] = useState(null);
    const [fetchOfficeResponse, setFetchOfficeResponse] = useState(false);
    const [fetchDepartmentResponse, setFetchDepartmentResponse] =
        useState(false);
    const [fetchPositionResponse, setFetchPositionResponse] = useState(false);
    const [fetchGradeResponse, setFetchGradeResponse] = useState(false);
    const [office_id, setOffice] = useState(null);
    const [department_id, setDepartment] = useState(null);
    const [position_id, setPosition] = useState(null);
    const [grade_id, setGrade] = useState(null);
    const [validateOffice, setValidateOffice] = useState("");
    const [validateDepartment, setValidateDepartment] = useState("");
    const [validatePosition, setValidatePosition] = useState("");
    const [validateGrade, setValidateGrade] = useState("");
    const userEmail = getCookie("email");

    // ************* API *************
    const fetchOffice = async () => {
        try {
            const dataResponse = await axios.get("/office/getAll");
            setFetchOfficeResponse(dataResponse.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchDepartment = async () => {
        try {
            const dataResponse = await axios.get("/department/getAll");
            setFetchDepartmentResponse(dataResponse.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchPosition = async () => {
        try {
            const dataResponse = await axios.get("/position/getAll");
            setFetchPositionResponse(dataResponse.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchGrade = async () => {
        try {
            const dataResponse = await axios.get("/grade/getAll");
            setFetchGradeResponse(dataResponse.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios
            .post("/department_per_position/store", {
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

    // ************* Function *************
    // Format column name
    const formatColumnName = (column: any) => {
        let data = column.toString();

        let pageTitle = String(data).split("_");

        let upperFirst = pageTitle[0].slice(0, 1).toUpperCase();
        let lowerFirst = pageTitle[0].slice(1).toLowerCase();
        let first = upperFirst + lowerFirst;

        let upperSecond = pageTitle[1]?.slice(0, 1).toUpperCase();
        let lowerSecond = pageTitle[1]?.slice(1).toLowerCase();
        let second = upperSecond + lowerSecond ? upperSecond + lowerSecond : "";

        let upperTrird = pageTitle[2]?.slice(0, 1).toUpperCase();
        let lowerTrird = pageTitle[2]?.slice(1).toLowerCase();
        let trird = upperTrird + lowerTrird ? upperTrird + lowerTrird : "";

        let formatColumnName = first + " " + second + " " + trird;
        return formatColumnName;
    };

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

    // ************* Hook *************
    useEffect(() => {}, [
        office_id,
        department_id,
        position_id,
        grade_id,
        validateOffice,
        validateDepartment,
        validatePosition,
        validateGrade,
        fetchOfficeResponse,
        fetchDepartmentResponse,
        fetchPositionResponse,
        fetchGradeResponse,
    ]);

    useEffect(() => {
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
                                    Form add {formatColumnName(pageTitle[2])}
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

export default CreateDepartmentPerPositionPage;
