import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import Categories from "./components/Categories/Categories";
import Notfound from "./pages/NotFound/Notfound";
import Brands from "./components/Brands/Brands";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductDetails from "./pages/ProductDetails/ProductDetails";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index:true,
          element: <ProtectedRoute><Home /></ProtectedRoute>,
        },
        {
          path: "login",
          element: <Login/>,
        },
        {
          path: "register",
          element: <Register/>,
        },
        {
          path: "products",
          element: <ProtectedRoute><Products/></ProtectedRoute>,
        },
        {
          path: "cart",
          element: <ProtectedRoute><Cart/></ProtectedRoute>,
        },
        {
          path: "categories",
          element: <ProtectedRoute><Categories/></ProtectedRoute>,
        },
        {
          path: "brands",
          element:<ProtectedRoute><Brands/></ProtectedRoute>,
        },
        {
          path: "product-details/:id",
          element:<ProtectedRoute><ProductDetails/></ProtectedRoute>,
        },
        {
          path: "*",
          element: <Notfound/>,
        },
      ],
    },
  ]);
  return <div className="App">
    <RouterProvider router={router}/>
  </div>;
}

export default App;
