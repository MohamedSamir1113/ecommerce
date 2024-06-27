import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

function ProductDetails() {
  const { id } = useParams(); // Receive the params from the URL
  const [productDetails, setProductDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    async function getProductDetails() {
      try {
        setIsLoading(true);
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
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

  const { imageCover, title, description, price, ratingsAverage, category } = productDetails;

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
            <div className="col-md-5">
              {isImageLoading && (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                  <p>Loading image...</p>
                </div>
              )}
              <img
                className="w-100"
                src={imageCover}
                alt={title}
                style={{ display: isImageLoading ? 'none' : 'block' }}
                onLoad={() => setIsImageLoading(false)}
                onError={() => setIsImageLoading(false)} // To handle error in loading the image
              />
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
                    <FontAwesomeIcon className="text-warning ps-1" icon={faStar} />
                  </span>
                </div>
                <button className="btn btn-success mt-2 w-100">+ add to cart</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductDetails;
