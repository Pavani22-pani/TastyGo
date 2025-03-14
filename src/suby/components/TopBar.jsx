// import React, { useState, useEffect } from 'react';
// import { FaUserCircle, FaShoppingCart } from "react-icons/fa";

// const TopBar = ({ showTempHandler, showProfileHandler, token }) => {
//   const [cartCount, setCartCount] = useState(0);

//   useEffect(() => {
//     const fetchCartCount = () => {
//       const userCart = JSON.parse(localStorage.getItem("cart")) || [];
//       setCartCount(userCart.reduce((total, item) => total + item.quantity, 0));
//     };

//     fetchCartCount();

//     // Listen for cart updates
//     window.addEventListener("cartUpdate", fetchCartCount);
//     return () => window.removeEventListener("cartUpdate", fetchCartCount);
//   }, []);

//   return (
//     <section className="topBarSection">
//       <div className="companyTitle">
//         <h2>SUBY</h2>
//       </div>

//       <div className="topBarIcons">
//         {/* Cart Icon with Item Count */}
//         <div className="cartIcon">
//           <FaShoppingCart />
//           {cartCount > 0 && <span className="cartBadge">{cartCount}</span>}
//         </div>

//         {/* User Profile Icon */}
//         <FaUserCircle className="loginIcon" onClick={token ? showProfileHandler : showTempHandler} />
//       </div>
//     </section>
//   );
// };

// export default TopBar;



import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';


const TopBar = ({ showTempHandler, showProfileHandler, token}) => {
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = () => {
    const  userCart= JSON.parse(localStorage.getItem("cart") || "[]");

    setCartCount(userCart.reduce((total, item) => total + item.quantity, 0));
  };

  useEffect(() => {
    if(token){
      fetchCartCount()
    }
    else{
      setCartCount(0)
    }

    // Listen for cart updates
    window.addEventListener("cartUpdate", fetchCartCount);
    return () => window.removeEventListener("cartUpdate", fetchCartCount);
  }, [token]);

  return (
    <section className="topBarSection">
      <div className="companyTitle">
        <Link to="/" className="link">
           <h2>TastyGo</h2>
        </Link>
      </div>
      <div className="topBarIcons">
        {/* Cart Icon with Item Count */}
        <Link to="cart" className='link'>
          <div className="cartIcon">
            <FaShoppingCart />
            {cartCount > 0 && <span className="cartBadge">{cartCount}</span>}
          </div>
        </Link>

        {/* User Profile Icon */}
        <FaUserCircle className="loginIcon" onClick={token ? showProfileHandler : showTempHandler} />
      </div>
    </section>
  );
};

export default TopBar;
