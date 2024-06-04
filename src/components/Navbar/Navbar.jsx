import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import logo from "../../assets/images/freshcart-logo.svg";

function Navbar() {

  const storedToken = localStorage.getItem('userToken');
const navigate=useNavigate()
  
function logOut() {
  localStorage.removeItem('userToken');
  navigate("/login");
}
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <div className="container-fluid">
              <Link to="/" className="navbar-brand">
                <img src={logo} alt="" />
              </Link>
            </div>

          {storedToken&&<>
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
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Cart
              </Link>
            </li>
          </>}
          </ul>

          <ul className="navbar-nav ms-auto">
            <li className="nav-item d-flex align-items-center">
              <FontAwesomeIcon className="pe-4" icon={faFacebook} />
              <FontAwesomeIcon className="pe-4" icon={faTiktok} />
              <FontAwesomeIcon className="pe-4" icon={faWhatsapp} />
              <FontAwesomeIcon className="pe-4" icon={faTwitter} />
            </li>
            {storedToken===null && (
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
            {storedToken&&<li className="nav-item">
              <Link className="nav-link" onClick={()=>logOut()}>Logout</Link>
            </li>}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
