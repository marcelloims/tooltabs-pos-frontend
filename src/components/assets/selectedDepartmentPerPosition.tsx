"use client";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import LoaderRotatingLines from "./loaderRotatingLines";

interface Response {
    code: number;
    response: any;
    status: string;
}

const SelectedDepartmentPerPosition = ({
    getDepartmentPerPositionId,
    validateDepartmentPerPosition,
    defaultValue,
    dataDepartmentPerPosition,
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
            <Form.Label>Department Per Position</Form.Label>

            {validateDepartmentPerPosition && (
                <p className="validation-custom">
                    {validateDepartmentPerPosition}
                </p>
            )}

            {isLoading ? (
                <LoaderRotatingLines />
            ) : (
                <Form.Select
                    value={value}
                    onChange={(event: any) => {
                        getDepartmentPerPositionId(event.target.value);
                    }}
                    className={
                        "bg-text-custom " +
                        (validateDepartmentPerPosition ? "is-invalid" : "")
                    }
                    style={{ color: "#0a2d3d" }}
                >
                    <option value="DEFAULT" disabled>
                        select a Department Per Position
                    </option>
                    {dataDepartmentPerPosition?.response?.map(
                        (dataDepartmentPerPosition: any, i: any) => (
                            <option
                                key={i}
                                value={dataDepartmentPerPosition.id}
                            >
                                {dataDepartmentPerPosition.office_name} ||{" "}
                                {dataDepartmentPerPosition.department_code} ||{" "}
                                {dataDepartmentPerPosition.position_code}
                            </option>
                        )
                    )}
                </Form.Select>
            )}
        </div>
    );
};

export default SelectedDepartmentPerPosition;
