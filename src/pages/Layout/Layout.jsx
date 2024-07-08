import { Outlet } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet></Outlet>
      <Footer/>
    </div>
  );
}

export default Layout;
