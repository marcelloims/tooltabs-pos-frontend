import EditDepartmentPerPositionPage from "@/pages/main/department_per_position/edit/page";
import React from "react";

const EditDepartmentPerPositionId = ({
    params,
}: {
    params: { departmentPerPositionId: string };
}) => {
    return (
        <div>
            <EditDepartmentPerPositionPage
                departmentPerPositionId={params.departmentPerPositionId}
            />
        </div>
    );
};

export default EditDepartmentPerPositionId;
