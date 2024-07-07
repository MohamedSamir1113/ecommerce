import { useSelector } from "react-redux";

function Cart() {
  const cart = useSelector((store) => store.cartReducer.cart);
  const cartProducts = cart.products || []; // handle undefined cart properly

  

  return (
    <div>
      {cartProducts.length > 0 ? 
      (
        <ul>
          {cartProducts.map((product, index) => (
            <li key={index}>
              Product ID: {product.product}, Count: {product.count}, Price: {product.price}
            </li>
          ))}
        </ul>
      ) : 
      (
        <p>No products in the cart</p>
      )}
    </div>
  );
}

export default Cart;
