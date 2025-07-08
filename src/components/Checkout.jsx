"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import CustomBtn3 from "./CustomBtn3";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { createOrder } from "@/utils/firebase/orders/write";

const Checkout = ({ productList = [] }) => {
  const User = useSelector((state) => state.user || {});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const paymentTypes = ["COD"];
  const [paymentMode, setPaymentMode] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "9876543210",
    address: "Flat No. 23, Sunshine Apartments, MG Road",
    city: "Mumbai",
    state: "Maharashtra",
    zip: "400001",
    orderNote: "Please deliver between 10 AM and 5 PM.",
  });

  if (!productList?.length) {
    return <div>Products Not Found</div>;
  }

  const totalPrice = productList.reduce((prev, curr) => {
    const quantity = parseInt(curr?.quantity || 0);
    const price = parseInt(curr?.product?.price || 0);
    return prev + quantity * price;
  }, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value || "",
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    const allFieldsFilled = Object.values(formData).every(
      (value) => value !== "" && value !== null && value !== undefined
    );

    setIsLoading(true);
    try {
      if (!allFieldsFilled) {
        throw new Error("Please fill all details");
      }
      if (totalPrice <= 0) {
        throw new Error("Price should be greater than 0");
      }
      if (!paymentMode) {
        throw new Error("Please select Payment mode");
      }
      await createOrder({
        uid: User?.uid || null,
        productList: productList || [],
        address: formData,
        metaData: {
          paymentMode: paymentMode || "COD",
          ProductsPrice: totalPrice || 0,
          isPaid: false,
          ProductStatus: "Order Placed",
        },
      });
      toast.success("Order Placed");
      router.push(`/codordersuccess`);
    } catch (error) {
      toast.error(error?.message || "An error occurred");
    }
    setIsLoading(false);
  };

  return (
    <>
      <main className="flex flex-col md:flex md:flex-row gap-2">
        <section className="w-full md:w-1/2 flex-1 p-1">
          <div className="text-center font-semibold">Shipping Details</div>
          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <div>
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={formData.fullName || ""}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="mt-1 block w-full p-2 border rounded-md outline-none"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email || ""}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="mt-1 block w-full p-2 border rounded-md outline-none"
              />
            </div>
            <div>
              <input
                type="number"
                name="phone"
                id="phone"
                maxLength="10"
                value={formData.phone || ""}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
                className="mt-1 block w-full p-2 border rounded-md outline-none"
              />
            </div>
            <div>
              <input
                type="text"
                name="address"
                id="address"
                value={formData.address || ""}
                onChange={handleChange}
                placeholder="Enter your address"
                required
                className="mt-1 block w-full p-2 border rounded-md outline-none"
              />
            </div>
            <div>
              <input
                type="text"
                name="city"
                id="city"
                value={formData.city || ""}
                onChange={handleChange}
                placeholder="Enter your city"
                required
                className="mt-1 block w-full p-2 border rounded-md outline-none"
              />
            </div>
            <div>
              <input
                type="text"
                name="state"
                id="state"
                value={formData.state || ""}
                onChange={handleChange}
                placeholder="Enter your state"
                required
                className="mt-1 block w-full p-2 border rounded-md outline-none"
              />
            </div>
            <div>
              <input
                type="number"
                name="zip"
                id="zip"
                value={formData.zip || ""}
                onChange={handleChange}
                placeholder="Enter your ZIP code"
                required
                className="mt-1 block w-full p-2 border rounded-md outline-none"
              />
            </div>
            <div>
              <textarea
                name="orderNote"
                id="orderNote"
                value={formData.orderNote || ""}
                onChange={handleChange}
                placeholder="Additional instructions or notes"
                className="mt-1 block w-full p-2 border rounded-md outline-none"
                rows="4"
              ></textarea>
            </div>
          </form>
        </section>
        <section className="w-full md:w-1/2 flex-1 p-1">
          <div className="w-full">
            <h1 className="text-lg font-semibold text-center">Products</h1>
            <div className="flex flex-col gap-1">
              {productList?.length >= 1 ? (
                productList.map((item) => (
                  <div key={item?.id || Math.random()}>
                    <div className="flex items-center justify-between my-2 border-b">
                      <div className="flex items-center">
                        <div className="w-16">
                          <img
                            src={item?.color?.[0]?.url || "/placeholder.png"}
                            alt="product-img"
                            className="w-full"
                          />
                        </div>
                        <div className="justify-self-start">
                          <h2>{item?.product?.productname || "Unknown Product"}</h2>
                          <p className="text-xs text-slate-600">
                            ₹{item?.product?.price || 0} <span>x</span> {item?.quantity || 0}
                          </p>
                        </div>
                      </div>
                      <div className="text-accent-color font-semibold p-1">
                        ₹{(parseInt(item?.product?.price || 0) * parseInt(item?.quantity || 0)) || 0}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>No Product Found, please Select Products Properly</div>
              )}
            </div>
            <div className="w-full flex justify-between">
              <h3 className="font-semibold">Total Price</h3>
              <h3 className="font-semibold">₹{totalPrice || 0}</h3>
            </div>
          </div>
          <div className="border rounded-md p-2 flex flex-col gap-2 my-5 md:my-10">
            <div className="text-lg">Payment Mode</div>
            <div className="flex justify-center items-center">
              {paymentTypes.map((mode) => (
                <div key={mode}>
                  <input
                    id={mode}
                    type="radio"
                    name="paymentMode"
                    value={mode}
                    onChange={(e) => setPaymentMode(e.target.value)}
                  />
                  <label htmlFor={mode}>{mode}</label>
                </div>
              ))}
            </div>
            <div className="text-xs flex items-center">
              <input type="checkbox" />
              <span className="text-blue-500 font-semibold"> I agree with the terms & conditions</span>
            </div>
            <CustomBtn3
              onClick={handlePlaceOrder}
              isLoading={isLoading}
              className="bg-black text-white px-2 py-1 rounded-lg w-full hover:bg-slate-800"
            >
              Place Order
            </CustomBtn3>
          </div>
        </section>
      </main>
    </>
  );
};

export default Checkout;