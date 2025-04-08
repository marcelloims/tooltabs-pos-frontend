import EditAccessRolePage from "@/pages/main/access_role/edit/page";
import React from "react";

const Edit = ({ params }: { params: { accessroleId: string } }) => {
    return (
        <div>
            <EditAccessRolePage accessroleId={params.accessroleId} />
        </div>
    );
};

export default Edit;
