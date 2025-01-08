import EditTypePage from "@/pages/main/type/edit/page";
import React from "react";

const EditTypeId = ({ params }: { params: { typeId: string } }) => {
    return (
        <div>
            <EditTypePage typeId={params.typeId} />
        </div>
    );
};

export default EditTypeId;
