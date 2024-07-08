import axios from "axios"
import { useQuery } from "react-query";

function Brands() {
    async function getBrands() {
        const response = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
       
        return response.data
    }

    const{data}=useQuery("getBrands",getBrands);
    console.log(data?.data);
    return (
        <div>
            
        </div>
    )
}

export default Brands
