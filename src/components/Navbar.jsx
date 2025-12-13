// import { ShoppingCart } from "lucide-react";
// import React, { useEffect } from "react";
// import { Button } from "./ui/button";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { toast } from "sonner";
// import { setUser } from "@/redux/userSlice";
// import { setCart } from "@/redux/productSlice";

// const Navbar = () => {
//   const { user } = useSelector((store) => store.user);
//   const { cart } = useSelector((store) => store.product);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const admin = user?.role === "admin" ? true : false;
//   const API = "http://localhost:8000/api/v1/cart";
//   const accessToken = localStorage.getItem("accessToken");

//   const logoutHandler = async () => {
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_URL}/api/v1/user/logout`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       if (res.data.success) {
//         dispatch(setUser(null));
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const loadCart = async () => {
//     try {
//       const res = await axios.get(API, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       });
//       if (res.data.success) {
//         dispatch(setCart(res.data.cart));
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   //   useEffect(() => {
//   //     loadCart();
//   //   }, [dispatch]);

//   useEffect(() => {
//     if (!accessToken) return;
//     loadCart();
//   }, [accessToken]);

//   return (
//     <header className="bg-pink-50 fixed w-full z-20 border-b border-pink-200">
//       <div className="max-w-7xl mx-auto flex justify-between items-center py-3">
//         {/* logo section */}
//         <div>
//           <img src="/Ekart.png" alt="" className="w-[100px]" />
//           {/* <h1 className='font-bold text-2xl'>Ekart</h1> */}
//         </div>
//         {/* nav section */}
//         <nav className="flex gap-10 justify-between items-center">
//           <ul className="flex gap-7 items-center text-xl font-semibold">
//             <Link to={"/"}>
//               <li>Home</li>
//             </Link>
//             <Link to={"/products"}>
//               <li>Products</li>
//             </Link>
//             {user && (
//               <Link to={`/profile/${user._id}`}>
//                 <li>Hello, {user.firstName}</li>
//               </Link>
//             )}
//             {admin && (
//               <Link to={"/dashboard/sales"}>
//                 <li>Dashboard</li>
//               </Link>
//             )}
//           </ul>
//           <Link to={"/cart"} className="relative">
//             <ShoppingCart />
//             <span className="bg-pink-500 rounded-full absolute text-white -top-3 -right-5 px-2">
//               {cart?.items?.length || 0}
//             </span>
//           </Link>
//           {user ? (
//             <Button
//               onClick={logoutHandler}
//               className="bg-pink-600 text-white cursor-pointer"
//             >
//               Logout
//             </Button>
//           ) : (
//             <Button
//               onClick={() => navigate("/login")}
//               className="bg-gradient-to-tl from-blue-600 to-purple-600 text-white cursor-pointer"
//             >
//               Login
//             </Button>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

////////////////////////////////////////////////////////////////////////////////////////////

// import { ShoppingCart, Menu, X } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { Button } from "./ui/button";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { toast } from "sonner";
// import { setUser } from "@/redux/userSlice";
// import { setCart } from "@/redux/productSlice";

// const Navbar = () => {
//   const { user } = useSelector((store) => store.user);
//   const { cart } = useSelector((store) => store.product);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const admin = user?.role === "admin" ? true : false;
//   const API = "http://localhost:8000/api/v1/cart";
//   const accessToken = localStorage.getItem("accessToken");

//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const logoutHandler = async () => {
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_URL}/api/v1/user/logout`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       if (res.data.success) {
//         dispatch(setUser(null));
//         toast.success(res.data.message);
//         setIsMobileMenuOpen(false);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const loadCart = async () => {
//     try {
//       if (!accessToken) return;
//       const res = await axios.get(API, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       });
//       if (res.data.success) {
//         dispatch(setCart(res.data.cart));
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (!accessToken) return;
//     loadCart();
//   }, [accessToken]);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen((prev) => !prev);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   const cartCount = cart?.items?.length || 0;

//   return (
//     <header className="fixed inset-x-0 top-0 z-20 border-b border-pink-200 bg-pink-50/90 backdrop-blur">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Top bar */}
//         <div className="flex items-center justify-between py-3">
//           {/* Logo */}
//           <Link
//             to="/"
//             className="flex items-center gap-2"
//             onClick={closeMobileMenu}
//           >
//             <img
//               src="/Ekart.png"
//               alt="Ekart"
//               className="w-[90px] sm:w-[110px]"
//             />
//           </Link>

//           {/* Desktop nav */}
//           <nav className="hidden md:flex items-center gap-8">
//             <ul className="flex gap-6 items-center text-lg font-semibold">
//               <Link to="/" onClick={closeMobileMenu}>
//                 <li className="hover:text-pink-600 transition-colors cursor-pointer">
//                   Home
//                 </li>
//               </Link>
//               <Link to="/products" onClick={closeMobileMenu}>
//                 <li className="hover:text-pink-600 transition-colors cursor-pointer">
//                   Products
//                 </li>
//               </Link>
//               {user && (
//                 <Link to={`/profile/${user._id}`} onClick={closeMobileMenu}>
//                   <li className="hover:text-pink-600 transition-colors cursor-pointer">
//                     Hello, {user.firstName}
//                   </li>
//                 </Link>
//               )}
//               {admin && (
//                 <Link to="/dashboard/sales" onClick={closeMobileMenu}>
//                   <li className="hover:text-pink-600 transition-colors cursor-pointer">
//                     Dashboard
//                   </li>
//                 </Link>
//               )}
//             </ul>

//             <div className="flex items-center gap-4">
//               <Link to="/cart" className="relative" onClick={closeMobileMenu}>
//                 <ShoppingCart className="w-6 h-6" />
//                 <span className="bg-pink-500 rounded-full absolute text-white -top-2 -right-3 px-2 text-xs font-semibold">
//                   {cartCount}
//                 </span>
//               </Link>

//               {user ? (
//                 <Button
//                   onClick={logoutHandler}
//                   className="bg-pink-600 text-white cursor-pointer"
//                 >
//                   Logout
//                 </Button>
//               ) : (
//                 <Button
//                   onClick={() => {
//                     closeMobileMenu();
//                     navigate("/login");
//                   }}
//                   className="bg-gradient-to-tl from-blue-600 to-purple-600 text-white cursor-pointer"
//                 >
//                   Login
//                 </Button>
//               )}
//             </div>
//           </nav>

//           {/* Mobile actions */}
//           <div className="flex items-center gap-3 md:hidden">
//             <Link to="/cart" className="relative" onClick={closeMobileMenu}>
//               <ShoppingCart className="w-6 h-6" />
//               <span className="bg-pink-500 rounded-full absolute text-white -top-2 -right-3 px-2 text-[10px] font-semibold">
//                 {cartCount}
//               </span>
//             </Link>

//             <button
//               type="button"
//               onClick={toggleMobileMenu}
//               className="inline-flex items-center justify-center rounded-md p-2 text-pink-700 hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-pink-50"
//               aria-label="Toggle navigation menu"
//             >
//               {isMobileMenuOpen ? (
//                 <X className="h-6 w-6" />
//               ) : (
//                 <Menu className="h-6 w-6" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile dropdown menu */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden bg-pink-50 border-t border-pink-200 shadow-sm">
//           <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-3">
//             <ul className="flex flex-col gap-2 text-base font-medium">
//               <Link to="/" onClick={closeMobileMenu}>
//                 <li className="py-2 px-2 rounded-md hover:bg-pink-100 active:bg-pink-200 cursor-pointer">
//                   Home
//                 </li>
//               </Link>
//               <Link to="/products" onClick={closeMobileMenu}>
//                 <li className="py-2 px-2 rounded-md hover:bg-pink-100 active:bg-pink-200 cursor-pointer">
//                   Products
//                 </li>
//               </Link>
//               {user && (
//                 <Link to={`/profile/${user._id}`} onClick={closeMobileMenu}>
//                   <li className="py-2 px-2 rounded-md hover:bg-pink-100 active:bg-pink-200 cursor-pointer">
//                     Hello, {user.firstName}
//                   </li>
//                 </Link>
//               )}
//               {admin && (
//                 <Link to="/dashboard/sales" onClick={closeMobileMenu}>
//                   <li className="py-2 px-2 rounded-md hover:bg-pink-100 active:bg-pink-200 cursor-pointer">
//                     Dashboard
//                   </li>
//                 </Link>
//               )}
//             </ul>

//             <div className="pt-2">
//               {user ? (
//                 <Button
//                   onClick={logoutHandler}
//                   className="w-full bg-pink-600 text-white cursor-pointer"
//                   size="sm"
//                 >
//                   Logout
//                 </Button>
//               ) : (
//                 <Button
//                   onClick={() => {
//                     closeMobileMenu();
//                     navigate("/login");
//                   }}
//                   className="w-full bg-gradient-to-tl from-blue-600 to-purple-600 text-white cursor-pointer"
//                   size="sm"
//                 >
//                   Login
//                 </Button>
//               )}
//             </div>
//           </nav>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Navbar;

////////////////////////////////////////////////////////////////////////////////////////////

import { ShoppingCart, Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "@/redux/userSlice";
import { setCart } from "@/redux/productSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  const { cart } = useSelector((store) => store.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = user?.role === "admin";
  const API = "https://e-commerce-l3ci.vercel.app/api/v1/cart";
  const accessToken = localStorage.getItem("accessToken");

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/v1/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
        setIsMobileMenuOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadCart = async () => {
    try {
      if (!accessToken) return;
      const res = await axios.get(API, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.data.success) {
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!accessToken) return;
    loadCart();
  }, [accessToken]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const cartCount = cart?.items?.length || 0;

  return (
    <header className="fixed inset-x-0 top-0 z-20 border-b border-pink-200 bg-pink-50/90 backdrop-blur pr-[var(--removed-body-scroll-bar-size,0px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={closeMobileMenu}
          >
            <img
              src="/Ekart.png"
              alt="Ekart"
              className="w-[90px] sm:w-[110px]"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex gap-6 items-center text-lg font-semibold">
              <Link to="/" onClick={closeMobileMenu}>
                <li className="hover:text-pink-600 transition-colors cursor-pointer">
                  Home
                </li>
              </Link>
              <Link to="/products" onClick={closeMobileMenu}>
                <li className="hover:text-pink-600 transition-colors cursor-pointer">
                  Products
                </li>
              </Link>
              {user && (
                <Link to={`/profile/${user._id}`} onClick={closeMobileMenu}>
                  <li className="hover:text-pink-600 transition-colors cursor-pointer">
                    Hello, {user.firstName}
                  </li>
                </Link>
              )}
              {admin && (
                <Link to="/dashboard/sales" onClick={closeMobileMenu}>
                  <li className="hover:text-pink-600 transition-colors cursor-pointer">
                    Dashboard
                  </li>
                </Link>
              )}
            </ul>

            <div className="flex items-center gap-4">
              <Link to="/cart" className="relative" onClick={closeMobileMenu}>
                <ShoppingCart className="w-6 h-6" />
                <span className="bg-pink-500 rounded-full absolute text-white -top-2 -right-3 px-2 text-xs font-semibold">
                  {cartCount}
                </span>
              </Link>

              {user ? (
                <Button
                  onClick={logoutHandler}
                  className="bg-pink-600 text-white cursor-pointer"
                >
                  Logout
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    closeMobileMenu();
                    navigate("/login");
                  }}
                  className="bg-gradient-to-tl from-blue-600 to-purple-600 text-white cursor-pointer"
                >
                  Login
                </Button>
              )}
            </div>
          </nav>

          {/* Mobile actions */}
          <div className="flex items-center gap-3 md:hidden">
            <Link to="/cart" className="relative" onClick={closeMobileMenu}>
              <ShoppingCart className="w-6 h-6" />
              <span className="bg-pink-500 rounded-full absolute text-white -top-2 -right-3 px-2 text-[10px] font-semibold">
                {cartCount}
              </span>
            </Link>

            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-pink-700 hover:bg-pink-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 🔽 Mobile dropdown menu with smooth slide animation */}
      <div
        className={`
          md:hidden bg-pink-50 border-t border-pink-200 shadow-sm
          overflow-hidden transform transition-all duration-300 ease-in-out
          ${
            isMobileMenuOpen
              ? "max-h-64 opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
          }
        `}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-3">
          <ul className="flex flex-col gap-2 text-base font-medium">
            <Link to="/" onClick={closeMobileMenu}>
              <li className="py-2 px-2 rounded-md hover:bg-pink-100 active:bg-pink-200 cursor-pointer">
                Home
              </li>
            </Link>
            <Link to="/products" onClick={closeMobileMenu}>
              <li className="py-2 px-2 rounded-md hover:bg-pink-100 active:bg-pink-200 cursor-pointer">
                Products
              </li>
            </Link>
            {user && (
              <Link to={`/profile/${user._id}`} onClick={closeMobileMenu}>
                <li className="py-2 px-2 rounded-md hover:bg-pink-100 active:bg-pink-200 cursor-pointer">
                  Hello, {user.firstName}
                </li>
              </Link>
            )}
            {admin && (
              <Link to="/dashboard/sales" onClick={closeMobileMenu}>
                <li className="py-2 px-2 rounded-md hover:bg-pink-100 active:bg-pink-200 cursor-pointer">
                  Dashboard
                </li>
              </Link>
            )}
          </ul>

          <div className="pt-2">
            {user ? (
              <Button
                onClick={logoutHandler}
                className="w-full bg-pink-600 text-white cursor-pointer"
                size="sm"
              >
                Logout
              </Button>
            ) : (
              <Button
                onClick={() => {
                  closeMobileMenu();
                  navigate("/login");
                }}
                className="w-full bg-gradient-to-tl from-blue-600 to-purple-600 text-white cursor-pointer"
                size="sm"
              >
                Login
              </Button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
