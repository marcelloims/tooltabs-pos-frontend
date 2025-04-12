"use client";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import LoaderRotatingLines from "./loaderRotatingLines";

interface Response {
    code: number;
    response: any;
    status: string;
}

const SelectedGrade = ({
    getGradeId,
    validateGrade,
    defaultValue,
    dataGrade,
    isLoading,
}: any) => {
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
            <Form.Label>
                Grade <span className="text-red">*</span>
            </Form.Label>

            {validateGrade && (
                <p className="validation-custom">{validateGrade}</p>
            )}

            {isLoading ? (
                <LoaderRotatingLines />
            ) : (
                <Form.Select
                    value={value}
                    onChange={(event: any) => {
                        getGradeId(event.target.value);
                    }}
                    className={
                        "bg-text-custom " + (validateGrade ? "is-invalid" : "")
                    }
                    style={{ color: "#0a2d3d" }}
                >
                    <option value="DEFAULT" disabled>
                        select a Grade
                    </option>
                    {dataGrade?.response?.map((grade: any, i: any) => (
                        <option key={i} value={grade.id}>
                            {grade.level}
                        </option>
                    ))}
                </Form.Select>
            )}
        </div>
    );
};

export default SelectedGrade;
