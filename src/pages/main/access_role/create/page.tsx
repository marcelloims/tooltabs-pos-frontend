"use client";
import BackButton from "@/components/assets/backButton";
import axios from "@/lib/axios";
import { getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import "../../../../app/myStyle.css";
import SelectedOffice from "@/components/assets/selectedOffice";
import SelectedDepartmentPerPosition from "@/components/assets/selectedDepartmentPerPosition";
import { formatPageTitle } from "@/lib/customFunction";

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
    const [checkedList, setCheckedList] = useState([]);
    const [selectCase, setSelectCase] = useState("");
    const [validateSelectCase, setValidateSelectCase] = useState();

    const [fetchOfficeResponse, setFetchOfficeResponse] = useState(false);
    const [office_id, setOffice] = useState(null);
    const [validateOffice, setValidateOffice] = useState("");

    const [
        fetchDepartmentPerPositionResponse,
        setFetchDepartmentPerPositionResponse,
    ] = useState(false);
    const [department_per_position_id, setDepartmentPerPosition] =
        useState(null);
    const [validateDepartmentPerPosition, setValidationDepartmentPerPosition] =
        useState("");

    const [name, setName] = useState("");
    const [validateName, setValidateName] = useState("");

    const userEmail = getCookie("email");
    const userTenantId = getCookie("tenant_id");

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

    const fetchDepartmentPerPosition = async () => {
        try {
            setLoading(true);
            const dataResponse = await axios.get(
                "/department_per_position/getAll",
                { params: { userTenantId } }
            );
            setFetchDepartmentPerPositionResponse(dataResponse.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchDataMenu = async () => {
        try {
            setLoading(true);

            const dataResponse = await axios.get("/menu/getAll");

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
                office_id,
                department_per_position_id,
                name,
                selectCase,
                checkedList,
                userEmail,
                userTenantId,
            })
            .then((response) => {
                Swal.fire({
                    title: "Data " + formatPageTitle(pageTitle[2]),
                    text: response.data.message,
                    icon: response.data.status,
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.push("/main/access_role");
                    }
                });
            })
            .catch((error) => {
                setValidateOffice(error.response.data.request.office_id);
                setValidationDepartmentPerPosition(
                    error.response.data.request.department_per_position_id
                );
                setValidateName(error.response.data.request.name);
                setValidateSelectCase(error.response.data.request.selectCase);
            });
    };

    const handleSelectedOffice = (data: any) => {
        setOffice(data);
    };

    const handleSelectedDepartmentPerPosition = (data: any) => {
        setDepartmentPerPosition(data);
    };

    const handleCheckbox = (event: any) => {
        let value = event.target.value;
        let isChecked = event.target.checked;

        if (isChecked) {
            let data = [...checkedList, value];
            setCheckedList(data);
        } else {
            let filteredList = checkedList.filter(
                (item: any) => item !== value
            );
            setCheckedList(filteredList);
        }

        console.log(checkedList);
    };

    useEffect(() => {
        console.log(validateSelectCase);
    }, [
        checkedList,
        fetchResponseMenu,
        loading,
        fetchResponseMenu,
        fetchOfficeResponse,
        office_id,
        validateOffice,
        fetchDepartmentPerPositionResponse,
        department_per_position_id,
        validateDepartmentPerPosition,
        selectCase,
        validateOffice,
        validateSelectCase,
    ]);

    useEffect(() => {
        fetchDataMenu();
        fetchOffice();
        fetchDepartmentPerPosition();
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
                                            <Form.Group className="form-group col-md-4">
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
                                            <Form.Group className="form-group col-md-4">
                                                <SelectedDepartmentPerPosition
                                                    getDepartmentPerPositionId={
                                                        handleSelectedDepartmentPerPosition
                                                    }
                                                    validateDepartmentPerPosition={
                                                        validateDepartmentPerPosition
                                                    }
                                                    defaultValue={
                                                        department_per_position_id
                                                    }
                                                    dataDepartmentPerPosition={
                                                        fetchDepartmentPerPositionResponse
                                                    }
                                                    isLoading={loading}
                                                />
                                            </Form.Group>
                                            <Form.Group className="form-group col-md-4">
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
                                            <Form.Group className="form-group col-md-4 ">
                                                <Form.Label>
                                                    Option Case
                                                </Form.Label>
                                                {validateSelectCase && (
                                                    <p className="validation-custom">
                                                        {validateSelectCase}
                                                    </p>
                                                )}
                                                <Form.Select
                                                    value={
                                                        selectCase
                                                            ? selectCase
                                                            : "DEFAULT"
                                                    }
                                                    onChange={(event: any) => {
                                                        setSelectCase(
                                                            event.target.value
                                                        );
                                                    }}
                                                    className={
                                                        "bg-text-custom " +
                                                        (validateSelectCase
                                                            ? "is-invalid"
                                                            : "")
                                                    }
                                                    style={{ color: "#0a2d3d" }}
                                                >
                                                    <option
                                                        value="DEFAULT"
                                                        disabled
                                                    >
                                                        select a Activation
                                                    </option>
                                                    <option value="Active">
                                                        Active
                                                    </option>
                                                    <option value="In-active">
                                                        In-Active
                                                    </option>
                                                </Form.Select>
                                            </Form.Group>
                                            <h3 className="font-weight-bold text-nowrap col-12 mt-5 mb-5">
                                                Configuration Access List*
                                            </h3>

                                            {fetchResponseMenu?.response.map(
                                                (menu: any, i: any) => (
                                                    <Form.Group
                                                        className="form-group col-md-2 ml-5 text-nowrap"
                                                        key={i}
                                                    >
                                                        <div key={menu.id}>
                                                            <Row>
                                                                <Col className="mt-2">
                                                                    <Form.Check
                                                                        type="checkbox"
                                                                        name="menu"
                                                                        id={
                                                                            menu.id
                                                                        }
                                                                        value={
                                                                            menu.id
                                                                        }
                                                                        onChange={
                                                                            handleCheckbox
                                                                        }
                                                                    />
                                                                    <label>
                                                                        {" "}
                                                                        {
                                                                            menu.name
                                                                        }
                                                                    </label>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Form.Group>
                                                )
                                            )}
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
