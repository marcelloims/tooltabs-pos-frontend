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
            <div className="card mr-3" style={{ width: "24rem" }}>
                <img
                    src={props.image1}
                    className="card-img-top"
                    alt="..."
                    style={{
                        width: "300px",
                        height: "300px",
                        margin: "auto",
                        marginTop: "30px",
                    }}
                />
                <div className="card-body text-center">
                    <h5 className="card-title">
                        <b>{props.name}</b>
                    </h5>
                    <h5 className="card-title">
                        {formatToCurrency(String(props.price))}
                    </h5>
                    <a
                        onClick={() => {
                            router.push("/main/pos/detail/" + props.id);
                        }}
                        className="btn btn-sm btn-primary mr-1"
                    >
                        Detail
                    </a>
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
