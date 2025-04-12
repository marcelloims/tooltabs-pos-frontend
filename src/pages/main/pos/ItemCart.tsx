"use client";
import { formatToCurrency } from "@/lib/customFunction";
import { useCart } from "react-use-cart";
import { usePathname, useRouter } from "next/navigation";
const ItemCart = (props: any) => {
    // for route
    const router = useRouter();

    // cart
    const { addItem } = useCart();
    return (
        <>
            <div className="card mr-3 ml-3" style={{ width: "21rem" }}>
                <img
                    src={props.image1}
                    className="card-img-top"
                    alt="..."
                    style={{
                        width: "200px",
                        height: "200px",
                        margin: "auto",
                        marginTop: "30px",
                    }}
                />
                <div className="card-body text-center">
                    <h6 className="card-title">
                        <b>{props.name}</b>
                    </h6>
                    <h5 className="card-title">
                        {formatToCurrency(String(props.price))}
                    </h5>
                    <button
                        className="btn btn-sm btn-success"
                        onClick={() => addItem(props.item)}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </>
    );
};

export default ItemCart;
