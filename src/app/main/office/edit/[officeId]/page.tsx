import EditPage from "@/pages/main/office/edit/page";
import React from "react";

const OfficeId = ({ params }: { params: { officeId: string } }) => {
    return (
        <div>
            <EditPage officeId={params.officeId} />
        </div>
    );
};

export default OfficeId;
