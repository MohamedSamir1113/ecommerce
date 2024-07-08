import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "./cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer.cart);
  const loading = useSelector((state) => state.cartReducer.loading);
  const error = useSelector((state) => state.cartReducer.error);

  console.log(cart.products);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (loading === "loading") {
    return <div className=" vh-100 d-flex justify-content-center align-items-center">Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Cart</h1>
      {cart.products && cart.products.length > 0 ? (
        <ul>
          {cart.products.map((item) => (
            <li key={item._id}>
              {item.product.title} 
            </li>
          ))}
        </ul>
      ) : (
        <div>Your cart is empty</div>
      )}
    </div>
  );
}

export default Cart;
