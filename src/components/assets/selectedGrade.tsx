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

const SelectedGrade = ({ getGradeId, validateGrade, value }: any) => {
    // State
    const [loading, setLoading] = useState(false);
    const [fetchResponse, setFetchResponse] = useState<Response>();

    const fetchData = async () => {
        try {
            setLoading(true);

            const dataResponse = await axios.get("/grade/getAll");

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
            <Form.Label>Grade</Form.Label>

            {validateGrade && (
                <p className="validation-custom">{validateGrade}</p>
            )}

            {defaultValue === "DEFAULT" &&
            value !== defaultValue &&
            value === null ? (
                <LoaderRotatingLines />
            ) : (
                <Form.Select
                    defaultValue={defaultValue}
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
                    {fetchResponse?.response.map((grade: any, i: any) => (
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
