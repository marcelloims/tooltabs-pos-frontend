"use client";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import LoaderRotatingLines from "./loaderRotatingLines";

const SelectedCategori = ({
    getCategoryId,
    validateCategory,
    defaultValue,
    dataCategory,
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
            <Form.Label>Categori</Form.Label>

            {validateCategory && (
                <p className="validation-custom">{validateCategory}</p>
            )}
            {isLoading ? (
                <LoaderRotatingLines />
            ) : (
                <Form.Select
                    value={value}
                    onChange={(event: any) => {
                        getCategoryId(event.target.value);
                    }}
                    className={
                        "bg-text-custom " +
                        (validateCategory ? "is-invalid" : "")
                    }
                    style={{ color: "#0a2d3d" }}
                >
                    <option value="DEFAULT" disabled>
                        select a Category
                    </option>
                    {dataCategory?.response?.map((category: any, i: any) => (
                        <option key={i} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </Form.Select>
            )}
        </div>
    );
};

export default SelectedCategori;
