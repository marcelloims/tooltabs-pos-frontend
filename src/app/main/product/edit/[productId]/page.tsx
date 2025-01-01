import EditProductPage from "@/pages/main/product/edit/page";
import React from "react";

const EditProductId = ({ params }: { params: { productId: string } }) => {
    return (
        <div>
            <EditProductPage productId={params.productId} />
        </div>
    );
};

export default EditProductId;
