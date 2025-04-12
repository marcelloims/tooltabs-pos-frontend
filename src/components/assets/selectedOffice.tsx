"use client";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import LoaderRotatingLines from "./loaderRotatingLines";

interface Response {
    code: number;
    response: any;
    status: string;
}

const SelectedOffice = ({
    getOfficeId,
    validateOffice,
    defaultValue,
    dataOffice,
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
            <Form.Label>
                Office <span className="text-red">*</span>
            </Form.Label>

            {validateOffice && (
                <p className="validation-custom">{validateOffice}</p>
            )}

            {isLoading ? (
                <LoaderRotatingLines />
            ) : (
                <Form.Select
                    value={value}
                    onChange={(event: any) => {
                        getOfficeId(event.target.value);
                    }}
                    className={
                        "bg-text-custom " + (validateOffice ? "is-invalid" : "")
                    }
                    style={{ color: "#0a2d3d" }}
                >
                    <option value="DEFAULT" disabled>
                        select a Office <span className="text-red">*</span>
                    </option>
                    {dataOffice?.response?.map((office: any, i: any) => (
                        <option key={i} value={office.id}>
                            {office.code}
                        </option>
                    ))}
                </Form.Select>
            )}
        </div>
    );
};

export default SelectedOffice;
