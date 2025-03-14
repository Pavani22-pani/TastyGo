// import React,{useState,useEffect} from "react"
// import { FaUserCircle } from "react-icons/fa";
// import { API_URL } from '../api'

// const Profile = ({ onClose, logoutHandler }) => {
//     const [profileData,setProfileData]=useState({})
//     const profileInfo=async()=>{
//         try {
//             const userId=localStorage.getItem("userId")
//             console.log(`API:${API_URL}`)
//             const response=await fetch(`${API_URL}/user/single-user/${userId}`)
//             const newProfileData=await response.json()
//             setProfileData(newProfileData)

//         } catch (error) {
//             alert("Profile data Not Fetched")
//             console.error("Profile data not fetched",error)
            
//         }
//     }
//     useEffect(()=>{
//         profileInfo()
//         const handleCartUpdate = () => {
//             profileInfo(); // Refetch profile data when cart updates
//         };
//         window.addEventListener("cartUpdate", handleCartUpdate);
//         return () => window.removeEventListener("cartUpdate", handleCartUpdate);
//     },[])

//     const handleLogout=()=>{
//         localStorage.removeItem("token");
//         localStorage.removeItem("userId");
//         localStorage.removeItem("cart"); // Clear the cart
//         window.dispatchEvent(new Event("cartUpdate")); // Trigger cart update event
//         logoutHandler(); // Call parent logout function
//         onClose(); // Close the profile modal
   
//     }
//     const localCart = JSON.parse(localStorage.getItem("cart")) || [];
//     return (
//         <div className="profile-modal-overlay" onClick={onClose}>
//         <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
//             <span className="close" onClick={onClose}>&times;</span>
//             <FaUserCircle className="loginIcon"></FaUserCircle>
//             <div className="profile-info">
//                 <p><strong>Name:</strong> {profileData.userName}</p>
//                 <p><strong>Email:</strong> {profileData.email}</p>
//                 <p><strong>Phone:</strong> {profileData.phone}</p>
//                 <p><strong>Address:</strong> {profileData.address}</p>
//                 <p><strong>Cart:</strong> {localCart.length || (profileData.cart ? profileData.cart.length : 0)} items</p>
//                 <p><strong>Orders:</strong> __________</p>
//             </div>
//             <button className="logout-btn" onClick={handleLogout}>Log Out</button>
//         </div>
//     </div>
//     )
// }

// export default Profile
import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { API_URL } from '../api';

const Profile = ({ onClose, logoutHandler }) => {
    const [profileData, setProfileData] = useState({});
    const [cartItems, setCartItems] = useState([]);
    const [productNames, setProductNames] = useState({});
    const [recentOrder, setRecentOrder] = useState(null);

    // 🚨 Fetch Profile Data
    const profileInfo = async () => {
        try {
            const userId = localStorage.getItem("userId");
            const response = await fetch(`${API_URL}/user/single-user/${userId}`);
            const newProfileData = await response.json();
            setProfileData(newProfileData);

            // Extract cart data from API response
            if (newProfileData.cart) {
                setCartItems(newProfileData.cart);
            }
        } catch (error) {
            alert("Profile data not fetched");
            console.error("Profile data not fetched", error);
        }
    };

    const fetchRecentOrder = async () => {
        try {
            const userId = localStorage.getItem("userId");
            const response = await fetch(`${API_URL}/order/recent-order/${userId}`);
            const recentOrderData = await response.json();
            setRecentOrder(recentOrderData);
        } catch (error) {
            console.log("Failed to fetch recent order", error);
            setRecentOrder(null);
        }
    };

    useEffect(() => {
        profileInfo();  // Fetch profile initially
        fetchRecentOrder(); // Fetch recent order initially

        // Listen for cart updates
        const handleCartUpdate = () => {
            profileInfo();  // Re-fetch profile when cart updates
            fetchRecentOrder(); // Re-fetch recent order
        };

        window.addEventListener("cartUpdate", handleCartUpdate);

        return () => {
            window.removeEventListener("cartUpdate", handleCartUpdate);
        };
    }, []);

    // 🚨 Fetch Product Details for Cart
    useEffect(() => {
        const fetchProductNames = async () => {
            const names = {};
            for (const item of cartItems) {
                try {
                    const response = await fetch(`${API_URL}/product/single-product/${item.product}`);
                    const data = await response.json();
                    names[item.product] = data.productName || "Unknown Product";
                } catch (error) {
                    console.error(`Failed to fetch product: ${item.product}`, error);
                    names[item.product] = "Unknown Product";
                }
            }
            setProductNames(names);
        };

        if (cartItems.length > 0) {
            fetchProductNames();
        }
    }, [cartItems]);

    // 🚨 Logout Handler
    const handleLogout = () => {
        localStorage.removeItem("userLoginToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("cart"); // Clear cart on logout
        window.dispatchEvent(new Event("cartUpdate")); // Trigger cart update
        setProductNames({})
        logoutHandler(); // Call parent logout function
        onClose(); // Close profile modal
    };

    return (
        <div className="profile-modal-overlay" onClick={onClose}>
            <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={onClose}>&times;</span>
                <FaUserCircle className="loginIcon" />

                <div className="profile-info">
                    <p><strong>Name:</strong> {profileData.userName || "N/A"}</p>
                    <p><strong>Email:</strong> {profileData.email || "N/A"}</p>
                    <p><strong>Phone:</strong> {profileData.phone || "N/A"}</p>
                    <p><strong>Address:</strong> {profileData.address || "N/A"}</p>

                    <p><strong>Cart Items:</strong></p>
                    <ul className="cart-list">
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <li className="cartItem" key={item.product}>
                                    <strong>{productNames[item.product] || "Loading..."}</strong>
                                </li>
                            ))
                        ) : (
                            <p className="emptyCart">Cart is Empty</p>
                        )}
                    </ul>
                    <p><strong>Orders:</strong></p>
                    {recentOrder ? (
                        <p>
                            Recent Order<br/>
                            Date: {recentOrder.orderDate} <br />
                            Time: {recentOrder.orderTime}
                        </p>
                    ) : (
                        <p>No recent orders found.</p>
                    )}
                </div>

                <button className="logout-btn" onClick={handleLogout}>Log Out</button>
            </div>
        </div>
    );
};

export default Profile;
