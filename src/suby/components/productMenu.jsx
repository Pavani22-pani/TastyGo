import React, { useState, useEffect } from 'react'
import { API_URL } from '../api'
import { useParams } from 'react-router-dom'
import TopBar from './Topbar'
import Temp from "../components/Temp";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import Profile from "../components/Profile";

const ProductMenu = () => {
    const [products, setProducts] = useState([])

    const { firmId, firmName } = useParams()

    const [showTemp, setShowTemp] = useState(false);
    const [showLogin, setShowLogin] = useState(false)
    const [showSignUp, setShowSignUp] = useState(false)
    const [showvendorDashboard, setShowVendorDashboard] = useState(false)
    const [showProfile, setShowProfile] = useState(false)
    const [token, setToken] = useState(null)

    useEffect(() => {
        const loginToken = localStorage.getItem("userLoginToken")
        if (loginToken) {
            setToken(loginToken)


        }
    }, [])

    const showLoginHandler = () => {
        setShowTemp(false)
        setShowLogin(true)
        setShowSignUp(false)
        setShowVendorDashboard(false)
        setShowProfile(false)
    }
    const showSignUpHandler = () => {
        setShowTemp(false)
        setShowLogin(false)
        setShowSignUp(true)
        setShowVendorDashboard(false)
        setShowProfile(false)
    }
    const showvendorDashboardHandler = () => {
        setShowVendorDashboard(true)
        setShowTemp(false)
        setShowLogin(false)
        setShowSignUp(false)
        setShowProfile(false)

    }
    const showProfileHandler = () => {
        setShowProfile(true);
        setShowVendorDashboard(false);
        setShowTemp(false);
        setShowLogin(false); // Fix: Ensure login modal is closed
        setShowSignUp(false);
    };


    // Logout Handler
    const logoutHandler = () => {
        localStorage.removeItem("userLoginToken");
        setToken(null);
        setShowProfile(false);

    };
    const productHandler = async () => {
        try {
            const response = await fetch(`${API_URL}/product/${firmId}/products`)
            const newProductData = await response.json()
            setProducts(newProductData.products)
        } catch (error) {
            console.error("Product failed to fetch", error)

        }
    }
    useEffect(() => {
        productHandler()
    }, [])
    const cartHandler = async (productId) => {
        try {
            const userId = localStorage.getItem("userId");
            if (!userId) {
                alert("User not logged in. Please Login!");
                setShowLogin(true);
                return;
            }
    
            const cartItem = { product: productId, quantity: 1 };  // Corrected key
    
            // Send request to API
            const response = await fetch(`${API_URL}/user/cart-add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId,product:productId, quantity: 1 })
 // Corrected key
            });
    
            const data = await response.json();
    
            if (response.ok) {
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                const existingItem = cart.find(item => item.product === productId);  // Corrected key
    
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push(cartItem);
                }
    
                localStorage.setItem("cart", JSON.stringify(cart));
    
                const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
                window.dispatchEvent(new CustomEvent("cartUpdate", { detail: totalItems }));
    
            } else {
                alert(data.error || "Failed to add product to cart");
            }
        } catch (error) {
            console.error("Error adding product to cart.", error);
            alert("Something went wrong");
        }
    };
    
    

    return (
        <>
            <TopBar showTempHandler={() => setShowTemp(true)} showProfileHandler={showProfileHandler} token={token} />
            {/* Overlay for background transparency */}
            {(showTemp || showSignUp || showLogin || showProfile) && <div className="overlay" onClick={() => { setShowTemp(false); setShowSignUp(false); setShowLogin(false); setShowProfile(false) }}></div>}

            {/* Temp Modal */}
            {showTemp && <Temp onClose={() => setShowTemp(false)} showLoginHandler={showLoginHandler} showvendorDashboardHandler={showvendorDashboardHandler} />}
            {/* loginModel */}
            {showLogin && <Login onClose={() => setShowLogin(false)} showSignUpHandler={showSignUpHandler} />}
            {/* SignUp Model */}
            {showSignUp && <SignUp onClose={() => setShowSignUp(false)} showLoginHandler={showLoginHandler} />}
            {showvendorDashboard && <LandingPage2 />}
            {/* Profile Modal */}
            {showProfile && <Profile onClose={() => setShowProfile(false)} logoutHandler={logoutHandler} />}

            <section className="productSection">
                <h1>{firmName}</h1>
                {products && products.length > 0 ? (
                    products.map((item) => (
                        <div className='productBox' key={item._id || item.productName}>
                            <div>
                                <div><strong>{item.productName}</strong></div>
                                <div>₹{item.price}</div>
                                <div>{item.description}</div>
                            </div>
                            <div className='productGroup'>
                                <img src={`${API_URL}${item.image}`} />
                                <div className='addBtn' onClick={() => cartHandler(item._id)}>Add</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Loading or No Products Available</p>
                )}
            </section>

        </>
    )
}
export default ProductMenu