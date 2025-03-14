// import React, { useState, useEffect } from "react";
// import TopBar from './Topbar';
// import Profile from "../components/Profile";
// import { API_URL } from "../api";

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [productNames, setProductNames] = useState({});
//   const [productImages, setProductImages] = useState({});
//   const [productPrizes, setProductPrizes] = useState({});
//   const [showProfile, setShowProfile] = useState(false);
//   const [token, setToken] = useState(null);

//   useEffect(() => {
//     const fetchProductNames = async () => {
//       const names = {};
//       const images = {};
//       const prizes = {};

//       for (const item of cartItems) {
//         try {
//           const response = await fetch(`${API_URL}/product/single-product/${item.product}`);
//           const data = await response.json();

//           if (data && data.productName && data.image && data.price) {
//             names[item.product] = data.productName;
//             images[item.product] = data.image;
//             prizes[item.product] = data.price;
//           } else {
//             names[item.product] = "Unknown Product";
//             images[item.product] = "/images/default-product.png"; // Fallback image
//             prizes[item.product] = "N/A";
//           }
//         } catch (error) {
//           console.error(`Failed to fetch product: ${item.product}`, error);
//           names[item.product] = "Unknown Product";
//           images[item.product] = "/images/default-product.png";
//           prizes[item.product] = "N/A";
//         }
//       }

//       setProductNames(names);
//       setProductImages(images);
//       setProductPrizes(prizes);
//     };

//     if (cartItems.length > 0) {
//       fetchProductNames();
//     }
//   }, [cartItems]);

//   useEffect(() => {
//     const loginToken = localStorage.getItem("userLoginToken");
//     if (loginToken) {
//       setToken(loginToken);
//     }
//   }, []);

//   useEffect(() => {
//     try {
//       const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//       setCartItems(storedCart);
//     } catch (error) {
//       console.error("Error parsing cart data:", error);
//       setCartItems([]);
//     }
//   }, []);

//   const showProfileHandler = () => setShowProfile(true);

//   const logoutHandler = () => {
//     localStorage.removeItem("userLoginToken");
//     setToken(null);
//     setShowProfile(false);
//   };

//   return (
//     <>
//       <TopBar showProfileHandler={showProfileHandler} token={token} />
//       {showProfile && (
//         <Profile onClose={() => setShowProfile(false)} logoutHandler={logoutHandler} />
//       )}

//       <div className="cartSection">
//         <h1>Your Cart</h1>
//         {cartItems.map((item) => (
//           <div className="cartBox" key={item.product || item.name}>
//             <div className="cartGroup">
//               {/* <img src={productImages[item.product]} alt={productNames[item.product]} /> */}
//                 <img src={`${API_URL}${productImages[item.product]}`} />
//               <div>
//                 <h3>{productNames[item.product] || "Loading..."}</h3>
//                 <p>Price: ₹{productPrizes[item.product]}</p>
//                 <p>Quantity: {item.quantity}</p>
//               </div>
//             </div>
//           </div>
//         ))}

//         {cartItems.length > 0 && (
//           <button className="placeOrderBtn">
//             Place Order
//           </button>
//         )}
//       </div>
//     </>
//   );
// };

// export default Cart;


