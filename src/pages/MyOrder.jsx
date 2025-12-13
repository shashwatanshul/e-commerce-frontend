import { Button } from "@/components/ui/button";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyOrder = () => {
  const navigate = useNavigate();
  const [userOrder, setUserOrder] = useState(null);

  const getUserOrders = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const res = await axios.get(
      `https://e-commerce-l3ci.vercel.app/api/v1/orders/myorder`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (res.data.success) {
      setUserOrder(res.data.orders);
    }
  };

  useEffect(() => {
    getUserOrders();
  }, []);

  console.log(userOrder);

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="w-full">
        <div className="flex items-center gap-4 mb-6">
          <Button onClick={() => navigate(-1)} size="icon" variant="outline">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold ">Orders</h1>
        </div>

        {userOrder?.length === 0 ? (
          <p className="text-gray-800 space-y-6 text-xl text-center py-10">
            No orders found for this user.
          </p>
        ) : (
          <div className="space-y-6 w-full">
            {userOrder?.map((order) => (
              <div
                key={order._id}
                className="shadow-sm rounded-2xl p-4 sm:p-5 border border-gray-200 bg-white"
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                  <h2 className="text-lg font-semibold break-all">
                    Order ID: <span className="text-gray-600 font-normal text-base block sm:inline">{order._id}</span>
                  </h2>
                  <p className="text-sm text-gray-500">
                    Amount:{" "}
                    <span className="font-bold text-gray-900">
                      {order.currency} {order.amount.toFixed(2)}
                    </span>
                  </p>
                </div>

                {/* User Info & Status */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                  <div className="">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">User:</span>{" "}
                      {order.user?.firstName || "Unknown"}{" "}
                      {order.user?.lastName}
                    </p>
                    <p className="text-sm text-gray-500 break-all">
                      Email: {order.user?.email || "N/A"}
                    </p>
                  </div>
                  <span
                    className={`${
                      order.status === "Paid"
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : order.status === "Failed"
                        ? "bg-red-100 text-red-700 border border-red-200"
                        : "bg-orange-100 text-orange-700 border border-orange-200"
                    } px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Products */}
                <div>
                  <h3 className="font-medium mb-3 text-gray-900">Products ({order.products.length})</h3>
                  <ul className="space-y-3">
                    {order.products.map((product, index) => (
                      <li
                        key={index}
                        className="flex flex-col sm:flex-row sm:items-center bg-gray-50 p-3 rounded-xl gap-3 sm:gap-4"
                      >
                        <img
                          onClick={() =>
                            navigate(`/products/${product?.productId?._id}`)
                          }
                          src={product.productId?.productImg?.[0].url}
                          alt={product.productId?.productName}
                          className="w-16 h-16 object-cover rounded-md cursor-pointer bg-white"
                        />
                        
                        <div className="flex-1 min-w-0">
                             <p className="font-medium text-gray-900 line-clamp-2" title={product.productId?.productName}>
                               {product.productId?.productName}
                             </p>
                             <p className="text-xs text-muted-foreground truncate hidden sm:block">
                                ID: {product?.productId?._id}
                             </p>
                        </div>
                        
                        <div className="text-sm font-medium whitespace-nowrap pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-200 mt-2 sm:mt-0">
                          ₹{product.productId?.productPrice?.toLocaleString('en-IN')} <span className="text-gray-500">x {product.quantity}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrder;
