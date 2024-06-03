import { Navigate } from "react-router";

function ProtectedRoute({children}) {
  
  if (localStorage.getItem("userToken") !== null) {
    return children
  }
 else{
    return <Navigate to="/login"/> //bec it will be returned 
 }
}

export default ProtectedRoute;