import React, { useState, useEffect } from "react";
import TopBar from './TopBar';
import Profile from "../components/Profile";
import { API_URL } from "../api";
import PlaceOrder from "../components/PlaceOrder";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [productNames, setProductNames] = useState({});
  const [productImages, setProductImages] = useState({});
  const [productPrizes, setProductPrizes] = useState({});
  const [showProfile, setShowProfile] = useState(false);
  const [token, setToken] = useState(null);
  const [showPlaceOrder, setShowPlaceOrder] = useState(false)

  useEffect(() => {
    const fetchProductNames = async () => {
      const names = {};
      const images = {};
      const prizes = {};

      for (const item of cartItems) {
        try {
          const response = await fetch(`${API_URL}/product/single-product/${item.product}`);
          const data = await response.json();

          if (data && data.productName && data.image && data.price) {
            names[item.product] = data.productName;
            images[item.product] = data.image;
            prizes[item.product] = data.price;
          } else {
            names[item.product] = "Unknown Product";
            images[item.product] = "/images/default-product.png";
            prizes[item.product] = "N/A";
          }
        } catch (error) {
          console.error(`Failed to fetch product: ${item.product}`, error);
          names[item.product] = "Unknown Product";
          images[item.product] = "/images/default-product.png";
          prizes[item.product] = "N/A";
        }
      }

      setProductNames(names);
      setProductImages(images);
      setProductPrizes(prizes);
    };

    if (cartItems.length > 0) {
      fetchProductNames();
    }
  }, [cartItems]);
  

  useEffect(() => {
    const loginToken = localStorage.getItem("userLoginToken");
    if (loginToken) {
      setToken(loginToken);
    }
  }, []);

  useEffect(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(storedCart);
    } catch (error) {
      console.error("Error parsing cart data:", error);
      setCartItems([]);
    }
  }, []);

  // 🚨 Remove Item Handler
  const removeItemHandler = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/user/cart/remove/${localStorage.getItem("userId")}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ productId })
      })
      const data = await response.json()
      if (response.ok) {
        alert("Item Removed successfully")
        setCartItems(data.cart);
        localStorage.setItem("cart", JSON.stringify(data.cart))
      }
      else {
        alert(data.message || "Failed to remove Item")
      }
    } catch (error) {
      alert("Error removing item form cart")
    }
  };
  const incrementQuantityHandler = async (productId) => {
    const updatedCart = cartItems.map((item) =>
      item.product === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // 🚨 Quantity Decrement Handler
  const decrementQuantityHandler = async (productId) => {
    const updatedCart = cartItems.map((item) =>
      item.product === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // 🚨 Clear Entire Cart
  const clearCartHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/user/cart/clear/${localStorage.getItem("userId")}`, {
        method: "DELETE"
      });

      if (response.ok) {
        alert("Cart cleared successfully");
        setCartItems([]);
        localStorage.removeItem("cart");
      } else {
        alert("Failed to clear cart");
      }
    } catch (error) {
      alert("Error clearing cart");
    }
  };


  const showProfileHandler = () => {
    setShowProfile(true);
    setShowPlaceOrder(false)
  }
  const showPlaceOrderHandler = () => {
    setShowProfile(false);
    setShowPlaceOrder(true)
  }


  const logoutHandler = () => {
    localStorage.removeItem("userLoginToken");
    setToken(null);
    setShowProfile(false);
  };

  return (
    <>
      <TopBar showProfileHandler={showProfileHandler} token={token} />
      {showProfile && (
        <Profile onClose={() => setShowProfile(false)} logoutHandler={logoutHandler} />
      )}

      <div className="cartSection">
        <h1>Your Cart</h1>
        {cartItems.map((item) => (
          <div className="cartBox" key={item.product || item.name}>
            <div className="cartGroup">
              <img src={`${API_URL}${productImages[item.product]}`} alt={productNames[item.product]} />
              <div>
                <h3>{productNames[item.product] || "Loading..."}</h3>
                <p>Price: ₹{productPrizes[item.product] * item.quantity}</p>

                {/* 🚨 Quantity Control Buttons */}
                <div className="quantityControls">
                  <button onClick={() => decrementQuantityHandler(item.product)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => incrementQuantityHandler(item.product)}>+</button>
                </div>

                {/* 🚨 Remove Button Added */}
                <button
                  className="removeBtn"
                  onClick={() => removeItemHandler(item.product)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}

        {cartItems.length > 0 && (
          <div className="clearOrderSection">

            <button className="clearCartBtn" onClick={clearCartHandler}>
              Clear Cart
            </button>
            <button className="placeOrderBtn" onClick={showPlaceOrderHandler}>
              Place Order
            </button>
          </div>
        )}
        {cartItems.length === 0 && <h2 className="emptyCart">!------Your cart is empty.-------!</h2>}
      </div>
      {showPlaceOrder && (
        <>
          <div className="overlay" onClick={() => setShowPlaceOrder(false)}></div>
          <PlaceOrder onClose={() => setShowPlaceOrder(false)} clearCartHandler={clearCartHandler}/>
        </>
      )}


    </>
  );
};

export default Cart;
