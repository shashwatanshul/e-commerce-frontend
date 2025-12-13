import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { setCart } from "@/redux/productSlice";
import { ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import userLogo from "../assets/user.jpg";
import { toast } from "sonner";

const Cart = () => {
  const { cart } = useSelector((store) => store.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const subtotal = cart?.totalPrice;
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = subtotal * 0.05; // example 5%
  const total = subtotal + shipping + tax;

  const API = "https://e-commerce-l3ci.vercel.app/api/v1/cart";
  const accessToken = localStorage.getItem("accessToken");

  const loadCart = async () => {
    try {
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

  const handleUpdateQuantity = async (productId, type) => {
    try {
      const res = await axios.put(
        `${API}/update`,
        { productId, type },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (res.data.success) {
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const res = await axios.delete(`${API}/remove`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        data: { productId }, // ✅ use productId, not id
      });
      if (res.data.success) {
        dispatch(setCart(res.data.cart));
        toast.success("Product removed from cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCart();
  }, [dispatch]);

  console.log(cart);

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      {cart?.items?.length > 0 ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <Button 
            variant="ghost" 
            className="mb-4 !p-0 hover:bg-transparent hover:text-pink-600 font-medium"
            onClick={() => navigate('/products')}
          >
            <ArrowLeft className="h-5 w-5" /> Back to Products
          </Button>
          <h1 className="text-2xl font-bold text-gray-800 mb-7">
            Shopping Cart
          </h1>
          <div className="flex flex-col lg:flex-row gap-7">
            <div className="flex flex-col gap-5 flex-1 min-w-0">
              {cart?.items?.map((product, index) => {
                return (
                  <Card key={index}>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4">
                      {/* Product Image & Info */}
                      <div className="flex items-center gap-4 flex-1 min-w-0 w-full md:w-auto">
                        <img
                          src={product?.productId?.productImg?.[0]?.url || userLogo}
                          alt={product?.productId?.productName}
                          className="w-20 h-20 object-cover rounded-md border border-gray-100 shrink-0"
                        />
                        <div className="flex flex-col min-w-0 gap-1.5">
                          <h1 className="font-semibold truncate text-lg text-gray-900">
                            {product?.productId?.productName}
                          </h1>
                          <p className="text-sm text-muted-foreground">
                            Category: {product?.productId?.category}
                          </p>
                          <p className="text-sm font-medium text-gray-900 md:hidden">
                             ₹{product?.productId?.productPrice?.toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>

                      {/* Actions: Price, Quantity, Remove */}
                      <div className="flex w-full md:w-auto justify-between md:justify-end items-center gap-4 md:gap-6 lg:gap-4 xl:gap-8 shrink-0">
                         <p className="font-medium text-gray-900 hidden md:block w-20 lg:w-auto text-right">
                             ₹{product?.productId?.productPrice?.toLocaleString("en-IN")}
                          </p>

                        <div className="flex items-center gap-2 md:gap-3 bg-gray-50 rounded-lg p-1">
                          <Button
                            onClick={() => handleUpdateQuantity(product.productId._id, "decrease")}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-white shadow-sm"
                            disabled={product.quantity <= 1}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center font-medium text-sm">{product.quantity}</span>
                          <Button
                            onClick={() => handleUpdateQuantity(product.productId._id, "increase")}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-white shadow-sm"
                          >
                            +
                          </Button>
                        </div>
                        
                        <div className="text-right w-20 lg:w-24 hidden md:block">
                            <p className="font-bold text-lg text-gray-900">
                                ₹{(product?.productId?.productPrice * product?.quantity).toLocaleString("en-IN")}
                            </p>
                        </div>

                        {/* Mobile Total Price (Visible only on mobile) */}
                         <div className="md:hidden">
                            <p className="font-bold text-lg text-gray-900">
                                ₹{(product?.productId?.productPrice * product?.quantity).toLocaleString("en-IN")}
                            </p>
                        </div>

                        <button
                            onClick={() => handleRemove(product?.productId?._id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-all"
                            aria-label="Remove item"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
            <div>
              <Card className="w-full lg:w-[320px] xl:w-[380px]">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({cart?.items?.length} items)</span>
                    <span>₹{cart?.totalPrice?.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>₹{shipping.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (5%)</span>
                    <span>₹{tax.toLocaleString("en-IN")}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{total.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="space-y-3 pt-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Promo code"
                        // value={promoCode}
                        // onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <Button variant="outline">Apply</Button>
                    </div>

                    <Button
                      onClick={() => navigate("/address")}
                      size="lg"
                      className="w-full bg-pink-600"
                    >
                      PLACE ORDER
                    </Button>

                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full bg-transparent"
                      asChild
                    >
                      <Link to="/products">Continue Shopping</Link>
                    </Button>
                  </div>

                  <div className="text-sm text-muted-foreground pt-4">
                    <p>• Free shipping on orders over $50</p>
                    <p>• 30-day return policy</p>
                    <p>• Secure checkout with SSL encryption</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
          {/* Icon */}
          <div className="bg-pink-100 p-6 rounded-full">
            <ShoppingCart className="w-16 h-16 text-pink-600" />
          </div>

          {/* Title */}
          <h2 className="mt-6 text-2xl font-bold text-gray-800">
            Your Cart is Empty
          </h2>

          {/* Message */}
          <p className="mt-2 text-gray-600">
            Looks like you haven’t added anything to your cart yet.
          </p>

          {/* Button */}
          <button
            onClick={() => navigate("/products")}
            className="mt-6 bg-pink-600 text-white px-6 py-3 rounded-xl hover:bg-pink-700 transition"
          >
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
