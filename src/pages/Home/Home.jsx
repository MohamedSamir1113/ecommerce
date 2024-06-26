import { useEffect, useState } from "react";
import ProductItem from "../../components/ProductItem/ProductItem";
import img1 from "../../assets/images/slider-image-1.jpeg";
import img2 from "../../assets/images/slider-image-2.jpeg";
import img3 from "../../assets/images/slider-image-3.jpeg";
import Slider from "react-slick";
function Home() {
  const [products, setProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  useEffect(function () {
    async function getAllProducts() {
      try {
        setIsLoading(true);
        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/products"
        );
        const data = await res.json();
        setProducts(data.data);

        console.log(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getAllProducts();
  }, []);

  const settings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode:true
  };
  return (
    <>
      <div className="container mt-5">
        {isLoading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <p>loading....</p>
          </div>
        ) : (
          <>
           <div className="py-4">
           <Slider {...settings}>
              <div>
                <img src={img1} className="w-100" alt="Image1" />
              </div>
              <div>
                <img src={img2} className="w-100" alt="Image2" />
              </div>
              <div>
                <img src={img3} className="w-100" alt="Image3" />
              </div>
              {/* Add more images as needed */}
            </Slider>
           </div>
            <div className="row mt-2 g-3">
              {products.map((product) => (
                <ProductItem product={product} key={product.id} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Home;
