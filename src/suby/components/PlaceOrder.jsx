import React, { useState } from "react";
import { API_URL } from "../api";

const PlaceOrder = ({ onClose ,clearCartHandler}) => {
    const userId = localStorage.getItem("userId");
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const [paymentMethod, setPaymentMethod] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState({
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: ""
    });
   

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setDeliveryAddress((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            alert("Your cart is empty. Add items before placing an order.");
            return;
        }

        const { street, city, state, zipcode, country } = deliveryAddress;
        if (!street || !city || !state || !zipcode ) {
            alert("Please fill all delivery address fields.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/order/createOrder/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId,
                    items: cartItems.map(item => ({
                        product: item.product,
                        quantity: item.quantity
                    })),
                    paymentMethod,
                    deliveryAddress
                })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.removeItem("cart"); 
                clearCartHandler()
                onClose()
                window.dispatchEvent(new Event("cartUpdate"));  // Ensures cart updates everywhere
            } else{
                alert("Order not placed!!!")
            }
        } catch (error) {
            console.error("Error placing order:", error);
          
        } 
    };

    return (
        <div className="order-container">
            <h1>🛒 Place Your Order</h1>
            <span className="close" onClick={onClose}>&times;</span>
            <form className="order-form" onSubmit={submitHandler}>


                {/* 🔹 Payment Method */}
                <label htmlFor="payment">Payment Method:</label>
                <select
                    id="payment"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    required
                >
                    <option value="">-- Select Payment Method --</option>
                    <option value="COD">Cash on Delivery (COD)</option>
                    <option value="UPI">UPI</option>
                    <option value="Card">Credit/Debit Card</option>
                    <option value="Wallet">Wallet</option>
                </select>

                {/* 🔹 Delivery Address Fields */}
                <label htmlFor="street">Street:</label>
                <input
                    type="text"
                    name="street"
                    value={deliveryAddress.street}
                    onChange={handleAddressChange}
                    placeholder="Enter street"
                    required
                />

                <label htmlFor="city">City:</label>
                <input
                    type="text"
                    name="city"
                    value={deliveryAddress.city}
                    onChange={handleAddressChange}
                    placeholder="Enter city"
                    required
                />

                <label htmlFor="state">State:</label>
                <input
                    type="text"
                    name="state"
                    value={deliveryAddress.state}
                    onChange={handleAddressChange}
                    placeholder="Enter state"
                    required
                />

                <label htmlFor="zipcode">Zipcode:</label>
                <input
                    type="text"
                    name="zipcode"
                    value={deliveryAddress.zipcode}
                    onChange={handleAddressChange}
                    placeholder="Enter zipcode"
                    required
                />

                {/* 🔹 Submit Button */}
                <button type="submit" className="submit-btn">
                    Place Order
                </button>
            </form>
        </div>
    );
};

export default PlaceOrder;
