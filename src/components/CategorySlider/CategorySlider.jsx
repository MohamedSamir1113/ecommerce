import { useQuery } from "react-query";

function CategorySlider() {
async function getCategories() {
const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories");
const data = await res.json();
return data;    
}
const {data,isLoading}=useQuery("categories",getCategories);
console.log(data);
    return (
        <div>
            CategorySlider
        </div>
    )
}

export default CategorySlider