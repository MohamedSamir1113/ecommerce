import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/images/freshcart-logo.svg";
import { useSelector } from "react-redux";


function Navbar() {
  const storedToken = localStorage.getItem("userToken");
  const navigate = useNavigate();
 const numOfItems = useSelector(store=>store.cartReducer.numOfItems)
  const logOut = (event) => {
    event.preventDefault();
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="FreshCart Logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {storedToken && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/products">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/brands">
                    Brands
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/categories">
                    Categories
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    Cart
                  </Link>
                </li> */}
                <li className="nav-item">
                  <Link className="nav-link position-relative" to="/cart">
                  <FontAwesomeIcon style={{color:"green"}} icon={faCartShopping} />
                  <div className="position-absolute" style={{top:"0px",right:"0px",fontWeight:"bolder",zIndex:"99"}}>{numOfItems}</div>
                  </Link>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 pe-5">
         
            <li className="nav-item d-flex align-items-center">
              <FontAwesomeIcon className="pe-4" icon={faFacebook} />
              <FontAwesomeIcon className="pe-4" icon={faTiktok} />
              <FontAwesomeIcon className="pe-4" icon={faWhatsapp} />
              <FontAwesomeIcon className="pe-4" icon={faTwitter} />
            </li>
            {!storedToken && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
            {storedToken && (
              <li className="nav-item dropdown pe-4">
                <Link
                  className="nav-link dropdown-toggle d-flex justify-content-md-center align-items-center"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon={faUser} className="pe-2" />
                 Modi
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="nav-link" onClick={(e) => logOut(e)}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
