"use client";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import LoaderRotatingLines from "./loaderRotatingLines";

const SelectedActivation = ({
    getActivationId,
    validateActivation,
    defaultValue,
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
            <Form.Label>Status <span className="text-red">*</span></Form.Label>

            {validateActivation && (
                <p className="validation-custom">{validateActivation}</p>
            )}
            {isLoading ? (
                <LoaderRotatingLines />
            ) : (
                <Form.Select
                    value={value}
                    onChange={(event: any) => {
                        getActivationId(event.target.value);
                    }}
                    className={
                        "bg-text-custom " +
                        (validateActivation ? "is-invalid" : "")
                    }
                    style={{ color: "#0a2d3d" }}
                >
                    <option value="DEFAULT" disabled>
                        select a Activation
                    </option>
                    <option value="Active">Active</option>
                    <option value="In-active">In-Active</option>
                </Form.Select>
            )}
        </div>
    );
};

export default SelectedActivation;
