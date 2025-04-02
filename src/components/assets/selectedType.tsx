"use client";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import LoaderRotatingLines from "./loaderRotatingLines";

const SelectedType = ({
    getTypeId,
    validateType,
    defaultValue,
    dataType,
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
            <Form.Label>Type <span className="text-red">*</span></Form.Label>

            {validateType && (
                <p className="validation-custom">{validateType}</p>
            )}
            {isLoading ? (
                <LoaderRotatingLines />
            ) : (
                <Form.Select
                    value={value}
                    onChange={(event: any) => {
                        getTypeId(event.target.value);
                    }}
                    className={
                        "bg-text-custom " + (validateType ? "is-invalid" : "")
                    }
                    style={{ color: "#0a2d3d" }}
                >
                    <option value="DEFAULT" disabled>
                        select a Type
                    </option>
                    {dataType?.response?.map((type: any, i: any) => (
                        <option key={i} value={type.id}>
                            {type.name}
                        </option>
                    ))}
                </Form.Select>
            )}
        </div>
    );
};

export default SelectedType;
