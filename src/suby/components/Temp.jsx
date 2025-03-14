import React from "react";

const Temp = ({ onClose, showLoginHandler, showvendorDashboardHandler }) => { 
    const navigateToVendorDashboard = () => {
        const token = localStorage.getItem("authToken") || "sampleVendorToken123"; 
        localStorage.setItem("authToken", token); // Store the token

        // 🚨 Open Vendor Dashboard in the Same Tab
        window.location.href = `http://localhost:5174/?token=${token}`;
    };

    return (
        <div className="tempSection">
            <div className="tempModal">
                <span className="close" onClick={onClose}>&times;</span>
                <form className="questionSection">
                    <label>Are you?</label>
                    <button type="button" onClick={showLoginHandler}>User</button>
                    <button type="button" onClick={navigateToVendorDashboard}>Vendor</button>
                </form>
            </div>
        </div>
    );
};

export default Temp;
