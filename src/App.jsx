// import { useState, useEffect } from 'react'
// import './App.css'
// import LandingPage from './suby/pages/LandingPage'
// import { Routes, Route , Navigate} from 'react-router-dom'
// import ProductMenu from './suby/components/productMenu'
// import TopBar from './suby/components/Topbar';
// import Cart from "./suby/components/Cart";


// const RedirectToDashboard = () => {
//   window.location.href = "http://localhost:5173/";
//   return null;
// };
// function App() {
//   const [count, setCount] = useState(0)
//   const [token, setToken] = useState(null)


//   useEffect(() => {
//     const loginToken = localStorage.getItem("userLoginToken")
//     if (loginToken) {
//       setToken(loginToken)
//     }
//   }, [])
//   const UnauthorizedRedirect = () => {
//     useEffect(() => {
//       alert("User not logged in. Please login!");
//     }, []);

//     return <Navigate to="/" replace />;
//   };

//   return (
//     <div>
//       <TopBar />
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="products/:firmId/:firmName" element={<ProductMenu />} />
//         <Route path="/dashboard" element={<RedirectToDashboard />} />
//         {
//           token ? (
//             <Route path="cart" element={<Cart />} />
//           ) : (
//             <Route

//               path="cart"
//               element={
//                 <>

//                   <Navigate to="/" replace />
//                   {alert("User not logged in. Please login!")}
//                 </>
//               }
//             />
//           )
//         }



//       </Routes>





//     </div>
//   )
// }

// export default App


import { useState, useEffect } from 'react';
import './App.css';
import LandingPage from './suby/pages/LandingPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProductMenu from './suby/components/productMenu';
import TopBar from './suby/components/TopBar';
import Cart from './suby/components/Cart';



const UnauthorizedRedirect = () => {
  alert("User not logged in. Please login!");
  return <Navigate to="/" replace />;
};

function App() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ New loading state

  useEffect(() => {
    const loginToken = localStorage.getItem("userLoginToken");
    if (loginToken && loginToken !== "null") {
      setToken(loginToken);
    }
    setLoading(false); // ✅ Mark loading complete after checking token
  }, []);

  // 🚨 Prevent rendering until `token` is checked
  if (loading) return null; 

  return (
    <div>
      <TopBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="products/:firmId/:firmName" element={<ProductMenu />} />

        {token ? (
          <Route path="cart" element={<Cart />} />
        ) : (
          <Route path="cart" element={<UnauthorizedRedirect />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
