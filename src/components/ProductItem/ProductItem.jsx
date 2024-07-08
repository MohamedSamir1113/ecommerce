import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import styles from "./ProductItem.module.css";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../Cart/cartSlice";
function ProductItem({ product }) {
  const {imageCover,category: { name },title,price,ratingsAverage,id,} = product;
  const mainTitle = title.split(" ").splice(0, 2).join(" ");
  const dispatch = useDispatch();

  async function handleAddToCart(e, id) {
    e.stopPropagation();
    e.preventDefault();

    try {
      const result = dispatch(addProductToCart(id));
      toast.success(result.payload.message);
    } catch (error) {
      toast.error("Error adding item to cart");
    }
  }

  return (
    <>
      <Link className={`p-0 m-0 col-md-2`} style={{ textDecoration: "none", color: "black" }} to={`/product-details/${id}`}>
        <div className={`m-2 ${styles.card}`}>
          <img className="w-100" src={imageCover} alt={name} />
          <div className=" mt-2">
            <span className="bg-warning">{name}</span>
            <p>{mainTitle}</p>
          </div>
          <div className="d-flex justify-content-between ">
            <span>{price} L.E</span>
            <span>
              {ratingsAverage}
              <FontAwesomeIcon className="text-warning ps-1" icon={faStar} />
            </span>
          </div>
          <button onClick={(e) => handleAddToCart(e, id)} className={`btn btn-success w-100 mt-3 ${styles.cartBtn}`}>
            add to cart
          </button>
        </div>
      </Link>
    </>
  );
}

export default ProductItem;
