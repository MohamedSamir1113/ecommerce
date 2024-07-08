import ProductItem from "../ProductItem/ProductItem";
import { useQuery } from "react-query";
import Spinner from "../Spinner";
function FeaturedProducts() {
  // const [products, setProducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  async function getFeturedProducts() {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/products");
    const data = await res.json();
    return data;
  }

  let { isLoading, data } = useQuery("feturedProducts", getFeturedProducts);


  // useEffect(function () {
  //   async function getAllProducts() {
  //     try {
  //       setIsLoading(true);
  //       const res = await fetch(
  //         "https://ecommerce.routemisr.com/api/v1/products"
  //       );
  //       const data = await res.json();
  //       setProducts(data.data);

  //       console.log(data.data);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   getAllProducts();
  // }, []);

  return (
    <>
      <div className="container my-5">
        {isLoading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <Spinner size={"3x"} />
          </div>
        ) : (
          <>
            <h1>featured products</h1>
            <div className="row mt-2 g-3">
              {data?.data.map((product) => (
                <ProductItem product={product} key={product.id} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default FeaturedProducts;
