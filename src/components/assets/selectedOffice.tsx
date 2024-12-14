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

const SelectedOffice = ({ getOfficeId, validateOffice, value }: any) => {
    // State
    const [loading, setLoading] = useState(false);
    const [fetchResponse, setFetchResponse] = useState<Response>();

    const fetchData = async () => {
        try {
            setLoading(true);
            const dataResponse = await axios.get("/office/getAll");

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
            <Form.Label>Office</Form.Label>

            {validateOffice && (
                <p className="validation-custom">{validateOffice}</p>
            )}

            {defaultValue === "DEFAULT" &&
            value !== defaultValue &&
            value === null ? (
                <LoaderRotatingLines />
            ) : (
                <Form.Select
                    value={defaultValue}
                    onChange={(event: any) => {
                        getOfficeId(event.target.value);
                    }}
                    className={
                        "bg-text-custom " + (validateOffice ? "is-invalid" : "")
                    }
                    style={{ color: "#0a2d3d" }}
                >
                    <option value="DEFAULT" disabled>
                        select a Office
                    </option>
                    {fetchResponse?.response.map((office: any, i: any) => (
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
