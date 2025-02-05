import EditProductPerOfficePage from "@/pages/main/ProductPerOffice/edit/page";
import React from "react";

const EditProductPerOfficeId = ({
    params,
}: {
    params: { productPerOfficeId: string };
}) => {
    return (
        <div>
            <EditProductPerOfficePage
                productPerOfficeId={params.productPerOfficeId}
            />
        </div>
    );
};

export default EditProductPerOfficeId;
