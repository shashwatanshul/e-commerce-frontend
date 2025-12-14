import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useDispatch } from "react-redux";
import { setCart } from "@/redux/productSlice";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";
import axios from "axios";

const ProductDesc = ({ product }) => {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");
  const addToCart = async (productId) => {
    try {
      const res = await axios.post(
        "https://e-commerce-l3ci.vercel.app/api/v1/cart/add",
        { productId },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (res.data.success) {
        toast.success("Product added to cart");
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl text-gray-800">
        {product.productName}
      </h1>
      <p className="text-gray-800 font-medium">
        {product.category} | {product.brand}
      </p>
      <h2 className="text-pink-500 font-bold text-2xl md:text-3xl">
        ₹{product.productPrice}
      </h2>
      <p className="line-clamp-12 text-muted-foreground text-sm md:text-base leading-relaxed">
        {product.productDesc}
      </p>
      <div className="flex gap-4 items-center">
        <p className="text-gray-800 font-semibold text-lg">Quantity :</p>
        <Input type="number" className="w-20" defaultValue={1} />
      </div>
      <Button
        onClick={() => addToCart(product._id)}
        className="bg-pink-600 w-max"
      >
        <ShoppingCart />
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductDesc;
