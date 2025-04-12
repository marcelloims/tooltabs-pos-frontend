"use client";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import LoaderRotatingLines from "./loaderRotatingLines";

interface Response {
    code: number;
    response: any;
    status: string;
}

const SelectedProduct = ({
    getProductId,
    validateProduct,
    defaultValue,
    dataProduct,
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
                Product <span className="text-red">*</span>
            </Form.Label>

            {validateProduct && (
                <p className="validation-custom">{validateProduct}</p>
            )}

            {isLoading ? (
                <LoaderRotatingLines />
            ) : (
                <Form.Select
                    value={value}
                    onChange={(event: any) => {
                        getProductId(event.target.value);
                    }}
                    className={
                        "bg-text-custom " +
                        (validateProduct ? "is-invalid" : "")
                    }
                    style={{ color: "#0a2d3d" }}
                >
                    <option value="DEFAULT" disabled>
                        select a Product
                    </option>
                    {dataProduct?.response?.map((product: any, i: any) => (
                        <option key={i} value={product.id}>
                            {product.pcode} | {product.name}
                        </option>
                    ))}
                </Form.Select>
            )}
        </div>
    );
};

export default SelectedProduct;
