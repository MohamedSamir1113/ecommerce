import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../components/Cart/cartSlice";

function ProductDetails() {
  const { id } = useParams(); // Receive the params from the URL
  const [productDetails, setProductDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const dispatch = useDispatch();
  const message = useSelector((store) => store.cartReducer.message);
  useEffect(() => {
    async function getProductDetails() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://ecommerce.routemisr.com/api/v1/products/${id}`
        );
        const data = await res.json();
        setProductDetails(data.data);
        console.log(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getProductDetails();
  }, [id]);

  const { title, description, price, ratingsAverage, category, images } =
    productDetails;
  const settings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  function handleAddToCart(productId) {
    dispatch(addProductToCart(productId));
    console.log(message);
  }

  return (
    <div>
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <div className="row container py-2 mx-auto align-items-center">
            <div className="col-md-5 pb-3">
              {isImageLoading && (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "100%" }}
                >
                  <p>Loading image...</p>
                </div>
              )}
              <Slider {...settings}>
                <div>
                  <img
                    src={images?.at(0)}
                    className="w-100"
                    alt={title}
                    style={{ display: isImageLoading ? "none" : "block" }}
                    onLoad={() => setIsImageLoading(false)}
                    onError={() => setIsImageLoading(false)}
                  />
                </div>
                <div>
                  <img
                    src={images?.at(1)}
                    className="w-100"
                    alt={title}
                    style={{ display: isImageLoading ? "none" : "block" }}
                    onLoad={() => setIsImageLoading(false)}
                    onError={() => setIsImageLoading(false)}
                  />
                </div>
                <div>
                  <img
                    src={images?.at(2)}
                    className="w-100"
                    alt={title}
                    style={{ display: isImageLoading ? "none" : "block" }}
                    onLoad={() => setIsImageLoading(false)}
                    onError={() => setIsImageLoading(false)}
                  />
                </div>
                <div>
                  <img
                    src={images?.at(3)}
                    className="w-100"
                    alt={title}
                    style={{ display: isImageLoading ? "none" : "block" }}
                    onLoad={() => setIsImageLoading(false)}
                    onError={() => setIsImageLoading(false)}
                  />
                </div>
                {/* Add more images as needed */}
              </Slider>
            </div>
            <div className="col-md-7">
              <div>
                <h5>{title}</h5>
                <p className="text-muted py-3">{description}</p>
                <span className="bg-warning mb-4 px-4">{category?.name}</span>
                <div className="d-flex justify-content-between px-4">
                  <span>{price} L.E</span>
                  <span>
                    {ratingsAverage}
                    <FontAwesomeIcon
                      className="text-warning ps-1"
                      icon={faStar}
                    />
                  </span>
                </div>
                <button
                  onClick={() => handleAddToCart(id)}
                  className="btn btn-success mt-2 w-100"
                >
                  + add to cart
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductDetails;
