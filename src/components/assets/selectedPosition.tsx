"use client";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import LoaderRotatingLines from "./loaderRotatingLines";

const SelectedPosition = ({
    getPositionId,
    validatePosition,
    defaultValue,
    dataPosition,
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
            <Form.Label>Position</Form.Label>

            {validatePosition && (
                <p className="validation-custom">{validatePosition}</p>
            )}
            {isLoading ? (
                <LoaderRotatingLines />
            ) : (
                <Form.Select
                    value={value}
                    onChange={(event: any) => {
                        getPositionId(event.target.value);
                    }}
                    className={
                        "bg-text-custom " +
                        (validatePosition ? "is-invalid" : "")
                    }
                    style={{ color: "#0a2d3d" }}
                >
                    <option value="DEFAULT" disabled>
                        select a Position
                    </option>
                    {dataPosition?.response?.map((position: any, i: any) => (
                        <option key={i} value={position.id}>
                            {position.name}
                        </option>
                    ))}
                </Form.Select>
            )}
        </div>
    );
};

export default SelectedPosition;
