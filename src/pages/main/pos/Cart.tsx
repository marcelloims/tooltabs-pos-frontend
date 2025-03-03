"use client";
import { formatToCurrency } from "@/lib/customFunction";
import React from "react";
import { useCart } from "react-use-cart";

const CartPage = () => {
    const public_path = "http://127.0.0.1:8000/product/";

    const {
        isEmpty,
        totalUniqueItems,
        items,
        totalItems,
        cartTotal,
        updateItemQuantity,
        removeItem,
        emptyCart,
    } = useCart();

    if (isEmpty) {
        return <h1 className="text-center">Your Cart Is Empty</h1>;
    }

    return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-header">
                        <h5>
                            Cart ({totalUniqueItems}) total items : (
                            {totalItems})
                        </h5>
                    </div>
                    <div className="card-body table-responsive">
                        <table className="table table-light table-hover m-0">
                            <thead>
                                <th>No</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Qty</th>
                            </thead>
                            <tbody>
                                {items.map((item: any, i: number) => {
                                    return (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>
                                                <img
                                                    src={
                                                        public_path +
                                                        item.image1
                                                    }
                                                    alt=""
                                                    width="150px"
                                                    height="150px"
                                                />
                                            </td>
                                            <td>{item.name}</td>
                                            <td>
                                                {formatToCurrency(item.price)}
                                            </td>
                                            <td>{item.quantity}</td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-info mr-2 mb-1"
                                                    onClick={() =>
                                                        updateItemQuantity(
                                                            item.id,
                                                            item.quantity - 1
                                                        )
                                                    }
                                                >
                                                    -
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-info mr-2 mb-1"
                                                    onClick={() =>
                                                        updateItemQuantity(
                                                            item.id,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() =>
                                                        removeItem(item.id)
                                                    }
                                                >
                                                    Del
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="card-footer text-right">
                        <div className="col-auto ms-auto">
                            <h2>
                                Total Price :{" "}
                                {formatToCurrency(String(cartTotal))}
                            </h2>
                        </div>
                        <div className="col-auto">
                            <button
                                className="btn btn-danger"
                                onClick={() => emptyCart()}
                            >
                                Clear Cart
                            </button>
                            <button className="btn btn-primary ml-2">
                                Order Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
