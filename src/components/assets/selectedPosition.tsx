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

const SelectedPosition = ({ getPositionId, validatePosition, value }: any) => {
    // State
    const [loading, setLoading] = useState(false);
    const [fetchResponse, setFetchResponse] = useState<Response>();

    const fetchData = async () => {
        try {
            setLoading(true);

            const dataResponse = await axios.get("/position/getAll");

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
            <Form.Label>Position</Form.Label>

            {validatePosition && (
                <p className="validation-custom">{validatePosition}</p>
            )}

            {defaultValue === "DEFAULT" &&
            value !== defaultValue &&
            value === null ? (
                <LoaderRotatingLines />
            ) : (
                <Form.Select
                    value={defaultValue}
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
                    {fetchResponse?.response.map((position: any, i: any) => (
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
