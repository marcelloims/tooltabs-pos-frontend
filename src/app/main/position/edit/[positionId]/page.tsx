import React from "react";
import EditPositionPage from "../../../../../pages/main/postion/edit/page";

const EditPositionId = ({ params }: { params: { positionId: string } }) => {
    return (
        <div>
            <EditPositionPage positionId={params.positionId} />
        </div>
    );
};

export default EditPositionId;
