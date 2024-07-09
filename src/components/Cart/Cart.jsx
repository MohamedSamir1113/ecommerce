import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "./cartSlice";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer.cart);
  const totalCartPrice = useSelector(
    (state) => state.cartReducer.totalCartPrice
  );
  const loading = useSelector((state) => state.cartReducer.loading);
  const error = useSelector((state) => state.cartReducer.error);

  console.log(totalCartPrice);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (loading === "loading") {
    return (
      <div className=" vh-100 d-flex justify-content-center align-items-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-2 container" style={{ backgroundColor: "#f0f3f2" }}>
      <h1>Shop Cart:</h1>
      <p className="text-success">total Cart Price :{totalCartPrice} EGP</p>
      {cart.products && cart.products.length > 0 ? (
        <div className="mb-3 row">
          {cart.products.map((item, i) => (
            <>
              <div className="col-md-12 gy-3">
                <div className="row">
                <div className="col-md-7 d-flex">
                  <img style={{width:"100px",height:"100px"}} src={item.product.imageCover} alt="" />
                  <div className=" ms-3">
                    <h5>{item.product.title}</h5>
                    <p className="text-success">Price : {item.price} EGP</p>
                    <div style={{width:"fit-content",cursor:"pointer"}}  >
                      <FontAwesomeIcon className="text-danger pe-1" icon={faTrashCan}/>
                      remove
                    </div>
                  </div>
                </div>
                <div className="col-md-5 bg-info">
                  hello
                </div>
                </div>
              </div>
            
            </>
          ))}
        </div>
      ) : (
        <div>Your cart is empty</div>
      )}
    </div>
  );
}

export default Cart;
