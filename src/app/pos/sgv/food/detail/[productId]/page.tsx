import FoodDetailPage from "@/pages/pos/sgv/food/detail/page";
import React from "react";

const DetailFoodId = ({ params }: { params: { productId: string } }) => {
    return (
        <div>
            <FoodDetailPage productId={params.productId} />
        </div>
    );
};

export default DetailFoodId;
