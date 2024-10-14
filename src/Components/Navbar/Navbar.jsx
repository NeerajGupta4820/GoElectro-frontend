import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/slices/userSlice";
import { clearCart } from "../../redux/slices/cartSlice";
import { useAddToCartMutation } from "../../redux/api/cartApi"; 
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Navbar.css";
import { FaRegUser } from "react-icons/fa";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user) || JSON.parse(localStorage.getItem('user'));
  const cartItems = useSelector((state) => state.cart.cartItems); 

  const [addToCart] = useAddToCartMutation(); 

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchItem, setSearchItem] = useState("");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleSearchChange = (e) => {
    setSearchItem(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search Item:", searchItem);
  };

  const logoutUser = async () => {
    try {
      const updatedCartItems = cartItems
        .filter(item => item.product) 
        .map(item => ({
          productId: item.product._id,
          quantity: item.quantity,
        }));
      if (updatedCartItems.length > 0) {
        await addToCart({ updatedCartItems }).unwrap();
        console.log("Cart updated successfully.");
      } else {
        console.log("No valid cart items to update.");
      }
      dispatch(clearCart());
      dispatch(clearUser());
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      console.error("Failed to update cart before logout:", error);
      toast.error("Failed to update cart. Please try again.");
    }
  };
  
  

  const handleProfileRedirect = () => {
    if (user.role === "admin") {
      navigate("/admin"); 
    } else {
      navigate("/profile");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">MyLogo</Link>
        </div>
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <input
            className="search-input"
            type="text"
            value={searchItem}
            onChange={handleSearchChange}
            placeholder="Search..."
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
        <ul className={`navbar-links ${isMobileMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          {!user ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          ) : (
            <>
              <li style={{ color: "white", cursor: "pointer" }} onClick={logoutUser}>
                Logout
              </li>
              <li style={{ cursor: "pointer", color: "white" }} onClick={handleProfileRedirect}>
                <FaRegUser />
              </li>
            </>
          )}
        </ul>
        <div className="menu-icon" onClick={toggleMobileMenu}>
          <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"}`}></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
