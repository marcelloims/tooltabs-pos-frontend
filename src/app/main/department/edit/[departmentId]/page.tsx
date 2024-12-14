import EditDepartmentPage from "@/pages/main/department/edit/page";
import React from "react";

const EditDepartmentId = ({ params }: { params: { departmentId: string } }) => {
    return (
        <div>
            <EditDepartmentPage positionId={params.departmentId} />
        </div>
    );
};

export default EditDepartmentId;
