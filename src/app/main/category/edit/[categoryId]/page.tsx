import EditCategoryPage from "@/pages/main/category/edit/page";
import React from "react";

const EditCategoryId = ({ params }: { params: { categoryId: string } }) => {
    return (
        <div>
            <EditCategoryPage categoryId={params.categoryId} />
        </div>
    );
};

export default EditCategoryId;
