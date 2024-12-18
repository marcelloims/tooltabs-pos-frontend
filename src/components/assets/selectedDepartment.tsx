"use client";
import axios from "@/lib/axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import LoaderRotatingLines from "./loaderRotatingLines";

const SelectedDepartment = ({
    getDepartmentId,
    validateDepartment,
    defaultValue,
    dataDepartment,
    isLoading,
}: any) => {
    // ************* STATE *************
    const [value, setValue] = useState<string>();

    // ************* Hook *************
    useEffect(() => {
        if (defaultValue) {
            setValue(defaultValue);
        } else {
            setValue("DEFAULT");
        }
    });

    useEffect(() => {}, [value]);

    return (
        <div>
            <Form.Label>Department</Form.Label>

            {validateDepartment && (
                <p className="validation-custom">{validateDepartment}</p>
            )}
            {isLoading ? (
                <LoaderRotatingLines />
            ) : (
                <Form.Select
                    value={value}
                    onChange={(event: any) => {
                        getDepartmentId(event.target.value);
                    }}
                    className={
                        "bg-text-custom " +
                        (validateDepartment ? "is-invalid" : "")
                    }
                    style={{ color: "#0a2d3d" }}
                >
                    <option value="DEFAULT" disabled>
                        select a Department
                    </option>
                    {dataDepartment?.response?.map(
                        (department: any, i: any) => (
                            <option key={i} value={department.id}>
                                {department.name}
                            </option>
                        )
                    )}
                </Form.Select>
            )}
        </div>
    );
};

export default SelectedDepartment;
