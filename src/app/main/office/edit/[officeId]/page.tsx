import EditOfficePage from "@/pages/main/office/edit/page";
import React from "react";

const EditOfficeId = ({ params }: { params: { officeId: string } }) => {
    return (
        <div>
            <EditOfficePage officeId={params.officeId} />
        </div>
    );
};

export default EditOfficeId;
