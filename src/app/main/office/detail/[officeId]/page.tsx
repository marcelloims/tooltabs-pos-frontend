import DetailOfficePage from "@/pages/main/office/detail/page";
import React from "react";

const DetailOfficeId = ({ params }: { params: { officeId: string } }) => {
    return (
        <div>
            <DetailOfficePage officeId={params.officeId} />
        </div>
    );
};

export default DetailOfficeId;
