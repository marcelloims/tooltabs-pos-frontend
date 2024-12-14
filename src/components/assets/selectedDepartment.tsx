"use client";
import axios from "@/lib/axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import LoaderRotatingLines from "./loaderRotatingLines";

interface Response {
    code: number;
    response: any;
    status: string;
}

const SelectedDepartment = ({
    getDepartmentId,
    validateDepartment,
    value,
}: any) => {
    // State
    const [loading, setLoading] = useState(false);
    const [fetchResponse, setFetchResponse] = useState<Response>();

    const fetchData = async () => {
        try {
            setLoading(true);

            const dataResponse = await axios.get("/department/getAll");

            setLoading(false);
            setFetchResponse(dataResponse.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {}, [fetchResponse, loading]);

    useEffect(() => {
        fetchData();
    }, []);

    let defaultValue = null;
    if (value) {
        defaultValue = value;
    } else {
        defaultValue = "DEFAULT";
    }

    return (
        <div>
            <Form.Label>Department</Form.Label>

            {validateDepartment && (
                <p className="validation-custom">{validateDepartment}</p>
            )}

            {defaultValue === "DEFAULT" &&
            value !== defaultValue &&
            value === null ? (
                <LoaderRotatingLines />
            ) : (
                <Form.Select
                    onChange={(event: any) => {
                        getDepartmentId(event.target.value);
                    }}
                    className={
                        "bg-text-custom " +
                        (validateDepartment ? "is-invalid" : "")
                    }
                    style={{ color: "#0a2d3d" }}
                    value={defaultValue}
                >
                    <option value="DEFAULT" disabled>
                        select a Department
                    </option>
                    {fetchResponse?.response.map((department: any, i: any) => (
                        <option key={i} value={department.id}>
                            {department.code}
                        </option>
                    ))}
                </Form.Select>
            )}
        </div>
    );
};

export default SelectedDepartment;
