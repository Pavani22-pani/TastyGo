import React, { useState ,useEffect} from "react";
import TopBar from "../components/TopBar";
import ItemsDisplay from "../components/ItemsDisplay";
import Chains from "../components/Chains";
import FirmCollections from "../components/FirmCollections";
import Temp from "../components/Temp";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import LandingPage2 from "../../../../../react_dashboard/dashboard/src/vendorDashboard/pages/LandingPage";
import Profile from "../components/Profile";
import Footer from "../components/Footer";
import BestPlaces from "../components/BestPlaces";



const LandingPage = () => {
  const [showTemp, setShowTemp] = useState(false);
  const [showLogin,setShowLogin]=useState(false)
  const [showSignUp,setShowSignUp]=useState(false)
  const [showvendorDashboard,setShowVendorDashboard]=useState(false)
  const [showProfile,setShowProfile]=useState(false)
 
  const [token,setToken]=useState(null)

  useEffect(()=>{
    const loginToken=localStorage.getItem("userLoginToken")
    if(loginToken){
      setToken(loginToken)
    }
  },[])

  const showLoginHandler=()=>{
    setShowTemp(false)
    setShowLogin(true)
    setShowSignUp(false)
    setShowVendorDashboard(false)
    setShowProfile(false)

  }
  const showSignUpHandler=()=>{
    setShowTemp(false)
    setShowLogin(false)
    setShowSignUp(true)
    setShowVendorDashboard(false)
    setShowProfile(false)
 
  }
  const showvendorDashboardHandler=()=>{
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
    
    setToken(null);
    setShowProfile(false);
   
  };
  return (
    <div>
      {/* Pass handler to TopBar */}
      <TopBar showTempHandler={() => setShowTemp(true)} showProfileHandler={showProfileHandler} token={token}/>

      <div className="landingSection">
        <ItemsDisplay />
        <Chains />
        <FirmCollections />
        <br/>
        
        <BestPlaces/>
        
      </div>
      <br/>
      <br/>
      <Footer/>

      {/* Overlay for background transparency */}
      {(showTemp || showSignUp || showLogin ||showProfile) && <div className="overlay" onClick={() => { setShowTemp(false); setShowSignUp(false); setShowLogin(false);setShowProfile(false)}}></div>}

    {/* Temp Modal */}
    {showTemp && <Temp onClose={() => setShowTemp(false)}  showLoginHandler={showLoginHandler} showvendorDashboardHandler={showvendorDashboardHandler}/>}
    {/* loginModel */}
    {showLogin && <Login onClose={() => setShowLogin(false)} showSignUpHandler={showSignUpHandler}/>}
    {/* SignUp Model */}
    {showSignUp && <SignUp onClose={() => setShowSignUp(false)} showLoginHandler={showLoginHandler}/>}
    {showvendorDashboard &&  <LandingPage2/>}
    {/* Profile Modal */}
    {showProfile &&  <Profile onClose={()=>setShowProfile(false)} logoutHandler={logoutHandler}/>}
    {/* Cart section */}
  








    </div>
  );
};

export default LandingPage;
