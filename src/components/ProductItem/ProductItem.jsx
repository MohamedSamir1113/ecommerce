import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function ProductItem({ product }) {
  const {
    images,
    category: { name },
    title,
    price,
    ratingsAverage,
    id
  } = product;
  const mainTitle = title.split(" ").splice(0, 2).join(" ");
  return (
    <>
      <Link  className="p-0 m-0 col-md-4" style={{textDecoration:"none",color:"black"}} to={`/product-details/${id}`} >
        <div className="m-2">
          <img className="w-100" src={images[0]} alt="" />
          <div className="px-4 mt-2">
          <span className="bg-warning">{name}</span>
          <p>{mainTitle}</p>
          </div>
          <div className="d-flex justify-content-between px-4">
            <span>{price} L.E</span>
            <span>
              {ratingsAverage}
              <FontAwesomeIcon className="text-warning ps-1" icon={faStar} />
            </span>
          </div>
        </div>
      </Link>
    </>
  );
}

export default ProductItem;
